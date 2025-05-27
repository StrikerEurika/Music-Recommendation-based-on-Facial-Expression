import requests
import json  # Added import

url = "http://localhost:8000/emotion"
YOUR_IMAGE_PATH = r"01.jpg" # <-- Replace with your image path
files = {'file': open(
    YOUR_IMAGE_PATH, 'rb')}

try:
    response = requests.post(url, files=files)
    response.raise_for_status()  # Raise an exception for HTTP errors (4xx or 5xx)
    print(response.json())
except requests.exceptions.ConnectionError as e:
    print(f"Connection Error: Failed to connect to the server at {url}.")
    print("Please ensure the server is running and accessible.")
    print(f"Details: {e}")
except requests.exceptions.HTTPError as e:
    print(f"HTTP Error: {e}")
    print(f"Status Code: {response.status_code}")
    print("Headers:")
    for key, value in response.headers.items():
        print(f"  {key}: {value}")
    print("Response Text:")
    print(response.text)
except json.JSONDecodeError:
    print("Failed to decode JSON.")
    print(f"Status Code: {response.status_code}")
    print("Headers:")
    for key, value in response.headers.items():
        print(f"  {key}: {value}")
    print("Response Text:")
    print(response.text)
