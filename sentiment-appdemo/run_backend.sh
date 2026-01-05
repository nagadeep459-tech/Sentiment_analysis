#!/bin/bash
echo "🔄 Rebuilding backend..."
mvn -q clean package

echo "🚀 Starting backend server..."
java -jar target/sentiment-appdemo-1.0-SNAPSHOT-jar-with-dependencies.jar
