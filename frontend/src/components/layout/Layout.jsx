import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Function to close sidebar when clicking outside on mobile
  const handleMainContentClick = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />
      
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        {/* Page content */}
        <main 
          className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 md:ml-64"
          onClick={handleMainContentClick}
        >
          <div className="p-4 sm:p-6 lg:p-8">
            {children || <Outlet />}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;