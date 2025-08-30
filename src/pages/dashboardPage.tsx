import React, { useEffect, useState } from 'react';
import { User, FileText, Eye, Globe } from 'lucide-react';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import StatsGrid from '@/components/dashboard/StatsGrid';
import PortfolioManagement from '@/components/dashboard/PortfolioManagement';
import Sidebar from '@/components/dashboard/Sidebar';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import TabContent from '@/components/dashboard/TabContent';
import FloatingActionButton from '@/components/dashboard/FloatingActionButton';

const DashboardPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    setIsAnimated(true);
  }, []);

  // Mock data for demonstration
  const portfolios = [
    { id: 1, name: 'Software Engineer Portfolio', views: 1247, status: 'published', lastUpdated: '2 hours ago' },
    { id: 2, name: 'UI/UX Designer Portfolio', views: 892, status: 'draft', lastUpdated: '1 day ago' },
    { id: 3, name: 'Data Scientist Portfolio', views: 2156, status: 'published', lastUpdated: '3 days ago' },
  ];

  const recentActivity = [
    { action: 'Portfolio updated', item: 'Software Engineer Portfolio', time: '2 hours ago', icon: FileText },
    { action: 'New view received', item: 'Data Scientist Portfolio', time: '4 hours ago', icon: Eye },
    { action: 'Portfolio published', item: 'UI/UX Designer Portfolio', time: '1 day ago', icon: Globe },
    { action: 'Profile updated', item: 'Personal information', time: '2 days ago', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <WelcomeBanner isAnimated={isAnimated} />
        <StatsGrid isAnimated={isAnimated} />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          <PortfolioManagement isAnimated={isAnimated} portfolios={portfolios} />
          <Sidebar isAnimated={isAnimated} recentActivity={recentActivity} />
        </div>

        <DashboardTabs isAnimated={isAnimated} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <TabContent isAnimated={isAnimated} selectedTab={selectedTab} portfolios={portfolios} />
      </div>

      <FloatingActionButton />
    </div>
  );
};

export default DashboardPage;