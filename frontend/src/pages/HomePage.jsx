import React from 'react';
import EmotionDetector from '../components/emotion/EmotionDetector';
import RecommendationList from '../components/recommendations/RecommendationList';
import { useAppState } from '../context/AppStateContext';

const HomePage = () => {
  const { currentEmotion } = useAppState();
  
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Emotify</h1>
        <p className="text-gray-600 mt-1">Discover music that matches your mood</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Camera and emotion detection */}
        <div className="lg:col-span-1 space-y-6">
          <EmotionDetector />
        </div>
        
        {/* Right column - Recommendations preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Music Recommendations</h2>
            
            {currentEmotion ? (
              <>
                <p className="mb-4 text-gray-600">
                  Based on your <span className="font-semibold capitalize">{currentEmotion.type}</span> emotion,
                  here are some songs that might match your mood.
                </p>
                <RecommendationList emotion={currentEmotion} />
              </>
            ) : (
              <div className="text-center py-8">
                <div className="bg-gray-100 inline-block p-4 rounded-full mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900">Ready to get music recommendations?</h3>
                <p className="mt-2 text-gray-600 max-w-md mx-auto">
                  Turn on your camera and enable emotion detection to let Emotify analyze your mood
                  and suggest personalized music recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* How it works section */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 rounded-full p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">1. Capture</h3>
            <p className="mt-2 text-gray-600">
              Allow access to your camera so Emotify can analyze your facial expressions in real-time.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-100 rounded-full p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">2. Analyze</h3>
            <p className="mt-2 text-gray-600">
              Our AI technology detects your current emotional state from your facial expressions.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-pink-100 rounded-full p-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h3 className="mt-3 text-lg font-medium text-gray-900">3. Recommend</h3>
            <p className="mt-2 text-gray-600">
              Based on your detected emotion, we suggest music that complements your current mood.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;