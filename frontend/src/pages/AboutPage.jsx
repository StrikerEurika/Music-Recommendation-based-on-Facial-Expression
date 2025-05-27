import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">About Emotify</h1>
        <p className="text-gray-600 mt-1">Learn more about our emotion-based music recommendation system</p>
      </div>
      
      {/* What is Emotify section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">What is Emotify?</h2>
        <p className="text-gray-700 mb-4">
          Emotify is an innovative web application that harnesses the power of computer vision and artificial intelligence
          to analyze your facial expressions and detect your emotional state in real-time. Based on your detected emotion,
          Emotify curates and recommends music that aligns with or complements your current mood.
        </p>
        <p className="text-gray-700">
          Whether you're feeling happy, sad, surprised, or any other emotion, Emotify helps you discover music that resonates
          with your emotional state, enhancing your listening experience and potentially improving your mood.
        </p>
      </div>
      
      {/* How it works section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-indigo-100 p-4 rounded-full flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Facial Analysis</h3>
              <p className="text-gray-700">
                Using your device's camera, Emotify captures your facial expressions in real-time. 
                Our application uses face-api.js, a JavaScript API for face detection and recognition.
                This technology identifies key facial landmarks and expressions to determine your emotional state.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-purple-100 p-4 rounded-full flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2. Emotion Classification</h3>
              <p className="text-gray-700">
                Once your facial expressions are analyzed, our emotion detection algorithm classifies your
                emotional state into categories such as happy, sad, angry, surprised, fearful, disgusted, or neutral.
                The system considers confidence levels to ensure accurate emotion recognition.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-pink-100 p-4 rounded-full flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Music Mapping</h3>
              <p className="text-gray-700">
                Emotify uses a sophisticated recommendation engine that maps emotional states to musical attributes.
                For example, happy emotions might align with upbeat, major-key songs, while sad emotions
                might match with slower, minor-key tracks. This mapping is based on music psychology research
                and established emotional connections to musical features.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-4">
            <div className="bg-green-100 p-4 rounded-full flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">4. Personalized Recommendations</h3>
              <p className="text-gray-700">
                Finally, Emotify curates a list of song recommendations tailored to your emotional state.
                These recommendations are designed to either enhance your current mood (e.g., happy music for happy emotions)
                or provide a therapeutic contrast (e.g., uplifting music for sad emotions), depending on the emotional context.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Technology Stack section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Technology Stack</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
            <ul className="space-y-1 text-gray-700">
              <li>React.js - UI components and state management</li>
              <li>Tailwind CSS - Styling and responsive design</li>
              <li>React Router - Navigation and routing</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Emotion Detection</h3>
            <ul className="space-y-1 text-gray-700">
              <li>face-api.js - Face detection and expression recognition</li>
              <li>TensorFlow.js - Machine learning models</li>
              <li>WebRTC - Camera access</li>
            </ul>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Data Management</h3>
            <ul className="space-y-1 text-gray-700">
              <li>Context API - Application state management</li>
              <li>Local Storage - User preferences and settings</li>
              <li>Mock API - Simulated recommendation engine</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Privacy section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Privacy and Security</h2>
        
        <p className="text-gray-700 mb-4">
          Emotify is designed with your privacy in mind. All facial analysis occurs locally within your browser,
          and no video or image data is ever transmitted to external servers. Your emotional data is only stored
          temporarily to provide you with the best music recommendations and is cleared when you close the application.
        </p>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-blue-700">
          <div className="flex">
            <svg className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>
              Emotify requires camera access to function properly. You can revoke this permission at any time through
              your browser settings, but this will disable the emotion detection features of the application.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
        <p className="mb-6 opacity-90">
          Ready to experience music recommendations that match your mood? Try Emotify now by enabling your camera
          and letting our emotion detection system work its magic!
        </p>
        <Link 
          to="/"
          className="bg-white text-indigo-700 hover:bg-indigo-50 px-6 py-2 rounded-lg font-medium inline-block"
        >
          Go to Home
        </Link>
      </div>
      
      {/* Footer note */}
      <p className="text-sm text-gray-500 text-center mt-8">
        Emotify v1.0.0 - Built with React, face-api.js, and 💖
      </p>
    </div>
  );
};

export default AboutPage;