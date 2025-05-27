import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAppState } from '../../context/AppStateContext';

const Navbar = ({ title = 'Emotify', toggleSidebar }) => {
  const location = useLocation();
  const { currentEmotion } = useAppState();
  
  return (
    <nav className="bg-gradient-to-r from-purple-700 to-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={toggleSidebar} 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed. Heroicon name: menu */}
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold tracking-wider">{title}</span>
            </Link>
            
            {/* Navigation links */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link 
                to="/" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === '/' ? 'border-b-2 border-white' : 'text-gray-200 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/recommendations" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === '/recommendations' ? 'border-b-2 border-white' : 'text-gray-200 hover:text-white'
                }`}
              >
                Recommendations
              </Link>
              <Link 
                to="/about" 
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  location.pathname === '/about' ? 'border-b-2 border-white' : 'text-gray-200 hover:text-white'
                }`}
              >
                About
              </Link>
            </div>
          </div>
          
          {/* Right side info */}
          <div className="flex items-center">
            {currentEmotion && (
              <div className="bg-indigo-800 py-1 px-3 rounded-full text-sm">
                Current Mood: <span className="font-semibold capitalize">{currentEmotion.type}</span>
              </div>
            )}
            <div className="ml-3 relative flex space-x-4">
              {/* Profile dropdown or additional links could go here */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu could be added here */}
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;