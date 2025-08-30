import React from 'react';
import { BarChart3, Star, Plus, Eye, Settings, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Portfolio {
  id: number;
  name: string;
  views: number;
  status: string;
  lastUpdated: string;
}

interface TabContentProps {
  isAnimated: boolean;
  selectedTab: string;
  portfolios: Portfolio[];
}

const OverviewTab: React.FC<{ portfolios: Portfolio[] }> = ({ portfolios }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center">
        <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
        Performance Overview
      </h3>
      <div className="h-48 sm:h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 text-muted mx-auto mb-2" />
          <p className="text-xs sm:text-base text-muted">Chart visualization would go here</p>
        </div>
      </div>
    </div>

    <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center">
        <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
        Top Performing
      </h3>
      <div className="space-y-3">
        {portfolios.slice(0, 3).map((portfolio, index) => (
          <div key={portfolio.id} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-muted/5 rounded-lg hover:bg-muted/10 transition-colors">
            <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm ${
              index === 0 ? 'bg-gradient-to-r from-warning to-warning-hover' :
              index === 1 ? 'bg-gradient-to-r from-muted to-muted-hover' :
              'bg-gradient-to-r from-warning/70 to-warning-hover/70'
            }`}>
              #{index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground text-xs sm:text-sm truncate">{portfolio.name}</p>
              <p className="text-xs text-muted">{portfolio.views.toLocaleString()} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PortfoliosTab: React.FC<{ portfolios: Portfolio[] }> = ({ portfolios }) => (
  <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
      <h3 className="text-base sm:text-lg font-semibold text-foreground">All Portfolios</h3>
      <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white w-full sm:w-auto">
        <Plus className="w-4 h-4 mr-2" />
        <span className="hidden xs:inline">New Portfolio</span>
        <span className="xs:hidden">New</span>
      </Button>
    </div>
    <div className="space-y-3 sm:space-y-4">
      {portfolios.map((portfolio) => (
        <div key={portfolio.id} className="border border-border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground text-sm sm:text-base truncate">{portfolio.name}</h4>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mt-2 text-xs sm:text-sm text-muted">
                <span>{portfolio.views.toLocaleString()} views</span>
                <span>Updated {portfolio.lastUpdated}</span>
                <span className={portfolio.status === 'published' ? 'text-success' : 'text-warning'}>
                  {portfolio.status}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 self-end sm:self-auto">
              <Button variant="ghost" size="sm" className="p-1 sm:p-2"><Eye className="w-4 h-4" /></Button>
              <Button variant="ghost" size="sm" className="p-1 sm:p-2"><Settings className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AnalyticsTab = () => (
  <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6 flex items-center">
      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
      Analytics Dashboard
    </h3>
    <div className="h-64 sm:h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg flex items-center justify-center">
      <div className="text-center px-4">
        <TrendingUp className="w-12 h-12 sm:w-16 sm:h-16 text-muted mx-auto mb-3 sm:mb-4" />
        <p className="text-muted text-base sm:text-lg font-medium">Detailed analytics coming soon</p>
        <p className="text-muted text-xs sm:text-sm mt-1">Track views, engagement, and performance</p>
      </div>
    </div>
  </div>
);

const SettingsTab = () => (
  <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6 flex items-center">
      <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
      Account Settings
    </h3>
    <div className="space-y-4 sm:space-y-6">
      <div className="p-3 sm:p-4 border border-border rounded-lg">
        <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Profile Information</h4>
        <p className="text-xs sm:text-sm text-muted mb-3">Update your personal information and preferences</p>
        <Button variant="ghost" className="text-primary hover:text-primary-hover w-full sm:w-auto">Edit Profile</Button>
      </div>
      <div className="p-3 sm:p-4 border border-border rounded-lg">
        <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Notification Preferences</h4>
        <p className="text-xs sm:text-sm text-muted mb-3">Manage how you receive notifications</p>
        <Button variant="ghost" className="text-primary hover:text-primary-hover w-full sm:w-auto">Configure</Button>
      </div>
      <div className="p-3 sm:p-4 border border-border rounded-lg">
        <h4 className="font-medium text-foreground mb-2 text-sm sm:text-base">Privacy & Security</h4>
        <p className="text-xs sm:text-sm text-muted mb-3">Control your privacy and security settings</p>
        <Button variant="ghost" className="text-primary hover:text-primary-hover w-full sm:w-auto">Manage</Button>
      </div>
    </div>
  </div>
);

const TabContent: React.FC<TabContentProps> = ({ isAnimated, selectedTab, portfolios }) => {
  return (
    <div className={`transform transition-all duration-700 delay-500 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      {selectedTab === 'overview' && <OverviewTab portfolios={portfolios} />}
      {selectedTab === 'portfolios' && <PortfoliosTab portfolios={portfolios} />}
      {selectedTab === 'analytics' && <AnalyticsTab />}
      {selectedTab === 'settings' && <SettingsTab />}
    </div>
  );
};

export default TabContent;