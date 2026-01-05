package com.akshaya.sentiment;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import org.apache.spark.ml.PipelineModel;
import org.apache.spark.ml.linalg.Vector;
import org.apache.spark.sql.*;
import org.apache.spark.sql.types.*;
import spark.Request;
import spark.Response;
import spark.Spark;

import java.io.File;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class Server {

    private static SparkSession spark;
    private static PipelineModel model;
    private static final Gson gson = new Gson();
    private static final String MODEL_PATH = "hdfs://localhost:9000/user/akshaya/models/word2vec_tfidf_sentiment";

    public static void main(String[] args) {
        System.out.println("🚀 Starting Sentiment Analysis Server...");

        try {
            // Initialize Spark Session (singleton)
            initializeSpark();
            
            // Load model once at startup
            loadModel();

            // Configure Spark Java server
            Spark.port(8080);
            
            // Enable CORS
            enableCORS();
            
            // Add explicit routes for chatbot files (these are embedded, return empty)
            Spark.get("/chatbot.css", (req, res) -> {
                res.type("text/css");
                res.status(200);
                return "/* Chatbot CSS is embedded in index.html - no external file needed */";
            });
            
            Spark.get("/chatbot.js", (req, res) -> {
                res.type("application/javascript");
                res.status(200);
                return "// Chatbot JS is embedded in index.html - no external file needed";
            });
            

            Spark.get("/", (req, res) -> {
                res.type("text/html");
                try {
                    // Try multiple possible locations
                    String[] possiblePaths = {
                        "../index.html",
                        "../../index.html",
                        System.getProperty("user.dir") + "/../index.html",
                        System.getProperty("user.dir") + "/index.html"
                    };
                    
                    for (String path : possiblePaths) {
                        File file = new File(path);
                        if (file.exists() && file.isFile()) {
                            System.out.println("📄 Serving index.html from: " + file.getAbsolutePath());
                            return new String(Files.readAllBytes(file.toPath()), "UTF-8");
                        }
                    }
                    
                    // Try from resources
                    java.io.InputStream is = Server.class.getResourceAsStream("/public/index.html");
                    if (is != null) {
                        try (java.util.Scanner scanner = new java.util.Scanner(is, "UTF-8").useDelimiter("\\A")) {
                            return scanner.hasNext() ? scanner.next() : "";
                        }
                    }
                    
                    res.status(404);
                    return "<html><body><h1>Frontend not found</h1><p>Please ensure index.html exists in the parent directory.</p></body></html>";
                } catch (Exception e) {
                    System.err.println("❌ Error serving index.html: " + e.getMessage());
                    e.printStackTrace();
                    res.status(500);
                    return "<html><body><h1>Error loading frontend</h1><p>" + e.getMessage() + "</p></body></html>";
                }
            });

            // Health check endpoint
            Spark.get("/health", (req, res) -> {
                res.type("application/json");
                Map<String, String> response = new HashMap<>();
                response.put("status", "ok");
                response.put("message", "Server is running");
                return gson.toJson(response);
            });

            // Main prediction endpoint
            Spark.post("/predict", (req, res) -> {
                res.type("application/json");
                return handlePrediction(req, res);
            });

            // Handle 404 - return proper 404 status, not 400
            Spark.notFound((req, res) -> {
                res.status(404);
                String path = req.pathInfo();
                
                // For static file requests, return simple 404 HTML
                if (path.endsWith(".css") || path.endsWith(".js") || path.endsWith(".png") || 
                    path.endsWith(".jpg") || path.endsWith(".ico") || path.endsWith(".svg")) {
                    res.type("text/html");
                    return "<!DOCTYPE html><html><head><title>404 Not Found</title></head>" +
                           "<body><h1>404 - File Not Found</h1><p>The requested file was not found.</p></body></html>";
                }
                
                // For API requests, return JSON
                res.type("application/json");
                Map<String, String> error = new HashMap<>();
                error.put("error", "Endpoint not found");
                error.put("path", path);
                return gson.toJson(error);
            });

            System.out.println("✅ Server started successfully on http://localhost:8080");
            System.out.println("📡 Endpoints:");
            System.out.println("   GET  /health - Health check");
            System.out.println("   POST /predict - Sentiment prediction");
            System.out.println("🎯 Ready to accept requests!");

        } catch (Exception e) {
            System.err.println("❌ Failed to start server: " + e.getMessage());
            e.printStackTrace();
            System.exit(1);
        }
    }

    private static void initializeSpark() {
        System.out.println("⚙️  Initializing Spark Session...");
        spark = SparkSession.builder()
                .appName("SentimentAnalysisAPI")
                .master("local[*]")
                .config("spark.sql.warehouse.dir", "file:///tmp/spark-warehouse")
                .getOrCreate();
        System.out.println("✅ Spark Session initialized");
    }

    private static void loadModel() {
        System.out.println("📦 Loading ML model from: " + MODEL_PATH);
        try {
            model = PipelineModel.load(MODEL_PATH);
            System.out.println("✅ Model loaded successfully");
        } catch (Exception e) {
            System.err.println("❌ Failed to load model: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Model loading failed", e);
        }
    }

    private static String handlePrediction(Request req, Response res) {
        try {
            // Parse JSON request body
            String body = req.body();
            if (body == null || body.trim().isEmpty()) {
                res.status(400);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Request body is empty");
                return gson.toJson(error);
            }

            JsonObject jsonRequest;
            try {
                jsonRequest = gson.fromJson(body, JsonObject.class);
            } catch (JsonSyntaxException e) {
                res.status(400);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid JSON format");
                error.put("message", e.getMessage());
                return gson.toJson(error);
            }

            // Extract text field
            if (!jsonRequest.has("text")) {
                res.status(400);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Missing 'text' field in request");
                return gson.toJson(error);
            }

            String reviewText = jsonRequest.get("text").getAsString();
            
            if (reviewText == null || reviewText.trim().isEmpty()) {
                res.status(400);
                Map<String, String> error = new HashMap<>();
                error.put("error", "Text field cannot be empty");
                return gson.toJson(error);
            }

            System.out.println("📝 Received review: " + reviewText.substring(0, Math.min(50, reviewText.length())) + "...");

            // Create DataFrame with the review
            StructType schema = new StructType()
                    .add("review", DataTypes.StringType, false);

            Row row = RowFactory.create(reviewText);
            Dataset<Row> inputDF = spark.createDataFrame(Arrays.asList(row), schema);

            // Run prediction
            Dataset<Row> prediction = model.transform(inputDF);

            // Extract prediction result
            Row resultRow = prediction.first();
            double predictionValue = resultRow.getAs("prediction");
            
            // Convert to integer (1 for positive, 0 for negative)
            int predictionInt = (int) predictionValue;

            // Get probability if available
            Vector probabilityVector = null;
            double positiveProbability = Double.NaN;
            double negativeProbability = Double.NaN;
            try {
                probabilityVector = resultRow.getAs("probability");
                if (probabilityVector != null) {
                    double[] rawProbabilities = probabilityVector.toArray();
                    if (rawProbabilities.length >= 2) {
                        negativeProbability = rawProbabilities[0];
                        positiveProbability = rawProbabilities[1];
                    } else if (rawProbabilities.length == 1) {
                        positiveProbability = rawProbabilities[0];
                    }
                }
            } catch (Exception e) {
                System.err.println("⚠️ Could not read probability vector: " + e.getMessage());
            }

            // Create response
            Map<String, Object> response = new HashMap<>();
            response.put("prediction", predictionInt);
            response.put("sentiment", predictionInt == 1 ? "positive" : "negative");

            if (probabilityVector != null) {
                response.put("probability", probabilityVector.toString());
            }
            if (!Double.isNaN(positiveProbability)) {
                response.put("positiveProbability", positiveProbability);
            }
            if (!Double.isNaN(negativeProbability)) {
                response.put("negativeProbability", negativeProbability);
            }
            if (!Double.isNaN(positiveProbability) && !Double.isNaN(negativeProbability)) {
                response.put("probabilities", new double[]{negativeProbability, positiveProbability});
            }
            double confidence = Double.NaN;
            if (predictionInt == 1 && !Double.isNaN(positiveProbability)) {
                confidence = positiveProbability;
            } else if (predictionInt == 0 && !Double.isNaN(negativeProbability)) {
                confidence = negativeProbability;
            }
            if (!Double.isNaN(confidence)) {
                response.put("confidence", confidence);
            }

            System.out.println("✅ Prediction: " + (predictionInt == 1 ? "Positive" : "Negative"));

            return gson.toJson(response);

        } catch (Exception e) {
            System.err.println("❌ Prediction error: " + e.getMessage());
            e.printStackTrace();
            res.status(500);
            Map<String, String> error = new HashMap<>();
            error.put("error", "Prediction failed");
            error.put("message", e.getMessage());
            return gson.toJson(error);
        }
    }

    private static void enableCORS() {
        // Use before filter for CORS headers
        Spark.before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
            response.header("Access-Control-Allow-Credentials", "true");
            
            // Handle OPTIONS preflight requests
            if ("OPTIONS".equals(request.requestMethod())) {
                String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
                if (accessControlRequestHeaders != null) {
                    response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
                }
                String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
                if (accessControlRequestMethod != null) {
                    response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
                }
                Spark.halt(200, "OK");
            }
        });
    }

    // Cleanup on shutdown
    static {
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.out.println("\n🛑 Shutting down server...");
            if (spark != null) {
                spark.stop();
            }
            Spark.stop();
            System.out.println("✅ Server stopped");
        }));
    }
}

