import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AccountCreation from '../pages/Auth/AccountCreation';
import Login from '../pages/Auth/Login';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<AccountCreation />} />
      <Route path="/login" element={<Login />} />
      {/* Add more auth routes as needed */}
    </Routes>
  );
};

export default AuthRoutes;