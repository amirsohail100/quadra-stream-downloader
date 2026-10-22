# ⚡ Quadra Stream Downloader (Full-Stack FastAPI + Mounted Frontend)

<p align="center">
  <b>A Production-Ready Full-Stack YouTube Video & Audio Downloader Web Application</b>
  <br>
  Built and Maintained by <b>Quadra Collective</b>
</p>

---

## 🚀 Overview

**Quadra Stream Downloader** is a complete full-stack web application. The backend is built using **FastAPI** and **`yt-dlp`**, which serves both the REST API endpoints (`/api/fetch`, `/api/download`) and mounts the static HTML5, CSS3, and JavaScript frontend directly at the root (`/`).

This design ensures seamless deployment on cloud platforms like **Render**, **Railway**, or **Vercel** with zero CORS setup required!

---

## ✨ Key Features

- 📹 **Real Video Downloads:** Supports 1080p, 720p, and 360p MP4 format extraction.
- 🎵 **Real Audio Extraction:** High-quality MP3 audio track extraction (320kbps, 192kbps, 128kbps).
- ⚡ **Mounted Static Frontend:** Built-in FastAPI `StaticFiles` mounting — no separate frontend server needed.
- 🎨 **Glassmorphism UI:** Modern dark aesthetic with responsive layouts and live toast notifications.
- 📦 **Deploy-Ready:** Complete with `requirements.txt` for one-click Render deployment.

---

## 📂 Project Directory Structure

```text
quadra-stream-downloader/
├── main.py              # FastAPI Application & Stream Downloader API
├── requirements.txt     # Python Dependencies for Render / Deployment
├── README.md            # Project Documentation
└── static/
    ├── index.html       # Frontend HTML Layout
    ├── css/
    │   └── style.css    # Custom Dark Glassmorphic CSS
    └── js/
        └── script.js    # Interactive JS API Client
```

---

## 🛠️ Local Development Setup

1. **Clone the Repository / Extract ZIP**
2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```
3. **Run the FastAPI Server:**
   ```bash
   uvicorn main:app --reload
   ```
4. **Open in Browser:**
   Visit `http://127.0.0.1:8000/` in your browser.

---

## ☁️ Deployment on Render

1. Create a **New Web Service** on Render and connect your GitHub repository (`quadra-stream-downloader`).
2. Set Environment to **Python 3**.
3. **Build Command:**
   ```bash
   pip install -r requirements.txt
   ```
4. **Start Command:**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port $PORT
   ```

---

## 🛡️ License

Distributed under the **MIT License**. Created by **Quadra Collective**.
