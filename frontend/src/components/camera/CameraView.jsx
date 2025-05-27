import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppState } from '../../context/AppStateContext';
import cameraService from '../../services/cameraService';

const CameraView = ({ onFrameCapture, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const { isCameraActive, setCameraActive } = useAppState();
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Start camera when component mounts
  useEffect(() => {
    const startCamera = async () => {
      setIsLoading(true);
      try {
        // Initialize camera with default settings
        await cameraService.initialize(videoRef.current, canvasRef.current);
        await cameraService.startCapture({ video: true }); // Simple constraints first
        setCameraActive(true);
        setErrorMessage('');
      } catch (error) {
        console.error('Camera Error:', error);
        setErrorMessage('Camera access failed. Check permissions.');
        setCameraActive(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Start camera only if not already active
    if (!cameraService.isActive) {
      startCamera();
    }

    // Cleanup on unmount
    return () => {
      if (cameraService.isActive) {
        cameraService.stopCapture();
        setCameraActive(false);
      }
    };
  }, []); // Empty dependency array = runs only once on mount

  // Rest of your component remains the same...
  return (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      {/* Camera feed */}
      <div className="relative aspect-video bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
        
        {errorMessage && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-10">
            <div className="text-center p-4">
              <p className="text-red-500 mb-2">{errorMessage}</p>
              <button 
                onClick={() => window.location.reload()} // Simple retry
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />
      </div>
      
      {/* Controls */}
      <div className="p-3 bg-gray-800 flex justify-between items-center">
        {!isCameraActive ? (
          <button
            onClick={async () => {
              setIsLoading(true);
              try {
                await cameraService.initialize(videoRef.current, canvasRef.current);
                await cameraService.startCapture({ video: true });
                setCameraActive(true);
                setErrorMessage('');
              } catch (error) {
                setErrorMessage('Camera access failed. Check permissions.');
                setCameraActive(false);
              } finally {
                setIsLoading(false);
              }
            }}
            className="py-1 px-3 rounded text-sm bg-green-600 hover:bg-green-700 text-white"
          >
            Turn On Camera
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                cameraService.stopCapture();
                setCameraActive(false);
              }}
              className="py-1 px-3 rounded text-sm bg-red-600 hover:bg-red-700 text-white"
            >
              Turn Off Camera
            </button>
            <button
              onClick={() => {
                if (canvasRef.current && videoRef.current) {
                  const context = canvasRef.current.getContext('2d');
                  canvasRef.current.width = videoRef.current.videoWidth;
                  canvasRef.current.height = videoRef.current.videoHeight;
                  context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

                  // Convert canvas to Blob and pass it to onCapture
                  canvasRef.current.toBlob((blob) => {
                    if (blob && onCapture) {
                      onCapture(blob);
                    }
                  }, 'image/jpeg');
                }
              }}
              className="py-1 px-3 rounded text-sm bg-blue-600 hover:bg-blue-700 text-white ml-2"
            >
              Capture
            </button>
          </>
        )}
      </div>
      
      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

CameraView.propTypes = {
  onFrameCapture: PropTypes.func,
  onCapture: PropTypes.func,
};

export default CameraView;