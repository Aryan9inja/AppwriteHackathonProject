import { Toaster } from "sonner";
import AppRoutes from "@/routes/routes";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { getUserDataThunk } from "@/store/thunks/authThunk";
import { FullScreenLoader } from "@/components/ui/loader";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const loadingType = useSelector((state: RootState) => state.auth.loadingType);
  useEffect(() => {
    dispatch(getUserDataThunk());
  }, [dispatch]);

  if (loadingType==="user") {
    return (
      <FullScreenLoader 
        message="Verifying your authentication"
        type="gradient"
        variant="default"
      />
    );
  }
  
  return (
    <>
      <Toaster position="top-right" richColors />
      <AppRoutes />
    </>
  );
}

export default App;
