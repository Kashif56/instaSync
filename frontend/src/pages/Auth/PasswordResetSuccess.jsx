import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';

const PasswordResetSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-md w-full bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-4">
            InstaSync
          </h1>
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AiOutlineCheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-2">
            Password Reset Complete
          </h2>
          <p className="text-gray-400 mb-8">
            Your password has been successfully reset. You can now log in with your new password.
          </p>
          <Link
            to="/auth/login"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-150 inline-block"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
