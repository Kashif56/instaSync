import React from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import SocialLogin from '../../components/Auth/SocialLogin';

import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#9333ea)] opacity-30">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="auth-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M0 0h30v30H0z" fill="none"/>
                <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.1)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#auth-pattern)"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link
        to='/'>
        <h1 className="text-center text-4xl font-bold tracking-tighter">
          <span className="bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text">Insta</span>
          <span className="text-white">Sync</span>
        </h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          Sign in to continue managing your Instagram presence
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-gray-900/50 backdrop-blur-xl py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-800">
          <LoginForm />
          <SocialLogin />
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

export default Login;
