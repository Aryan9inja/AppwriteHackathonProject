import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeBannerProps {
  isAnimated: boolean;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ isAnimated }) => {
  return (
    <div className={`mb-6 sm:mb-8 transform transition-all duration-700 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Welcome back! 👋</h2>
            <p className="text-sm sm:text-base text-muted">Ready to create amazing portfolios? Let's build something great today.</p>
          </div>
          <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden xs:inline">Create New Portfolio</span>
            <span className="xs:hidden">Create Portfolio</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;