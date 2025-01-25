import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';

import { useDispatch, useSelector } from 'react-redux';

import { getUser } from '../api/generalApiService';

const Navbar = () => {

  const accessToken = localStorage.getItem('token')
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const userData = localStorage.getItem('userData')
  const user_data = JSON.parse(userData)

  
  





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
            <Link to="/posts/" className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
            Posts
            </Link>
            <Link to="/features" className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Pricing
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
              About
            </Link>
           
           {isAuthenticated ? (
            <div className='flex items-center space-x-2'>
              <Link to="/auth/profile" className="flex items-center space-x-3 text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200">
                <span className='text-lg mr-1'><AiOutlineUser /></span>
                 {user_data?.username}
              </Link>
              <button className='bg-red-800 rounded-md text-white flex items-center space-x-3 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200'>
                <span className='text-lg mr-1'><AiOutlineLogout /></span>
                Logout
              </button>
            </div>
            
           ): (
            <Link to="/auth/signup" className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
              Get Started
            </Link>
          )}
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
