package com.akshaya.sentiment;

import org.apache.spark.ml.Pipeline;
import org.apache.spark.ml.PipelineModel;
import org.apache.spark.ml.classification.LogisticRegression;
import org.apache.spark.ml.evaluation.MulticlassClassificationEvaluator;
import org.apache.spark.ml.feature.IDF;
import org.apache.spark.ml.feature.Tokenizer;
import org.apache.spark.ml.feature.Word2Vec;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;

public class Train {

    public static void main(String[] args) throws Exception {

        SparkSession spark = SparkSession.builder()
                .appName("SentimentTraining")
                .master("local[*]")
                .getOrCreate();

        // 1️⃣ Load data
        Dataset<Row> df = spark.read()
                .option("header", "true")
                .option("inferSchema", "true")
                .csv("hdfs://localhost:9000/user/akshaya/bigdata/aclImdb_csv/imdb_train.csv");

        // Rename sentiment → label
        df = df.withColumnRenamed("sentiment", "label");

        // 2️⃣ Tokenizer — IMPORTANT FIX
        Tokenizer tokenizer = new Tokenizer()
                .setInputCol("review")   // <-- your csv has 'review'
                .setOutputCol("words");

        // 3️⃣ Word2Vec
        Word2Vec w2v = new Word2Vec()
                .setInputCol("words")
                .setOutputCol("w2vFeatures")
                .setVectorSize(100)
                .setMinCount(1);

        // 4️⃣ IDF
        IDF idf = new IDF()
                .setInputCol("w2vFeatures")
                .setOutputCol("tfidf");

        // 5️⃣ Logistic Regression
        LogisticRegression lr = new LogisticRegression()
                .setFeaturesCol("tfidf")
                .setLabelCol("label")
                .setMaxIter(50);

        // 6️⃣ Pipeline
        Pipeline pipeline = new Pipeline()
                .setStages(new org.apache.spark.ml.PipelineStage[]{
                        tokenizer, w2v, idf, lr
                });

        // Split 80/20
        Dataset<Row>[] split = df.randomSplit(new double[]{0.8, 0.2}, 42);
        Dataset<Row> train = split[0];
        Dataset<Row> test = split[1];

        // 7️⃣ Train
        PipelineModel model = pipeline.fit(train);

        // 8️⃣ Predict on test
        Dataset<Row> predictions = model.transform(test);

        // 9️⃣ Accuracy
        MulticlassClassificationEvaluator evaluator =
                new MulticlassClassificationEvaluator()
                        .setMetricName("accuracy")
                        .setLabelCol("label")
                        .setPredictionCol("prediction");

        double accuracy = evaluator.evaluate(predictions);
        System.out.println("\n🎯 Test Accuracy = " + accuracy);

        // 🔟 Save model
        model.write()
                .overwrite()
                .save("hdfs://localhost:9000/user/akshaya/models/word2vec_tfidf_sentiment");

        System.out.println("\n✅ Model successfully trained and saved!");
        spark.stop();
    }
}
