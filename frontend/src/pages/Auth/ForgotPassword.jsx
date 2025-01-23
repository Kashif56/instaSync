import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import Toast from '../../components/Toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement password reset request
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
    setToast({ type: 'success', message: 'Reset link sent successfully!' });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
        <div className="max-w-md w-full bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-2">
              InstaSync
            </h1>
            <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AiOutlineMail className="w-8 h-8 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-400 mb-6">
              We've sent a password reset link to {email}. Please check your email and follow the instructions to reset your password.
            </p>
            <Link
              to="/auth/login"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
      <div className="max-w-md w-full bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-2">
            InstaSync
          </h1>
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <AiOutlineMail className="w-8 h-8 text-purple-500" />
          </div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-2">
            Forgot Password?
          </h2>
          <p className="text-gray-400">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-black/30 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-150"
          >
            Send Reset Link
          </button>

          <div className="text-center">
            <Link
              to="/auth/login"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
