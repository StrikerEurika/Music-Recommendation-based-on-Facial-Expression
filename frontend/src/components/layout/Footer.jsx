import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold text-white mb-2">Emotify</h2>
            <p className="text-sm">Personalized music recommendations based on your emotions</p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/serengil/deepface" className="text-sm hover:text-white transition-colors">
                    Deepface
                  </a>
                </li>
                <li>
                  <a href="https://github.com/justadudewhohacks/face-api.js" className="text-sm hover:text-white transition-colors">
                    Face-API.js
                  </a>
                </li>
                <li>
                  <a href="https://reactjs.org" className="text-sm hover:text-white transition-colors">
                    React
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white transition-colors">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-4">
          <p className="text-sm text-center text-gray-400">
            &copy; {new Date().getFullYear()} Emotify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;