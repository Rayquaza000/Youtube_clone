import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ signedIn, children }) => {
  const token = localStorage.getItem("accesstoken");

  if (!signedIn || !token) {
    // Redirect to sign-in page if user not logged in
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
