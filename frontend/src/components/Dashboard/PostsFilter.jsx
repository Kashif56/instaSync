import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AiOutlineSearch, AiOutlinePlus } from 'react-icons/ai';

const PostsFilter = ({ onFilterChange, searchTerm, statusFilter, sortBy }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    onFilterChange('search', e.target.value);
  };

  const handleStatusChange = (e) => {
    onFilterChange('status', e.target.value);
  };

  const handleSortChange = (e) => {
    onFilterChange('sort', e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-200 placeholder-gray-400 w-64"
          />
          <AiOutlineSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <select 
          value={statusFilter}
          onChange={handleStatusChange}
          className="bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="all">All Posts</option>
          <option value="scheduled">Scheduled</option>
          <option value="published">Published</option>
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <select 
          value={sortBy}
          onChange={handleSortChange}
          className="bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="engagement">Highest Engagement</option>
        </select>
        <button 
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2"
          onClick={() => navigate('/posts/add')}
        >
          <AiOutlinePlus className="w-5 h-5" />
          <span>New Post</span>
        </button>
      </div>
    </div>
  );
};

export default PostsFilter;
