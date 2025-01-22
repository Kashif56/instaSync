import React from 'react';
import PostsFilter from '../../components/Dashboard/PostsFilter';
import PostsGrid from '../../components/Dashboard/PostsGrid';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AllPosts = () => {
  // Sample data - replace with actual data from your backend
  const posts = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
      caption: 'Beautiful sunset at the beach #nature #sunset #peace',
      date: '2h ago',
      likes: 234,
      comments: 18,
      scheduledFor: null
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538',
      caption: 'Morning coffee and work setup #productivity #workspace',
      date: 'Tomorrow at 9:00 AM',
      likes: 0,
      comments: 0,
      scheduledFor: '2024-01-24T09:00:00'
    },
    // Add more sample posts as needed
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900">
      <Navbar />
      
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#9333ea)] opacity-30">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="posts-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M0 0h30v30H0z" fill="none"/>
                <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.1)"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#posts-pattern)"/>
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-20 flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
              Your Posts
            </h1>
            <p className="mt-2 text-gray-400">
              Manage and monitor all your Instagram posts in one place
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-xl px-4 py-2 rounded-lg border border-gray-800">
              <span className="text-purple-400 font-medium">Total Posts:</span>
              <span className="text-white font-bold">{posts.length}</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <PostsFilter />

        {/* Posts Grid */}
        <div className="mt-8">
          <PostsGrid posts={posts} />
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-14c0 4.418-7.163 8-16 8S8 18.418 8 14"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-200">No posts yet</h3>
            <p className="mt-1 text-sm text-gray-400">Get started by creating a new post.</p>
            <div className="mt-6">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2 mx-auto">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>New Post</span>
              </button>
            </div>
          </div>
        )}
      </div>


      {/* Decorative blobs */}
      <div className="fixed top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96">
        <div className="absolute w-full h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      </div>
      <div className="fixed top-0 right-0 translate-x-1/4 -translate-y-1/4 w-96 h-96">
        <div className="absolute w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default AllPosts;