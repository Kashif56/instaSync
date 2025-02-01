import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slicers/AuthSlice';
import { toast } from 'react-toastify';
import authApi from '../../api/authApiService';

const InstaLoginSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const code = searchParams.get('code');

  useEffect(() => {
    const processInstagramCallback = async () => {
      if (isProcessing) return; // Prevent duplicate processing
      
      try {
        if (!code) {
          console.log('No code found in URL parameters');
          toast.error('No authorization code received from Instagram');
          navigate('/auth/login');
          return;
        }

        setIsProcessing(true);
        console.log('Processing Instagram callback with code:', code);
        
        const response = await authApi.get('/api/auth/instagram/callback/', {
          params: { code }
        });
        
        console.log('Instagram callback response:', response.data);

        if (response.data.status === 'success') {
          const { username, email, jwt_token, refresh_token } = response.data;
          console.log('Login successful. Username:', username);
          
          // Dispatch login action with user data
          dispatch(login({
            user: {
              username: username,
              email: email || `${username}@instagram.com`,
            },
            token: jwt_token,
            refreshToken: refresh_token,
          }));

          // Clear code from URL
          window.history.replaceState({}, document.title, window.location.pathname);

          toast.success('Successfully logged in with Instagram!');
          navigate('/');
        } else {
          throw new Error(response.data.error || 'Authentication failed');
        }
      } catch (error) {
        console.log('Error processing Instagram callback:', error);
        const errorMessage = error.response?.data?.error || error.message || 'Error during Instagram authentication';
        
        // Clear code from URL on error
        window.history.replaceState({}, document.title, window.location.pathname);
        
        toast.error(errorMessage);
        navigate('/auth/login');
      } finally {
        setIsProcessing(false);
      }
    };

    if (code && !isProcessing) {
      processInstagramCallback();
    }
  }, [code, dispatch, navigate, isProcessing]);

  if (!code) {
    navigate('/auth/login');
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Processing Instagram Login...
        </h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default InstaLoginSuccess;