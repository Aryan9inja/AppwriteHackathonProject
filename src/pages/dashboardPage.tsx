import React, { useEffect, useState } from 'react';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import WelcomeBanner from '@/components/dashboard/WelcomeBanner';
import PortfolioList from '@/components/dashboard/PortfolioList';
import PortfolioCreation from '@/components/dashboard/PortfolioCreation';

const DashboardPage: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolios'>('overview');

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

  const renderMobileContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4 sm:space-y-6">
            <WelcomeBanner isAnimated={isAnimated} />
            <PortfolioCreation />
          </div>
        );
      case 'portfolios':
        return <PortfolioList portfolios={portfolios} isAnimated={isAnimated} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      {/* Mobile Tab Navigation */}
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-sm border-b border-border md:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2">
            <div className="flex space-x-1 bg-muted/30 rounded-lg p-1">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'portfolios', label: 'Portfolios' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <WelcomeBanner isAnimated={isAnimated} />

          {/* Main Layout: Portfolios on left, Creation on right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
            {/* Portfolio List - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <PortfolioList portfolios={portfolios} isAnimated={isAnimated} />
            </div>
            
            {/* Portfolio Creation - Takes 1 column on large screens */}
            <div className="lg:col-span-1">
              <PortfolioCreation />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden">
        <div className="container mx-auto px-4 py-4 pb-20">
          {renderMobileContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;