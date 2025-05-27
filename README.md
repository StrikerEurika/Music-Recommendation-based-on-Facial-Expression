# **Music-Recommendation-based-on-Facial-Expression**

## **App Setup**

#### **Clone the repository**
```bash
git clone https://github.com/StrikerEurika/Music-Recommendation-based-on-Facial-Expression.git

cd Music-Recommendation-based-on-Facial-Expression
```

Now you see the following structure:

```
Music-Recommendation-based-on-Facial-Expression
├── backend
├── frontend
├── .gitignore
└── README.md
```

We have two main directories: `backend` and `frontend`.

#### **Backend**

Go to the `backend` directory to set up the backend server.

```bash
cd backend
```

Here, you will find the backend code of *FastAPI* that handles the music recommendation logic based on facial expressions, about which you can find more information via [Emotion-Based-Music](https://github.com/theanthefinest/Emotion-Based-Music.git) repo by [LY Chhaythean](https://github.com/theanthefinest/).

The structure:

```
backend
├── emotion_detector.py
├── main.py
├── music_recommender.py
├── requirements.txt
├── scripts.py
└── test_api.py
```

Create a virtual environment and activate it:

```bash
# create
python -m venv .venv

# activate
.venv/bin/activate  # On Windows use: .venv\Scripts\activate
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
```

Then, install the required dependencies:

```bash
pip install -r requirements.txt
```

Finally, run the FastAPI server:

```bash
uvicorn main:app --reload
```
Now, the backend server should be running at `http://localhost:8000`.
You can test the API endpoints using tools like Postman or directly in your browser.

#### **Frontend**

Go to the `frontend` directory to set up the frontend application.

```bash
cd ../frontend
```
Here, you will find the frontend code of *React* that provides a user interface for interacting with the music recommendation system.
The structure:

```
frontend
├── public
├── src
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

Install the required dependencies using npm:

```bash
npm install
```
After the installation is complete, you can start the React application:

```bash
npm run dev
```
Now, the frontend application should be running at `http://localhost:3000` (Maybe different in your device).
You can access the user interface in your web browser and start using the music recommendation system based on facial expressions.

## **Usage**
Once both the backend and frontend servers are running, you can use the application as follows:
1. Open your web browser and navigate to `http://localhost:3000`.
2. You will see the user interface where you can upload an image or video of your face.
3. The application will process the image captured the the streaming video, detect your facial expression, and recommend music based on that expression.
4. You can listen to the recommended music on youtube via the link from the application.

## **Local-machine requirement**

- Python 3.8 or higher
- Node.js 14 or higher
- npm (Node Package Manager)

## **Contributing**

If you want to contribute to this project, feel free to fork the repository and submit a pull request. Contributions are welcome!

## **Credits**

This project is inspired by the work of [LY Chhaythean](https://github.com/theanthefinest/) who built the original music recommendation system based on facial expressions. The backend code is adapted from [Emotion-Based-Music](https://github.com/theanthefinest/Emotion-Based-Music.git)