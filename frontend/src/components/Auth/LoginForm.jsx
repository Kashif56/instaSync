import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-200">
          Email address
        </label>
        <div className="mt-1">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-200">
          Password
        </label>
        <div className="mt-1">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-800/50 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            placeholder="Enter your password"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="rememberMe"
            name="rememberMe"
            type="checkbox"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-700 bg-gray-800/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-900"
          />
          <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-200">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link
            to="/auth/forgot-password"
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300"
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 transform hover:scale-105"
        >
          Sign in
        </button>
      </div>

      <div className="text-sm text-center">
        <span className="text-gray-400">Don't have an account?</span>{' '}
        <Link
          to="/auth/signup"
          className="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
