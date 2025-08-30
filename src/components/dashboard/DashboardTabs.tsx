import React from 'react';
import { BarChart3, FileText, TrendingUp, Settings } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface DashboardTabsProps {
  isAnimated: boolean;
  selectedTab: string;
  setSelectedTab: (tabId: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ isAnimated, selectedTab, setSelectedTab }) => {
  const tabs: Tab[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'portfolios', label: 'Portfolios', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={`mb-6 sm:mb-8 transform transition-all duration-700 delay-400 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <div className="flex space-x-1 bg-muted/10 p-1 rounded-lg overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
              selectedTab === tab.id
                ? 'bg-primary text-white shadow-lg'
                : 'text-muted hover:text-foreground hover:bg-muted/20'
            }`}
          >
            <tab.icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="hidden xs:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardTabs;