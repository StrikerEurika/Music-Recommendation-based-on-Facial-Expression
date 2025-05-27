import random
from googleapiclient.discovery import build
from scripts import YOUTUBE_API_KEY


def get_music(emotion: str, max_results=30):
    emotion_logics = {
        "happy": ["ppstar", "laa cima cartel", "ride with us"],
        "sad": ["tena", "tena sad songs", "npn sad songs", "dg te tha nirk"],
        "angry": ["angry rock music"],
        "fear": ["dark ambient music"],
        "surprise": ["experimental music"],
        "disgust": ["grunge music"],
        "neutral": ["lofi chill beats"]
    }

    query = random.choice(emotion_logics.get(emotion, ["relaxing music"]))
    youtube = build("youtube", "v3", developerKey=YOUTUBE_API_KEY)

    # Search for videos
    search_response = youtube.search().list(
        part="snippet",
        maxResults=max_results,
        q=query,
        type="video"
    ).execute()

    video_ids = [item['id']['videoId'] for item in search_response['items']]

    # Get detailed info including duration
    video_response = youtube.videos().list(
        part="contentDetails,snippet",
        id=",".join(video_ids)
    ).execute()

    results = []
    for item in video_response['items']:
        video_id = item['id']
        snippet = item['snippet']
        duration_iso = item['contentDetails']['duration']  # e.g., PT3M30S
        title = snippet['title']
        artist = snippet['channelTitle']
        cover_image = snippet['thumbnails']['high']['url']

        # convert ISO 8601 duration to seconds
        import isodate
        duration = isodate.parse_duration(duration_iso).total_seconds()

        results.append({
            "id": video_id,
            "title": title,
            "artist": artist,
            "album": None,  # YouTube does not provide album
            "coverImageUrl": cover_image,
            "genres": [],  # YouTube does not categorize genre in API
            "duration": duration,
            "url": f"https://www.youtube.com/watch?v={video_id}"
        })

    return results
