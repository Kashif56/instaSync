import React from 'react';
import { AiOutlineCamera } from 'react-icons/ai';

const ProfileHeader = ({ user, onImageChange }) => {
  return (
    <div className="text-center mb-8">
      <div className="relative inline-block">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-500/30 bg-gray-900/50 backdrop-blur-xl">
          {user?.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
        </div>
        <label
          htmlFor="profile-image"
          className="absolute bottom-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600 transition-colors"
        >
          <AiOutlineCamera className="text-white w-5 h-5" />
          <input
            type="file"
            id="profile-image"
            className="hidden"
            accept="image/*"
            onChange={onImageChange}
          />
        </label>
      </div>
      <h2 className="mt-4 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
        {user?.name || 'User Name'}
      </h2>
      <p className="text-gray-400 mt-1">{user?.email || 'user@example.com'}</p>
    </div>
  );
};

export default ProfileHeader;
