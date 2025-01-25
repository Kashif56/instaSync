import axios from 'axios';
import store from '../redux/store';
import { login as loginAction, logout as logoutAction } from '../redux/slicers/AuthSlice';

const API_URL = 'http://localhost:8000';

// Create axios instance with default config
const generalApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add token to all requests
generalApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
generalApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.message ||
                        error.response?.data?.non_field_errors?.[0] ||
                        Object.values(error.response?.data || {})[0]?.[0] ||
                        error.message;
    return Promise.reject(errorMessage);
  }
);

export const getUser = async () => {
  try {
    const response = await generalApi.get('/api/auth/user/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await generalApi.get('/api/profile/getUserProfile/');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default generalApi;