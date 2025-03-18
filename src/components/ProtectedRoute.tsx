import React, { useEffect } from "react";
import { Navigate, Outlet, RouteProps } from "react-router";
import useAuthStore from "../store/authStore";

const ProtectedRoute: React.FC<RouteProps> = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
