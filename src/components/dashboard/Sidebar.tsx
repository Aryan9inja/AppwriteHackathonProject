import React from 'react';
import { Clock, BarChart3, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Activity {
  action: string;
  item: string;
  time: string;
  icon: React.ElementType;
}

interface SidebarProps {
  isAnimated: boolean;
  recentActivity: Activity[];
}

const RecentActivity: React.FC<{ recentActivity: Activity[] }> = ({ recentActivity }) => (
  <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center">
      <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
      Recent Activity
    </h3>
    <div className="space-y-3 sm:space-y-4">
      {recentActivity.map((activity, index) => (
        <div 
          key={index}
          className={`flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-muted/5 rounded-lg hover:bg-muted/10 transition-all duration-200 animate-slide-in`}
          style={{ animationDelay: `${index * 100 + 400}ms` }}
        >
          <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg flex-shrink-0">
            <activity.icon className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-foreground leading-tight">{activity.action}</p>
            <p className="text-xs sm:text-sm text-muted truncate">{activity.item}</p>
            <p className="text-xs text-muted mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const QuickStats = () => (
  <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center">
      <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
      This Month
    </h3>
    <div className="space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between p-2 sm:p-3 bg-success/5 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse flex-shrink-0"></div>
          <span className="text-xs sm:text-sm font-medium text-foreground">New Views</span>
        </div>
        <span className="text-xs sm:text-sm font-bold text-success">+2.4K</span>
      </div>
      <div className="flex items-center justify-between p-2 sm:p-3 bg-primary/5 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse flex-shrink-0"></div>
          <span className="text-xs sm:text-sm font-medium text-foreground">Profile Updates</span>
        </div>
        <span className="text-xs sm:text-sm font-bold text-primary">12</span>
      </div>
      <div className="flex items-center justify-between p-2 sm:p-3 bg-secondary/5 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse flex-shrink-0"></div>
          <span className="text-xs sm:text-sm font-medium text-foreground">New Followers</span>
        </div>
        <span className="text-xs sm:text-sm font-bold text-secondary">89</span>
      </div>
    </div>
  </div>
);

const UpgradeCard = () => (
  <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5 border border-primary/20 rounded-xl p-4 sm:p-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full -translate-y-6 sm:-translate-y-8 translate-x-6 sm:translate-x-8"></div>
    <div className="relative z-10">
      <div className="flex items-center space-x-2 mb-3">
        <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        <h3 className="text-sm sm:text-base font-semibold text-foreground">Upgrade to Pro</h3>
      </div>
      <p className="text-xs sm:text-sm text-muted mb-3 sm:mb-4">Unlock advanced templates, custom domains, and analytics.</p>
      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white shadow-lg hover:shadow-xl transition-all duration-300 text-xs sm:text-sm">
        <span className="hidden xs:inline">Upgrade Now</span>
        <span className="xs:hidden">Upgrade</span>
      </Button>
    </div>
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ isAnimated, recentActivity }) => {
  return (
    <div className={`space-y-4 sm:space-y-6 transform transition-all duration-700 delay-300 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <RecentActivity recentActivity={recentActivity} />
      <QuickStats />
      <UpgradeCard />
    </div>
  );
};

export default Sidebar;