import type { RootState } from "@/store/store";
import { ReactNode, memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = memo(({ children }: PublicRouteProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  
  return !isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard" replace />
  );
});

PublicRoute.displayName = "PublicRoute";
export default PublicRoute;
