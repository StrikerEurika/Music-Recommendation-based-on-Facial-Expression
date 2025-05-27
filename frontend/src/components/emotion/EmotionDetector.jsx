import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import apiService from '../../services/apiService';
import CameraView from '../camera/CameraView';

/**
 * EmotionDetector component - Sends captured image to backend for emotion and recommendations
 */
const EmotionDetector = () => {
  const {
    setDetecting,
    updateEmotion,
    setRecommendations,
    addError,
    currentEmotion,
    isCameraActive,
    setLoadingRecommendations, // Added from useAppState
  } = useAppState();

  const [captureStatus, setCaptureStatus] = useState('');

  // Handle image capture from CameraView
  const handleImageCapture = async (imageDataBlob) => { // Renamed imageDataUrl to imageDataBlob for clarity
    setCaptureStatus('Sending image to backend...');
    setLoadingRecommendations(true); // Use global loading state
    try {
      // Send image to backend for emotion detection and recommendations
      const response = await apiService.detectEmotion(imageDataBlob);
      // Expecting: { emotion: {type, dominantScore, rawScores}, songs: [...] }
      if (response && response.emotion) {
        updateEmotion(response.emotion);
      }
      if (response && response.songs) { // Changed from response.recommendations to response.songs
        setRecommendations(response.songs);
      } else {
        setRecommendations([]); // Clear recommendations if API doesn't return songs
      }
      setCaptureStatus('Analysis complete!');
    } catch (error) {
      setCaptureStatus('Failed to send image.');
      addError('Failed to send image to backend: ' + error.message);
      setRecommendations([]); // Clear recommendations on error
    } finally {
      setLoadingRecommendations(false); // Use global loading state
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Main emotion detection display */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Emotion Detection</h2>
          <p className="text-sm text-gray-600">
            The camera will capture your face and send it to the backend for analysis and music recommendations.
          </p>
        </div>
        {/* Camera view component */}
        <div className="p-4">
          <CameraView onCapture={handleImageCapture} />
          {captureStatus && (
            <div className="mt-2 text-sm text-blue-600">{captureStatus}</div>
          )}
        </div>
      </div>
      {/* Current emotion display */}
      {currentEmotion && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h3 className="font-medium">Current Emotion</h3>
            <div className="text-2xl font-bold capitalize">{currentEmotion.type}</div>
            <div className="text-sm opacity-80">Confidence: {Math.round(currentEmotion.dominantScore)}%</div>
          </div>
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Emotion Breakdown</h4>
            <div className="space-y-2">
              {Object.entries(currentEmotion.rawScores || {}).map(([emotion, score]) => (
                <div key={emotion} className="flex items-center">
                  <div className="w-24 text-sm capitalize">{emotion}</div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          emotion === currentEmotion.type ? 'bg-indigo-600' : 'bg-gray-400'
                        }`} 
                        style={{ width: `${Math.round(score)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-right text-xs text-gray-600">{Math.round(score)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionDetector;