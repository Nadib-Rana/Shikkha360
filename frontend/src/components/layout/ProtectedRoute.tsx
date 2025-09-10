import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

interface Props { role: string; }

const ProtectedRoute: React.FC<Props> = ({ role }) => {
  const auth = useSelector((state: RootState) => state.auth);
  if (!auth.isAuthenticated || auth.user?.role !== role) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
