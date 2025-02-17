import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineRight } from 'react-icons/ai';

const Hero = () => {

  const accessToken = localStorage.getItem('token')



  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#9333ea)] opacity-50">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M0 0h30v30H0z" fill="none"/>
                <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.1)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative pt-6 pb-16 sm:pb-24">
          <div className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl font-montserrat">
                <span className="block">Automate & Optimize Your</span>{' '}
                <span className="block bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text">
                  Instagram Presence
                </span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-poppins">
                Schedule posts, analyze performance, and grow your Instagram following with AI-powered tools. The all-in-one Instagram management platform for creators and businesses.
              </p>
              <div className="mt-5 w-full mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  {accessToken ? (
                    <Link
                    to='/posts/add'
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
                    >
                    <span className='flex items-center gap-1'><AiOutlineRight />Schedule Posts</span>
                    
                  </Link>
                  ) : (
                    <Link
                    to="/auth/signup"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className='flex items-center gap-1'>Get Started Free <AiOutlineRight /></span>
                    
                  </Link>
                  )}
                  
                  
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/demo"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-100 bg-purple-800 hover:bg-purple-900 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105"
                  >
                    Watch Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-700" />
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div className="py-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/20 to-gray-900/20 z-10"></div>
              <img
                className="w-full h-auto relative z-0"
                src="https://cdn.dribbble.com/userupload/18450648/file/original-79431d353f826b85bac10b3028b41ad4.png"
                alt="InstaSync Dashboard Preview"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96">
        <div className="absolute w-full h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      </div>
      <div className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 w-96 h-96">
        <div className="absolute w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 w-96 h-96">
        <div className="absolute w-full h-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default Hero;
