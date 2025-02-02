import axios from 'axios';
import store from '../redux/store';
import { login as loginAction, logout as logoutAction } from '../redux/slicers/AuthSlice';

const API_URL = 'https://c9d0-39-55-117-213.ngrok-free.app';

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
      authApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.key}`;
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
      authApi.defaults.headers.common['Authorization'] = `Bearer ${response.data.key}`;
      
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
    authApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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
      config.headers.Authorization = `Bearer ${token}`;
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


export default authApi;