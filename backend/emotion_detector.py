import cv2
from deepface import DeepFace


def detect_emotion(img_path: str) -> dict:
    img = cv2.imread(img_path)
    prediction = DeepFace.analyze(
        img, actions=['emotion'],
        enforce_detection=False)
    dominant_emotion = prediction[0]['dominant_emotion']
    dominant_score = float(
        prediction[0]['emotion'][dominant_emotion])  # Convert to float
    # Convert all values to float
    raw_scores = {k: float(v) for k, v in prediction[0]['emotion'].items()}

    return {
        "type": dominant_emotion,
        "dominantScore": dominant_score,
        "rawScores": raw_scores
    }
