package com.akshaya.sentiment;

import java.util.Arrays;
import org.apache.spark.ml.PipelineModel;
import org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator;
import org.apache.spark.sql.*;
import org.apache.spark.sql.types.*;
public class App {

    public static void main(String[] args) {
        if (args.length == 0) {
            System.err.println("❌ Please enter a sentence!");
            System.exit(1);
        }
        String inputSentence = args[0];
        System.out.println("\n🎤 Input Sentence: " + inputSentence);

        SparkSession spark = SparkSession.builder()
                .appName("SentimentPrediction")
                .master("local[*]")
                .getOrCreate();

        // Load your working saved model here
        PipelineModel model = PipelineModel.load(
                "hdfs://localhost:9000/user/akshaya/models/word2vec_tfidf_sentiment"
        );

        StructType schema = new StructType()
                .add("review", DataTypes.StringType, false);

        Row row = RowFactory.create(inputSentence);
        Dataset<Row> inputDF = spark.createDataFrame(Arrays.asList(row), schema);

        // Run prediction
        Dataset<Row> prediction = model.transform(inputDF);

        double label = prediction.first().getAs("prediction");
        String sentiment = (label == 1.0) ? "Positive 😊" : "Negative 😞";

        Object probability = prediction.first().getAs("probability");

        // Print table
        System.out.println("\n==================== SENTIMENT RESULT ====================");
        System.out.println(String.format("%-20s | %-10s | %-40s",
                "Review", "Sentiment", "Probability [neg,pos]"));
        System.out.println("-----------------------------------------------------------");
        System.out.println(String.format("%-20s | %-10s | %-40s",
                inputSentence, sentiment, probability.toString()));
        System.out.println("===========================================================\n");

        // Load training/test file to compute accuracy
        Dataset<Row> testDF = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("hdfs://localhost:9000/user/akshaya/data/train.csv");

        Dataset<Row> testPredictions = model.transform(testDF);

        MulticlassClassificationEvaluator evaluator =
                new MulticlassClassificationEvaluator()
                        .setMetricName("accuracy")
                        .setLabelCol("label")
                        .setPredictionCol("prediction");

        double accuracy = evaluator.evaluate(testPredictions);

        System.out.println("📊 Model Accuracy: " + accuracy);
        System.out.println("===========================================================\n");

        System.out.println("🎯 Final Sentiment: " + sentiment);

        spark.stop();
    }
}
