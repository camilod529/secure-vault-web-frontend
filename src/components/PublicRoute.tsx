import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store";

interface PublicRouteProps {
  element: React.ComponentType;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ element: Component }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <Navigate to="/" /> : <Component />;
};
