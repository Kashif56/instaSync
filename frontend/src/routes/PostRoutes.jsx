import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllPosts from '../pages/Posts/AllPosts';

const PostRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AllPosts />} />
      {/* Add more post-related routes as needed */}
      {/* Example:
      <Route path="/create" element={<CreatePost />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/analytics" element={<PostAnalytics />} />
      */}
    </Routes>
  );
};

export default PostRoutes;