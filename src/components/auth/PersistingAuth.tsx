// filepath: d:\AppwriteHackathonProject\src\components\auth\PersistingAuth.tsx
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { setUser } from "@/store/slices/authSlice";

interface PersistingAuthProps {
  children: ReactNode;
}

const PersistingAuth = ({ children }: PersistingAuthProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUserData = localStorage.getItem("userData");
        if (storedUserData && !isAuthenticated) {
          const userData = JSON.parse(storedUserData);
          if (userData && userData.user && userData.user.userId) {
            dispatch(setUser(userData.user));
          }
        }
      } catch (error) {
        localStorage.removeItem("userData");
        console.error("Invalid user data in localStorage:", error);
      }
      setIsChecking(false);
    };
    checkAuth();
  }, [dispatch, isAuthenticated]);

  if (isChecking) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  return <>{children}</>;
};

export default PersistingAuth;
