import { Toaster } from "sonner";
import AppRoutes from "@/routes/routes";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { FullScreenLoader } from "@/components/ui/loader";
import PersistingAuth from "@/components/auth/PersistingAuth";

function App() {
  const loadingType = useSelector((state: RootState) => state.auth.loadingType);

  if (loadingType === "user") {
    return (
      <FullScreenLoader 
        message="Verifying your authentication"
        type="gradient"
        variant="default"
      />
    );
  }
  
  return (
    <PersistingAuth>
      <Toaster position="top-right" richColors />
      <AppRoutes />
    </PersistingAuth>
  );
}

export default App;
