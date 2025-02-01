import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import PasswordResetSuccess from '../pages/Auth/PasswordResetSuccess';
import Profile from '../pages/Auth/Profile';
import InstaLoginSuccess from '../pages/Auth/InstaLoginSuccess';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/instagram/callback" element={<InstaLoginSuccess />} />
    </Routes>
  );
};

export default AuthRoutes;