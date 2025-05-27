from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import shutil
from emotion_detector import detect_emotion
from music_recommender import get_music
from fastapi.logger import logger
import logging

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, use specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/emotion")
async def process_emotion(file: UploadFile = File(...)):
    try:
        with open("temp.jpg", "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        logger.info("File saved as temp.jpg")

        # Detect emotion
        emotion = detect_emotion("temp.jpg")
        logger.info(f"Detected emotion: {emotion}")

        # Extract emotion type
        emotion_type = emotion.get("type", "neutral")

        # Get music recommendations
        songs = get_music(emotion_type)
        logger.info(f"Recommended songs: {songs}")

        return {"emotion": emotion, "songs": songs}

    except Exception as e:
        logger.error(f"Error processing emotion: {e}")
        return JSONResponse(content={"error": "Internal Server Error", "details": str(e)}, status_code=500)
