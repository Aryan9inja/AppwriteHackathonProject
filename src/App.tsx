import { Toaster } from "sonner";
import AppRoutes from "@/routes/routes";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { useEffect } from "react";
import { getUserDataThunk } from "@/store/thunks/authThunk";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const loadingType = useSelector((state: RootState) => state.auth.loadingType);
  useEffect(() => {
    dispatch(getUserDataThunk());
  }, [dispatch]);

  if (loadingType==="user") return <div>Loading...</div>;
  return (
    <>
      <Toaster position="top-right" richColors />
      <AppRoutes />
    </>
  );
}

export default App;
