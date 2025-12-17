import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, loading }: any = useAuth();
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
