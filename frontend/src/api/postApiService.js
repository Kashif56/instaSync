import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'https://c9d0-39-55-117-213.ngrok-free.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('isAuthenticated');
      window.location.href = '/auth/login';
    }
    return Promise.reject(error.response?.data?.message || 'An error occurred');
  }
);

// Create a new post
export const createPost = async (postData) => {
  try {
    const response = await api.post('/posts/create/', postData, {
      headers: {
        'Content-Type': 'multipart/form-data',  // Important for file uploads
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all posts for the current user
export const getUserPosts = async (page = 1, limit = 10) => {
  try {
    const response = await api.get('/posts/');
    console.log('Posts API Response:', response);
    
    // Ensure we return an array even if the response is empty or malformed
    if (!response.data) {
      console.warn('No data in response from posts API');
      return { data: [] };
    }
    
    // If response.data is already an array, return it wrapped in an object
    if (Array.isArray(response.data)) {
      return { data: response.data };
    }
    
    // If response.data has a results field (common in Django REST Framework)
    if (response.data.results && Array.isArray(response.data.results)) {
      return { data: response.data.results };
    }
    
    // If we get here, the response format is unexpected
    console.warn('Unexpected response format from posts API:', response.data);
    return { data: [] };
  } catch (error) {
    console.error('Error fetching posts:', error);
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

// Get a single post by ID
export const getPostById = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/post-detail/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update an existing post
export const updatePost = async (postId, postData) => {
  try {
    const formData = new FormData();
    
    // Add basic fields
    if (postData.caption) formData.append('caption', postData.caption);
    if (postData.tags) formData.append('tags', postData.tags);
    if (postData.location) formData.append('location', postData.location);
    if (postData.scheduledDate) formData.append('scheduledDate', postData.scheduledDate);
    if (postData.scheduledTime) formData.append('scheduledTime', postData.scheduledTime);
    
    // Add images if present
    if (postData.images) {
      postData.images.forEach(image => {
        if (image instanceof File) {
          formData.append('images', image);
        }
      });
      // If new images are being added, set replace_media flag
      if (postData.images.length > 0) {
        formData.append('replace_media', 'true');
      }
    }

    const response = await api.put(`/posts/${postId}/update/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}/delete/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Upload media for a post
export const uploadMedia = async (file) => {
  try {
    const formData = new FormData();
    formData.append('media', file);

    const response = await api.post('/posts/upload-media/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get post analytics
export const getPostAnalytics = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/analytics/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Schedule a post
export const schedulePost = async (postId, scheduledTime) => {
  try {
    const response = await api.post(`/posts/${postId}/schedule/`, {
      scheduledTime,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Cancel scheduled post
export const cancelScheduledPost = async (postId) => {
  try {
    const response = await api.post(`/posts/${postId}/cancel-schedule/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete media from a post
export const deleteMedia = async (postId, mediaId) => {
  try {
    const response = await api.delete(`/posts/${postId}/delete-media/${mediaId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  createPost,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
  uploadMedia,
  getPostAnalytics,
  schedulePost,
  cancelScheduledPost,
  deleteMedia,
};