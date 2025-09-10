import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Bell, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { logoutUserThunk } from '@/store/thunks/authThunk';
import type { AppDispatch } from '@/store/store';
import { toast } from 'sonner';

const DashboardHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUserThunk()).unwrap();
      toast.success("Logged out successfully");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Failed to logout properly");
      // Force navigation anyway to ensure user is logged out from UI
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="border-b border-border/60 bg-card/80 backdrop-blur-lg sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                <Zap className="w-3 h-3 sm:w-5 sm:h-5 text-white drop-shadow-sm" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-foreground hidden xs:block">PortfolioCraft</h1>
              <h1 className="text-lg font-bold text-foreground xs:hidden">PC</h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle 
              variant="icon" 
              size="sm" 
              className="text-muted hover:text-foreground transition-colors duration-200"
            />

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                size="sm"
                className="text-muted hover:text-foreground hidden sm:flex hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                size="sm"
                className="text-muted hover:text-foreground sm:hidden p-2 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;