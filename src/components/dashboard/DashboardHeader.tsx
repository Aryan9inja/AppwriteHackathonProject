import React from 'react';
import { useDispatch } from 'react-redux';
import { User, LogOut, Bell, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { logoutUserThunk } from '@/store/thunks/authThunk';
import type { AppDispatch } from '@/store/store';

const DashboardHeader: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUserThunk());
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <Zap className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-foreground hidden xs:block">PortfolioCraft</h1>
              <h1 className="text-lg font-bold text-foreground xs:hidden">PC</h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">

            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                size="sm"
                className="text-muted hover:text-foreground hidden sm:flex"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
              <Button 
                onClick={handleLogout}
                variant="ghost" 
                size="sm"
                className="text-muted hover:text-foreground sm:hidden p-2"
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