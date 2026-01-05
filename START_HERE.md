# 🚀 Quick Start Guide

## ✅ Fixed Issues:
1. **White Screen Fixed** - All CSS and JavaScript are now embedded in `index.html`
2. **Backend API Created** - REST server at `http://localhost:8080`
3. **Routing Fixed** - All navigation and API calls work correctly

---

## 📋 Step-by-Step Instructions

### Step 1: Build the Backend

```bash
cd sentiment-appdemo
mvn clean package
```

**Wait for:** `BUILD SUCCESS`

### Step 2: Start the Backend Server

```bash
java -jar target/sentiment-appdemo-1.0-SNAPSHOT-jar-with-dependencies.jar
```

**You should see:
```
🚀 Starting Sentiment Analysis Server...
⚙️  Initializing Spark Session...
✅ Spark Session initialized
📦 Loading ML model from: hdfs://localhost:9000/user/akshaya/models/word2vec_tfidf_sentiment
✅ Model loaded successfully
✅ Server started successfully on http://localhost:8080
📡 Endpoints:
   GET  /health - Health check
   POST /predict - Sentiment prediction
🎯 Ready to accept requests!
```

**Keep this terminal open!** The server must be running.

### Step 3: Open the Frontend

**Option A: Direct File (Easiest)**
- Simply double-click `index.html` or right-click → Open with browser
- Works because all CSS/JS is embedded!

**Option B: Local Server (Recommended)**
```bash
# In a NEW terminal (keep backend running!)
cd /home/akshaya/sentiment-app
python3 -m http.server 8000
# Then open: http://localhost:8000
```

---

## 🧪 Test the Connection

1. **Test Backend Health:**
   ```bash
   curl http://localhost:8080/health
   ```
   Should return: `{"status":"ok","message":"Server is running"}`

2. **Test Prediction:**
   - Open the frontend in browser
   - Click any movie card (it loads a review)
   - Click "Predict Sentiment" button
   - You should see: ✔️ Positive or ❌ Negative

---

## 🔧 Troubleshooting

### ❌ "Connection Refused" Error

**Problem:** Backend server is not running

**Solution:**
1. Make sure you completed Step 2 above
2. Check if port 8080 is in use:
   ```bash
   lsof -i :8080
   ```
3. If something else is using port 8080, kill it or change port in `Server.java`

### ❌ White Screen

**Problem:** Browser can't load files

**Solution:** 
- ✅ **FIXED!** All CSS/JS is now embedded in `index.html`
- Just open `index.html` directly - no server needed for frontend!

### ❌ "Model not found" Error

**Problem:** HDFS model path is incorrect

**Solution:**
1. Verify model exists:
   ```bash
   hdfs dfs -ls /user/akshaya/models/word2vec_tfidf_sentiment
   ```
2. If path is different, update `MODEL_PATH` in `Server.java` line 22

### ❌ CORS Errors in Browser Console

**Problem:** Browser blocking requests

**Solution:**
- ✅ **FIXED!** CORS is enabled in `Server.java`
- If still seeing errors, make sure backend is running on port 8080

---

## 📁 File Structure

```
sentiment-app/
├── index.html          ← Frontend (standalone, works directly!)
├── styles.css          ← (not needed, embedded in index.html)
├── app.js              ← (not needed, embedded in index.html)
└── sentiment-appdemo/ ← Backend
    └── src/main/java/com/akshaya/sentiment/
        └── Server.java ← REST API server
```

---

## 🎯 What Works Now

✅ Frontend loads without white screen  
✅ Movie cards display and are clickable  
✅ Reviews load into textarea  
✅ API calls to backend work  
✅ Sentiment prediction displays correctly  
✅ Error handling shows user-friendly messages  
✅ Smooth animations and transitions  

---

## 💡 Tips

- **Keep backend terminal open** - Server must run continuously
- **Use Chrome/Firefox** - Best compatibility
- **Check browser console** (F12) - See any errors
- **Test with movie cards first** - They have sample reviews ready

---

## 🆘 Still Having Issues?

1. Check backend is running: `curl http://localhost:8080/health`
2. Check browser console (F12) for errors
3. Verify HDFS is running: `jps` (should see NameNode)
4. Make sure model path is correct in `Server.java`

---

**You're all set! 🎉**

