import React from 'react';
import { Navigate, RouteProps } from 'react-router';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<RouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/signin' />;
  }

  return element;
};

export default ProtectedRoute;
