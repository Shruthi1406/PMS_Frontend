// src/apiHandler/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoleBasedRoute  = ({ allowedRoles, currentRole }) => {
  const token = localStorage.getItem('authToken');
  if (!token || !allowedRoles.includes(currentRole)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default RoleBasedRoute ;
