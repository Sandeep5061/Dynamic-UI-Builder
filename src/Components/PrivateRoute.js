import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, path }) => {
  // Replace this condition with your actual authentication logic
  const isLoggedIn = true; // For example, assume the user is always logged in

  return isLoggedIn ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" state={{ from: path }} />
  );
};

export default PrivateRoute;


