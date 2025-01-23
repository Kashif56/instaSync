import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllPosts from '../pages/Posts/AllPosts';
import PostDetail from '../pages/Posts/PostDetail';
import AddPost from '../pages/Posts/AddPost';
import EditPost from '../pages/Posts/EditPost';

const PostRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AllPosts />} />
      <Route path="/add" element={<AddPost />} />
      <Route path="/:id" element={<PostDetail />} />
      <Route path="/:id/edit" element={<EditPost />} />
      {/* Add more post-related routes as needed */}
      {/* Example:
      <Route path="/analytics" element={<PostAnalytics />} />
      */}
    </Routes>
  );
};

export default PostRoutes;