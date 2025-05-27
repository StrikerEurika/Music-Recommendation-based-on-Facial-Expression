import React from 'react';
import PropTypes from 'prop-types';

/**
 * MusicCard component - Display an individual music recommendation
 */
const MusicCard = ({ song, onSelect }) => {
  const defaultCoverImage = '/assets/images/default_album.jpg';

  // Handle missing cover image
  const handleImageError = (e) => {
    e.target.src = defaultCoverImage;
  };

  // Format song duration from seconds to HH:MM:SS or MM:SS
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
      onClick={() => onSelect(song)}
    >
      {/* Album cover */}
      <div className="aspect-square bg-gray-200 overflow-hidden">
        <img
          src={song.coverImageUrl || defaultCoverImage}
          alt={`${song.title} album cover`}
          onError={handleImageError}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Song information */}
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate">{song.title}</h3>
        <p className="text-sm text-gray-600 truncate">{song.artist}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-gray-500">{song.album}</div>
          <div className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
            {formatDuration(song.duration)}
          </div>
        </div>
        
        {/* Genres */}
        <div className="flex flex-wrap gap-1 mt-2">
          {song.genres && song.genres.map((genre) => (
            <span 
              key={genre} 
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

MusicCard.propTypes = {
  song: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    album: PropTypes.string,
    coverImageUrl: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string),
    duration: PropTypes.number
  }).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default MusicCard;