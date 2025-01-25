import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleInstagramCallback } from '../api/authApiService';
import { toast } from 'react-toastify';

const InstagramCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the authorization code from URL parameters
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');

        if (!code) {
          toast.error('No authorization code received from Instagram');
          navigate('/');
          return;
        }

        // Handle the Instagram callback
        const response = await handleInstagramCallback(code);
        toast.success('Successfully logged in with Instagram!');
        navigate('/');
      } catch (error) {
        console.error('Instagram callback error:', error);
        toast.error('Failed to complete Instagram login. Please try again.');
        navigate('/');
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
        <h2 className="mt-4 text-xl text-gray-200">Completing Instagram Login...</h2>
      </div>
    </div>
  );
};

export default InstagramCallback;
