import React, { useEffect, useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import PortfolioList from "@/components/dashboard/PortfolioList";
import PortfolioCreation from "@/components/dashboard/PortfolioCreation";
import { getUserPortfolios } from "@/services/portfolio.services";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { toast } from "sonner";

const DashboardPage: React.FC = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "portfolios">(
    "overview"
  );
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    setIsAnimated(true);
    setPortfolioLoading(true);

    const getPortfolios = async () => {
      try {
        const fetchedPortfolios = await getUserPortfolios(user?.userId!);
        setPortfolios(fetchedPortfolios.rows.reverse());
      } catch (error) {
        toast.error("Failed to fetch portfolios, try to refresh");
      } finally {
        setPortfolioLoading(false);
      }
    };

    if (user?.userId) {
      getPortfolios();
    }
  }, [user?.userId]);

  const handlePortfolioDeleted = (portfolioId: string) => {
    setPortfolios(prevPortfolios => 
      prevPortfolios.filter(portfolio => portfolio.$id !== portfolioId)
    );
  };

  const renderMobileContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-4 sm:space-y-6">
            <WelcomeBanner isAnimated={isAnimated} />
            <PortfolioCreation />
          </div>
        );
      case "portfolios":
        return (
          <PortfolioList portfolios={portfolios} isAnimated={isAnimated} loading={portfolioLoading} onPortfolioDeleted={handlePortfolioDeleted}/>
        );
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
                { id: "overview", label: "Overview" },
                { id: "portfolios", label: "Portfolios" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted hover:text-foreground"
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
              <PortfolioList portfolios={portfolios} isAnimated={isAnimated} loading={portfolioLoading} onPortfolioDeleted={handlePortfolioDeleted}/>
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
