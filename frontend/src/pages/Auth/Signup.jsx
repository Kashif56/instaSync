import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from '../../components/Auth/SignUpForm';
import SocialLogin from '../../components/Auth/SocialLogin';
import Toast from '../../components/Toast';
import { signUp } from '../../api/authApiService';

const SignUp = () => {
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (formData) => {
    try {
      setLoading(true);
      await signUp({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword
      });

      setToast({
        type: 'success',
        message: 'Account created successfully! Please check your email for verification.'
      });

      // Wait for toast to be shown before redirecting
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    } catch (error) {
      setToast({
        type: 'error',
        message: typeof error === 'string' ? error : 'Failed to create account. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 overflow-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Logo and Title */}
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
            <p className="mt-2 text-sm text-gray-400">
              Join thousands of creators managing their Instagram presence
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-gray-900/60 backdrop-blur-xl p-8 rounded-2xl border border-gray-800 shadow-xl">
            {toast && (
              <Toast
                type={toast.type}
                message={toast.message}
                onClose={() => setToast(null)}
              />
            )}

            <SignUpForm onSubmit={handleSignUp} loading={loading} />

            <div className="mt-6">
              <div className="text-center">
                <SocialLogin />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              By signing up, you agree to our{' '}
              <Link to="/terms" className="text-purple-400 hover:text-purple-300">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-purple-400 hover:text-purple-300">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;