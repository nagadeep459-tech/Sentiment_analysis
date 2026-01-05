#!/bin/bash

echo "🚀 Starting Sentiment Analysis Server..."
echo ""

# Navigate to the project directory
cd "$(dirname "$0")/sentiment-appdemo"

# Check if JAR exists
if [ ! -f "target/sentiment-appdemo-1.0-SNAPSHOT-jar-with-dependencies.jar" ]; then
    echo "📦 Building project..."
    mvn clean package -q
    if [ $? -ne 0 ]; then
        echo "❌ Build failed!"
        exit 1
    fi
fi

# Check if index.html exists
if [ ! -f "../index.html" ]; then
    echo "❌ Error: index.html not found in parent directory!"
    exit 1
fi

echo "✅ Starting server on http://localhost:8080"
echo "📱 Open your browser and go to: http://localhost:8080"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the server
java -jar target/sentiment-appdemo-1.0-SNAPSHOT-jar-with-dependencies.jar

