import { Routes, Route } from "react-router-dom";
import { ReactElement } from "react";
import LoginForm from "../components/forms/loginForm";
import SignupPage from "../pages/signupPage";
import { ProtectedRoute, PublicRoute, SharedRoute } from "../components/auth";
import LandingPage from "@/pages/landingPage";
import DashboardPage from "@/pages/dashboardPage";
import PortfolioViewer from "@/components/PortfolioViewer";
import { PortfolioForm } from "@/components/forms";

interface RouteConfig {
  path: string;
  element: ReactElement;
}

// Main Routes Component
const AppRoutes = () => {
  const publicRoutes: RouteConfig[] = [
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "/signup",
      element: <SignupPage />,
    },
    {
      path: "/",
      element: <LandingPage />,
    },
  ];

  const protectedRoutes: RouteConfig[] = [
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/profile",
      element: <div>Profile - Protected Content</div>,
    },
    {
      path: "/portfolio/create",
      element: <PortfolioForm />,
    },
  ];

  const sharedRoutes: RouteConfig[] = [
    {
      path: "/portfolio/:id",
      element: <PortfolioViewer />,
    },
  ];

  return (
    <Routes>
      {/* Public Routes - accessible without authentication */}
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PublicRoute>{route.element}</PublicRoute>}
        />
      ))}

      {/* Protected Routes - require authentication */}
      {protectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<ProtectedRoute>{route.element}</ProtectedRoute>}
        />
      ))}

      {/* Shared Routes - accessible with or without authentication */}
      {sharedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<SharedRoute>{route.element}</SharedRoute>}
        />
      ))}
    </Routes>
  );
};

export default AppRoutes;
