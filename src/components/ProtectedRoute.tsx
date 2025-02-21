import React from "react";
import { Navigate, Outlet, RouteProps } from "react-router";
import { useAuthStore } from "../store/authStore";

const ProtectedRoute: React.FC<RouteProps> = () => {
  const user = useAuthStore((state) => state.user);
  return user ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoute;
