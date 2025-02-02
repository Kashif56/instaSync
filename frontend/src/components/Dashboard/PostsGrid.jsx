import React from 'react';
import PostCard from './PostCard';

const PostsGrid = ({ posts = [] }) => {
  if (!Array.isArray(posts)) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {posts.map((post) => (
        <PostCard key={post?.id || Math.random()} post={post} />
      ))}
    </div>
  );
};

export default PostsGrid;
