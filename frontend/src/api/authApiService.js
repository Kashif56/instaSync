import axios from 'axios';
import store from '../redux/store';
import { login as loginAction, logout as logoutAction } from '../redux/slicers/AuthSlice';

const API_URL = 'http://localhost:8000';

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor for handling errors
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.non_field_errors?.[0] ||
                        Object.values(error.response?.data || {})[0]?.[0] ||
                        error.message;
    return Promise.reject(errorMessage);
  }
);

export const signUp = async (userData) => {
  try {
    const response = await authApi.post('/api/auth/registration/', {
      username: userData.username,
      email: userData.email,
      password1: userData.password,
      password2: userData.confirmPassword,
    });

    // If signup is successful, automatically log the user in
    if (response.data.key) {
      authApi.defaults.headers.common['Authorization'] = `Token ${response.data.key}`;
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    // dj-rest-auth expects email/username and password
    const response = await authApi.post('/api/auth/login/', {
      username: credentials.username,
      password: credentials.password,
    });

   
    
    if (response.data.key) {
      // Update auth headers
      authApi.defaults.headers.common['Authorization'] = `Token ${response.data.key}`;
      
      // Get user data after successful login
      const userResponse = await authApi.get('/api/auth/user/');
      
      // Dispatch login action with user data and token
      store.dispatch(loginAction({
        user: userResponse.data,
        token: response.data.key
      }));
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await authApi.post('/api/auth/logout/');
    // Dispatch logout action
    store.dispatch(logoutAction());
    // Clean up auth headers
    delete authApi.defaults.headers.common['Authorization'];
  } catch (error) {
    // Still dispatch logout even if the server request fails
    store.dispatch(logoutAction());
    throw error;
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    authApi.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    localStorage.removeItem('token');
    delete authApi.defaults.headers.common['Authorization'];
  }
};

// Add request interceptor to add token to requests
authApi.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const initiateInstagramLogin = async () => {
  try {
    const response = await authApi.get('api/auth/instagram/login/');
    // Redirect to Instagram authorization page
    window.location.href = response.data.auth_url;
  } catch (error) {
    throw error;
  }
};

export const handleInstagramCallback = async (code) => {
  try {
    const response = await authApi.get(`/auth/instagram/callback/?code=${code}`);
    if (response.data.access_token) {
      store.dispatch(loginAction({
        user: {
          username: response.data.username,
          id: response.data.user_id
        },
        token: response.data.access_token
      }));
      setAuthToken(response.data.access_token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default authApi;