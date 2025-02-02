import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';
import { FaInstagram } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../api/generalApiService';
import { logout as logoutApi, initiateInstagramLogin } from '../api/authApiService';
import { logout as logoutAction } from '../redux/slicers/AuthSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = localStorage.getItem('userData');
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  const user_data = JSON.parse(userData);

  const handleLogout = async () => {
    try {
      await logoutApi();
      toast.success('Logged out successfully');
      navigate('/auth/login');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  const handleInstagramLogin = async () => {
    try {
      await initiateInstagramLogin();
    } catch (error) {
      console.error('Instagram login error:', error);
      toast.error('Failed to initiate Instagram login. Please try again.');
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-purple-900 fixed w-full z-50 backdrop-blur-lg bg-opacity-80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                InstaSync
              </Link>
            </div>
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

            {!user_data ? (
              <>
                <button
                  onClick={handleInstagramLogin}
                  className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-md hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                >
                  <FaInstagram className="text-xl" />
                  <span>Login with Instagram</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center">
                  <span className='text-lg mr-1'><AiOutlineUser /></span>
                  {user_data?.username}
                </Link>
                <button 
                  className="bg-red-800 rounded-md text-white flex items-center space-x-3 hover:bg-red-700 px-3 py-2 text-sm font-medium transition-colors duration-200"
                  onClick={handleLogout}
                >
                  <span className='text-lg mr-1'><AiOutlineLogout /></span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
