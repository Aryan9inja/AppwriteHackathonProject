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
    <div className="min-h-screen bg-background relative">
      {/* Enhanced background gradient for depth */}
      <div className="fixed inset-0 bg-gradient-to-br from-background via-background to-background/95 -z-10" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-primary)_0%,_transparent_50%)] opacity-5 -z-10" />
      
      <DashboardHeader />

      {/* Enhanced Mobile Tab Navigation */}
      <div className="sticky top-16 z-30 bg-background/98 backdrop-blur-lg border-b border-border/60 shadow-sm md:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="flex space-x-1 bg-muted/20 dark:bg-muted/10 rounded-xl p-1.5 shadow-inner">
              {[
                { id: "overview", label: "Overview" },
                { id: "portfolios", label: "Portfolios" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 relative ${
                    activeTab === tab.id
                      ? "bg-background text-foreground shadow-lg border border-border/50 dark:bg-card dark:border-border/80"
                      : "text-muted hover:text-foreground hover:bg-background/50 dark:hover:bg-card/50"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Desktop Layout */}
      <div className="hidden md:block relative">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <WelcomeBanner isAnimated={isAnimated} />

          {/* Enhanced Main Layout: Portfolios on left, Creation on right */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
            {/* Portfolio List - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="relative">
                {/* Subtle glow effect for portfolio list */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur opacity-30 dark:opacity-20" />
                <div className="relative">
                  <PortfolioList portfolios={portfolios} isAnimated={isAnimated} loading={portfolioLoading} onPortfolioDeleted={handlePortfolioDeleted}/>
                </div>
              </div>
            </div>

            {/* Portfolio Creation - Takes 1 column on large screens */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="relative">
                  {/* Subtle glow effect for creation panel */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-xl blur opacity-30 dark:opacity-20" />
                  <div className="relative">
                    <PortfolioCreation />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Layout */}
      <div className="block md:hidden relative">
        <div className="container mx-auto px-4 py-4 pb-20">
          <div className="relative">
            {/* Mobile content wrapper with subtle background */}
            <div className="bg-gradient-to-b from-transparent via-background/50 to-transparent rounded-t-2xl">
              {renderMobileContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
