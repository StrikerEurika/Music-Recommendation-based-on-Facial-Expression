import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppState } from '../../context/AppStateContext';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { userSettings, updateUserSettings } = useAppState();
  
  // Options for detection interval
  const intervalOptions = [
    { label: 'Fast (500ms)', value: 500 },
    { label: 'Normal (1000ms)', value: 1000 },
    { label: 'Slow (2000ms)', value: 2000 }
  ];
  
  // Handle detection interval change
  const handleIntervalChange = (e) => {
    updateUserSettings({
      detectionInterval: parseInt(e.target.value, 10)
    });
  };
  
  // Handle camera toggle
  const handleCameraToggle = () => {
    updateUserSettings({
      cameraEnabled: !userSettings.cameraEnabled
    });
  };
  
  return (
    <div className={`fixed top-16 left-0 z-20 h-full w-64 bg-gray-800 text-white shadow-lg transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="p-5 h-full flex flex-col">
        <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-xl font-bold">Menu</h2>
          <button 
            onClick={toggleSidebar} 
            className="rounded-full p-2 hover:bg-gray-700 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto">
          <div>
            <h3 className="font-medium text-lg mb-2">Camera Controls</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable Camera</span>
              <div className="relative inline-block w-10 align-middle select-none">
                <input 
                  type="checkbox" 
                  name="cameraEnabled" 
                  id="cameraEnabled" 
                  className="sr-only"
                  checked={userSettings.cameraEnabled}
                  onChange={handleCameraToggle}
                />
                <label 
                  htmlFor="cameraEnabled"
                  className={`block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer ${userSettings.cameraEnabled ? 'bg-indigo-500' : ''}`}
                >
                  <span 
                    className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-300 ${userSettings.cameraEnabled ? 'translate-x-4' : 'translate-x-0'}`}
                  />
                </label>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Detection Settings</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm mb-1" htmlFor="detectionInterval">Detection Interval</label>
                <select
                  id="detectionInterval"
                  className="w-full px-3 py-2 text-sm rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={userSettings.detectionInterval}
                  onChange={handleIntervalChange}
                >
                  {intervalOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400 mt-1">
                  How often the app checks your emotion
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
                  Recommendations
                </Link>
              </li>
              <li>
                <Link to="/about" className="block px-3 py-2 rounded-md hover:bg-gray-700 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-700">
          <div className="text-xs text-gray-400">
            <p>Emotify v1.0.0</p>
            <p>Using face-api.js for emotion detection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;