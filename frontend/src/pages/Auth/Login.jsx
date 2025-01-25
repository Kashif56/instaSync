import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../api/authApiService';
import LoginForm from '../../components/Auth/LoginForm';
import SocialLogin from '../../components/Auth/SocialLogin';
import Toast from '../../components/Toast';

import { Link } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (formData) => {
    try {
      setLoading(true);
  
      
      await login({
        username: formData.username,
        password: formData.password
      });
      
      // Show success message
      setToast({ type: 'success', message: 'Successfully logged in!' });
      
      // Redirect to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setToast({ type: 'error', message: error || 'Failed to login. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}
      <div className="max-w-md w-full space-y-8 bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm shadow-lg border border-gray-700/50">
      <div className="text-center mb-8">
            <Link to='/'>
              <h1 className="text-4xl font-bold tracking-tighter">
                <span className="bg-gradient-to-r from-purple-400 to-pink-300 text-transparent bg-clip-text">Insta</span>
                <span className="text-white">Sync</span>
              </h1>
            </Link>
           
          </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-200">
            Sign in to your account
          </h2>
        </div>
        <LoginForm onSubmit={handleLogin} loading={loading} />
        <div className="mt-6">
              <div className="text-center">
                <SocialLogin />
              </div>
            </div>
      </div>
    </div>
  );
};

export default Login;
