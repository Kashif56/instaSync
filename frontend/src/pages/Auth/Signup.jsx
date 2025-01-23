import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUpForm from '../../components/Auth/SignUpForm';
import Toast from '../../components/Toast';
import SocialLogin from '../../components/Auth/SocialLogin';

const SignUp = () => {
  const [toast, setToast] = useState(null);

  const handleSignUp = async (userData) => {
    try {
      // TODO: Implement signup logic
      console.log('Signing up with:', userData);
      setToast({ type: 'success', message: 'Account created successfully!' });
      // Navigate to login after successful signup
    } catch (error) {
      setToast({ type: 'error', message: error.message || 'Signup failed. Please try again.' });
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
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
      <div className="relative w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link to='/'>
            <h1 className="text-4xl font-bold tracking-tighter">
              <span className="bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text">Insta</span>
              <span className="text-white">Sync</span>
            </h1>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Create your account
          </h2>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-xl py-8 px-4 shadow-xl rounded-lg border border-gray-800">
          {toast && (
            <Toast
              type={toast.type}
              message={toast.message}
              onClose={() => setToast(null)}
            />
          )}
          <SignUpForm onSubmit={handleSignUp} />
          
          <div className="mt-6 text-center">
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;