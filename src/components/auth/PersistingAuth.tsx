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
          
          // ✅ Check for the correct structure: { user, userDoc }
          if (userData && userData.user && userData.user.userId) {
            // ✅ Dispatch the entire user data with proper structure
            dispatch(setUser(userData.user));
          } else {
            // ✅ If data structure is invalid, remove it
            localStorage.removeItem("userData");
          }
        } else if (!storedUserData && isAuthenticated) {
          // ✅ Edge case: Redux thinks user is authenticated but no localStorage
          dispatch(setUser(null));
        }
      } catch (error) {
        localStorage.removeItem("userData");
        // ✅ Clear Redux state too if localStorage data was corrupted
        dispatch(setUser(null));
      } finally {
        setIsChecking(false); // ✅ Always set checking to false
      }
    };
    checkAuth();
  }, [dispatch, isAuthenticated]);

  if (isChecking) {
    return <div className="h-screen flex justify-center items-center">Loading...</div>;
  }

  return <>{children}</>;
};

export default PersistingAuth;
