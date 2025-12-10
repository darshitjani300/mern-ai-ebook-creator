import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = false;
  const loading = false;
  const location = useLocation();

  if (loading) {
    // Later we will add spinner
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
