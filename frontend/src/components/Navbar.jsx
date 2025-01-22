import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-purple-900 fixed w-full z-50 backdrop-blur-lg bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 font-montserrat">
              InstaSync
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link to="/features" className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Pricing
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              About
            </Link>
           
            <Link to="/auth/signup" className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
