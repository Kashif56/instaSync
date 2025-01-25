import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineHeart, AiOutlineInstagram } from 'react-icons/ai';
import { BiMessageRounded } from 'react-icons/bi';
import { BsCalendarEvent, BsClock } from 'react-icons/bs';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Don't navigate if clicking on action buttons
    if (e.target.closest('.action-buttons')) {
      return;
    }
    navigate(`/posts/${post.postId}`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-gray-900/60 backdrop-blur-xl rounded-xl border border-gray-800 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/50 hover:-translate-y-1 cursor-pointer"
    >
      {/* Instagram Icon Badge */}
      <div className="absolute top-3 left-3 z-10">
        <div className="bg-black/50 backdrop-blur-md p-2 rounded-lg">
          <AiOutlineInstagram className="w-5 h-5 text-purple-400" />
        </div>
      </div>

      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          post.scheduledDateTime 
            ? 'bg-purple-500 text-white border border-purple-500/30' 
            : 'bg-green-500 text-white border border-green-500/30'
        }`}>
          {post.scheduledDateTime ? 'Scheduled' : 'Posted'}
        </div>
      </div>

      {/* Image Container */}
      <div className="relative aspect-square">
        <img
          loading="lazy"
          src={post.media.length > 0 ? `http://localhost:8000${post.media[0].mediaFile}` : 'https://via.placeholder.com/300x300'}
          alt={post.caption}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white text-sm line-clamp-2 font-medium">{post.caption}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Schedule Info */}
        <div className="flex items-center space-x-2 mb-3">
          {post.scheduledDateTime ? (
            <>
              <BsCalendarEvent className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400 text-sm">
                Scheduled for {formatDate(post.scheduledDateTime)}
              </span>
            </>
          ) : (
            <>
              <BsClock className="w-4 h-4 text-purple-400" />
              <span className="text-gray-400 text-sm">Posted {formatDate(post.postedAt)}</span>
            </>
          )}
        </div>

        {/* Engagement Stats */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="bg-red-500/10 p-1.5 rounded-lg">
                <AiOutlineHeart className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-gray-400 text-sm font-medium">{post.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="bg-purple-500/10 p-1.5 rounded-lg">
                <BiMessageRounded className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-gray-400 text-sm font-medium">{post.comments}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 action-buttons opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button className="bg-gray-800/50 hover:bg-purple-500/20 p-2 rounded-lg transition-colors duration-200"
            onClick={() => navigate(`/posts/${post.postId}/edit`)}
            >
              <AiOutlineEdit className="w-4 h-4 text-purple-400" />
            </button>
            <button className="bg-gray-800/50 hover:bg-red-500/20 p-2 rounded-lg transition-colors duration-200"
            onClick={() => handleDelete(post.postId)}
            >
              <AiOutlineDelete className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
