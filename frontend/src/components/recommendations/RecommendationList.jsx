import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MusicCard from './MusicCard';
import { useAppState } from '../../context/AppStateContext';
import apiService from '../../services/apiService';

/**
 * RecommendationList component - Displays list of recommended songs based on emotion
 */
const RecommendationList = ({ emotion }) => {
  const { 
    recommendations, 
    setRecommendations, 
    isLoadingRecommendations, 
    setLoadingRecommendations,
    addError
  } = useAppState();
  
  const [selectedSong, setSelectedSong] = useState(null);
  
  // Load recommendations when emotion changes
  useEffect(() => {
    console.log("RecommendationList: useEffect triggered.");
    console.log("Emotion prop:", emotion);
    console.log("Recommendations from context:", recommendations);
    console.log("isLoadingRecommendations from context:", isLoadingRecommendations);

    // Ensure recommendations are already set by EmotionDetector
    if (!emotion) {
      console.log("RecommendationList: No emotion detected in prop for useEffect.");
      return;
    }

    // No additional API call is needed as recommendations are set in context
    // This implies EmotionDetector.jsx or a similar component handles fetching.
  }, [emotion, recommendations, isLoadingRecommendations]); // Log when these key states change
  
  // Handle song selection
  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };
  
  // Close song details modal
  const closeSongDetails = () => {
    setSelectedSong(null);
  };
  
  // No emotion detected yet
  if (!emotion) {
    console.log("RecommendationList: Rendering 'No Emotion Detected Yet'.");
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No Emotion Detected Yet</h3>
        <p className="mt-2 text-gray-600">
          Turn on the camera and enable emotion detection to get personalized music recommendations.
        </p>
      </div>
    );
  }
  
  // Loading state
  if (isLoadingRecommendations) {
    console.log("RecommendationList: Rendering 'Loading recommendations...'. Emotion type:", emotion?.type);
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-600">Loading recommendations for your {emotion?.type || 'detected'} mood...</p>
        </div>
      </div>
    );
  }
  
  // No recommendations found
  if (!recommendations || recommendations.length === 0) {
    console.log("RecommendationList: Rendering 'No Recommendations Found'. Emotion type:", emotion?.type, "Recommendations array:", recommendations);
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No Recommendations Found</h3>
        <p className="mt-2 text-gray-600">
          We couldn't find any music recommendations for your current mood ({emotion?.type || 'unknown'}).
          Please try again or try a different emotion.
        </p>
      </div>
    );
  }
  
  console.log("RecommendationList: Rendering recommendations. Count:", recommendations.length, "Emotion type:", emotion?.type);
  return (
    <div className="space-y-4">
      {/* Recommendation header */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Music for your {emotion.type} mood
            </h2>
            <p className="text-sm text-gray-600">
              {recommendations.length} songs recommended based on your current emotion
            </p>
          </div>
          <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
            {emotion.type}
          </div>
        </div>
      </div>
      
      {/* Recommendation grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {recommendations.map((song, index) => (
          <MusicCard
            key={song.url || index} // Use song.url or index as key
            song={song}
            onSelect={handleSongSelect}
          />
        ))}
      </div>

      {/* Song details modal */}
      {selectedSong && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="relative">
              {/* Album cover from API */}
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                {selectedSong.coverImageUrl ? (
                  <img 
                    src={selectedSong.coverImageUrl}
                    alt={`${selectedSong.title} cover`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a1.5 1.5 0 011.5 1.5v5.168A2.494 2.494 0 0113 12.5a2.5 2.5 0 11-5 0 2.494 2.494 0 011.5-2.332V5.5A1.5 1.5 0 0110 4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>

              {/* Close button */}
              <button
                onClick={closeSongDetails}
                className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Song details */}
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedSong.title}</h3>
              {/* Removed artist, album, genres, duration as they are not in the API response */}

              <div className="mt-6 flex justify-center items-center">
                <a
                  href={selectedSong.url} // Use direct URL from API
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded flex items-center text-sm"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                  Watch on YouTube
                </a>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={closeSongDetails}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

RecommendationList.propTypes = {
  emotion: PropTypes.shape({
    type: PropTypes.string.isRequired,
    dominantScore: PropTypes.number.isRequired,
    rawScores: PropTypes.object
  })
};

export default RecommendationList;