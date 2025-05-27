import React, { useEffect } from 'react';
import { useAppState } from '../context/AppStateContext';
import RecommendationList from '../components/recommendations/RecommendationList';
import { Link } from 'react-router-dom';

const RecommendationsPage = () => {
  const { 
    currentEmotion,
    emotionHistory,
    recommendations,
    isLoadingRecommendations
  } = useAppState();

  // Get a count of each emotion type in the history
  const getEmotionCounts = () => {
    const counts = {};
    emotionHistory.forEach(item => {
      const { emotion } = item;
      if (emotion && emotion.type) {
        counts[emotion.type] = (counts[emotion.type] || 0) + 1;
      }
    });
    return counts;
  };

  // Get the most frequent emotion from history
  const getMostFrequentEmotion = () => {
    const counts = getEmotionCounts();
    let maxCount = 0;
    let mostFrequent = null;
    
    Object.entries(counts).forEach(([emotion, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequent = emotion;
      }
    });
    
    return mostFrequent;
  };

  const emotionCounts = getEmotionCounts();
  const mostFrequentEmotion = getMostFrequentEmotion();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Music Recommendations</h1>
        <p className="text-gray-600 mt-1">Personalized music based on your emotional state</p>
      </div>
      
      {/* Current recommendations */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h2 className="text-2xl font-bold">Current Recommendations</h2>
          {currentEmotion ? (
            <p className="opacity-80">Based on your {currentEmotion.type} mood</p>
          ) : (
            <p className="opacity-80">No emotion detected yet</p>
          )}
        </div>
        
        <div className="p-6">
          {currentEmotion ? (
            <RecommendationList emotion={currentEmotion} />
          ) : (
            <div className="text-center py-8">
              <div className="bg-gray-100 inline-block p-4 rounded-full mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No Emotion Detected</h3>
              <p className="mt-2 text-gray-600 max-w-md mx-auto">
                To get personalized music recommendations, go to the Home page and enable emotion detection.
              </p>
              <Link 
                to="/"
                className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg"
              >
                Go to Camera
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Emotion history stats */}
      {emotionHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Emotion History</h2>
          
          <div className="mb-4">
            <p className="text-gray-600 mb-2">
              Most frequent emotion: 
              <span className="font-semibold capitalize ml-1">{mostFrequentEmotion || 'None'}</span>
            </p>
            <p className="text-gray-600">
              Total emotions detected: {emotionHistory.length}
            </p>
          </div>
          
          <h3 className="text-md font-medium text-gray-700 mb-2">Emotion Distribution</h3>
          <div className="space-y-3">
            {Object.entries(emotionCounts).map(([emotion, count]) => (
              <div key={emotion}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 capitalize">{emotion}</span>
                  <span className="text-sm text-gray-500">
                    {count} ({Math.round((count / emotionHistory.length) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${(count / emotionHistory.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Tips */}
      <div className="bg-indigo-50 rounded-lg p-6 border border-indigo-100">
        <h2 className="text-lg font-semibold text-indigo-800 mb-3">Music Recommendation Tips</h2>
        <ul className="space-y-2 text-indigo-700">
          <li className="flex items-start">
            <svg className="h-5 w-5 mr-2 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Ensure good lighting for more accurate emotion detection
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 mr-2 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Face the camera directly for best results
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 mr-2 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Allow a few seconds for emotion detection to stabilize
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 mr-2 text-indigo-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            You can adjust the detection sensitivity in the settings panel
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RecommendationsPage;