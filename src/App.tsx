import { Toaster } from "sonner";
import AppRoutes from "@/routes/routes";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { FullScreenLoader } from "@/components/ui/loader";
import PersistingAuth from "@/components/auth/PersistingAuth";
import ThemeProvider from "@/components/ThemeProvider";

function App() {
  const loadingType = useSelector((state: RootState) => state.auth.loadingType);

  if (loadingType === "user") {
    return (
      <ThemeProvider>
        <FullScreenLoader 
          message="Verifying your authentication"
          type="gradient"
          variant="default"
        />
      </ThemeProvider>
    );
  }
  
  return (
    <ThemeProvider>
      <PersistingAuth>
        <Toaster position="top-right" richColors />
        <AppRoutes />
      </PersistingAuth>
    </ThemeProvider>
  );
}

export default App;
