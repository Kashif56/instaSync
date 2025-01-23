import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import PasswordResetSuccess from '../pages/Auth/PasswordResetSuccess';
import Profile from '../pages/Auth/Profile';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/password-reset-success" element={<PasswordResetSuccess />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AuthRoutes;