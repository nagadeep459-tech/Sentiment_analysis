# Movie Sentiment Analyzer

A full-stack sentiment analysis application with a modern web frontend and Java Spark ML backend.

## Project Structure

```
sentiment-app/
├── index.html          # Frontend HTML
├── styles.css          # Frontend CSS
├── app.js             # Frontend JavaScript
└── sentiment-appdemo/ # Java Backend
    └── src/main/java/com/akshaya/sentiment/
        ├── Server.java # REST API Server
        ├── App.java    # CLI prediction tool
        └── Train.java  # Model training
```

## Prerequisites

1. **Java 8+** installed
2. **Maven** installed
3. **HDFS** running (for model storage)
4. **ML Model** saved at: `hdfs://localhost:9000/user/akshaya/models/word2vec_tfidf_sentiment`

## Running the Application

### Step 1: Build the Backend

```bash
cd sentiment-appdemo
mvn clean package
```

### Step 2: Start the REST API Server

```bash
java -jar target/sentiment-appdemo-1.0-SNAPSHOT-jar-with-dependencies.jar
```

The server will start on **http://localhost:8080**

### Step 3: Open the Frontend

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python 3
python3 -m http.server 8000

# Then open: http://localhost:8000
```

## API Endpoints

### POST /predict
Predict sentiment of a review.

**Request:**
```json
{
  "text": "This movie is absolutely fantastic!"
}
```

**Response:**
```json
{
  "prediction": 1,
  "sentiment": "positive",
  "probability": "[0.2, 0.8]"
}
```

- `prediction`: 1 for positive, 0 for negative
- `sentiment`: "positive" or "negative"
- `probability`: Probability distribution (if available)

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Troubleshooting

### Server won't start
- Check if port 8080 is available
- Verify HDFS is running
- Ensure model path is correct

### Model not found
- Verify model exists at: `hdfs://localhost:9000/user/akshaya/models/word2vec_tfidf_sentiment`
- Check HDFS connection

### Frontend can't connect
- Ensure backend server is running on port 8080
- Check browser console for CORS errors
- Verify API endpoint: `http://localhost:8080/predict`

## Development

### Running CLI Version (App.java)
```bash
java -cp target/sentiment-appdemo-1.0-SNAPSHOT-jar-with-dependencies.jar \
  com.akshaya.sentiment.App "Your review text here"
```

### Training New Model (Train.java)
```bash
java -cp target/sentiment-appdemo-1.0-SNAPSHOT-jar-with-dependencies.jar \
  com.akshaya.sentiment.Train
```

## Features

- 🎬 Modern movie dashboard UI
- 🤖 ML-powered sentiment analysis
- ⚡ Real-time predictions
- 📱 Responsive design
- 🎨 Beautiful animations

