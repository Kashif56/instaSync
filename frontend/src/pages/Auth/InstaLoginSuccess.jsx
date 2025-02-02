import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slicers/AuthSlice';
import { toast } from 'react-toastify';
import authApi from '../../api/authApiService';

const InstaLoginSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const code = searchParams.get('code');
  

  useEffect(() => {
    
    
    let isMounted = true;

    const processInstagramCallback = async () => {
      if (!code || isProcessing) return;
      
      try {
        setIsProcessing(true);
        console.log('Processing Instagram callback with code:', code);
        
        const response = await authApi.get('/auth/instagram/callback/', {
          params: { code }
        });

        console.log('Instagram callback response:', response.data);

        if (!isMounted) return;
        
        if (response.data.status === 'success') {
          const { username, email, jwt_token, refresh_token } = response.data;
          console.log('Login successful:', { username, email, hasToken: !!jwt_token });
          
          // Save token to localStorage first
          localStorage.setItem('token', jwt_token);
          localStorage.setItem('refreshToken', refresh_token);
          
          // Then dispatch login action
          dispatch(login({
            user: {
              username,
              email: email || `${username}@instagram.com`,
            },
            token: jwt_token,
            refreshToken: refresh_token,
          }));

          // Verify token was saved
          const savedToken = localStorage.getItem('token');
          console.log('Token saved in localStorage:', savedToken ? 'Yes' : 'No');
          
          // Clear code from URL
          window.history.replaceState({}, document.title, window.location.pathname);
          toast.success('Successfully logged in with Instagram!');
          navigate('/');
        } else {
          throw new Error(response.data.error || 'Authentication failed');
        }
      } catch (error) {
        if (!isMounted) return;
        
        console.error('Error processing Instagram callback:', error);
        const errorMessage = error.response?.data?.error || error.message || 'Error during Instagram authentication';
        
        window.history.replaceState({}, document.title, window.location.pathname);
        toast.error(errorMessage);
        navigate('/auth/login');
      } finally {
        console.log(response.data);
        if (isMounted) {
          setIsProcessing(false);
        }
      }
    };

    processInstagramCallback();

    return () => {
      isMounted = false;
    };
  }, [code]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          {isProcessing ? 'Processing Instagram Login...' : 'Redirecting...'}
          Hello
        </h2>
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Page Check</h1>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default InstaLoginSuccess;