import os
import re
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import yt_dlp

app = FastAPI(
    title="Quadra Stream Downloader API",
    description="Full-stack YouTube Video & Audio Downloader Service",
    version="1.0.0"
)

class VideoRequest(BaseModel):
    url: str

class DownloadRequest(BaseModel):
    url: str
    type: str  # 'video' or 'audio'
    quality: str  # e.g., '1080p', '720p', '360p', '320kbps', '192kbps', '128kbps'

def clean_filename(title: str) -> str:
    return re.sub(r'[\\/*?:"<>|]', "", title)

@app.post("/api/fetch")
async def fetch_video_info(req: VideoRequest):
    ydl_opts = {
        'quiet': True,
        'no_warnings': True,
        'skip_download': True
    }
    
    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(req.url, download=False)
            
            views = info.get('view_count', 0)
            if views >= 1_000_000:
                formatted_views = f"{views / 1_000_000:.1f}M"
            elif views >= 1_000:
                formatted_views = f"{views / 1_000:.1f}K"
            else:
                formatted_views = str(views)

            return {
                "title": info.get('title', 'YouTube Media'),
                "thumbnail": info.get('thumbnail', ''),
                "duration": info.get('duration_string', 'N/A'),
                "channel": info.get('uploader', 'Unknown Creator'),
                "views": formatted_views,
                "upload_date": info.get('upload_date', 'Recently')
            }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch video metadata: {str(e)}")

@app.post("/api/download")
async def get_download_stream(req: DownloadRequest):
    try:
        if req.type == 'video':
            res = req.quality.replace('p', '')
            format_selector = f"bestvideo[height<={res}][ext=mp4]+bestaudio[ext=m4a]/best[height<={res}][ext=mp4]/best"
        else:
            format_selector = "bestaudio/best"

        ydl_opts = {
            'format': format_selector,
            'quiet': True,
            'no_warnings': True
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(req.url, download=False)
            
            download_url = None
            if 'url' in info:
                download_url = info['url']
            elif 'formats' in info and len(info['formats']) > 0:
                download_url = info['formats'][-1].get('url')

            if not download_url:
                raise HTTPException(status_code=400, detail="Unable to extract direct stream URL.")

            filename = f"{clean_filename(info.get('title', 'download'))}.{'mp4' if req.type == 'video' else 'mp3'}"

            return {
                "download_url": download_url,
                "filename": filename,
                "title": info.get('title')
            }

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Download extraction failed: {str(e)}")

# Mount static files folder
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def serve_index():
    return FileResponse("static/index.html")
