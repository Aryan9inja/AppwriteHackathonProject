import React from 'react';
import { FileText, Eye, Settings, Download, Clock, Zap, Globe, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Portfolio {
  id: number;
  name: string;
  views: number;
  status: string;
  lastUpdated: string;
}

interface PortfolioManagementProps {
  isAnimated: boolean;
  portfolios: Portfolio[];
}

const QuickActions = () => (
  <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center">
      <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
      Quick Actions
    </h3>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {[
        { label: 'Upload Resume', icon: FileText, color: 'from-primary to-primary-hover' },
        { label: 'AI Generator', icon: Zap, color: 'from-secondary to-secondary-hover' },
        { label: 'Templates', icon: Globe, color: 'from-info to-info-hover' },
        { label: 'Analytics', icon: BarChart3, color: 'from-success to-success-hover' },
      ].map((action) => (
        <div 
          key={action.label}
          className="group relative overflow-hidden bg-gradient-to-r from-muted/10 to-muted/5 hover:from-muted/20 hover:to-muted/10 border border-border rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:shadow-md"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
          <div className="relative z-10 text-center">
            <action.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-muted group-hover:text-foreground transition-colors" />
            <p className="text-xs sm:text-sm font-medium text-muted group-hover:text-foreground transition-colors leading-tight">{action.label}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RecentPortfolios: React.FC<{ portfolios: Portfolio[] }> = ({ portfolios }) => (
  <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
      <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center">
        <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
        Your Portfolios
      </h3>
      <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover self-start sm:self-auto">
        View All
      </Button>
    </div>
    
    <div className="space-y-3 sm:space-y-4">
      {portfolios.map((portfolio, index) => (
        <div 
          key={portfolio.id}
          className={`group bg-muted/5 hover:bg-muted/10 border border-border/50 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:shadow-md transform hover:scale-[1.02] animate-slide-in`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                  {portfolio.name}
                </h4>
                <span className={`px-2 py-1 text-xs rounded-full self-start sm:self-auto ${
                  portfolio.status === 'published' 
                    ? 'bg-success/20 text-success border border-success/30' 
                    : 'bg-warning/20 text-warning border border-warning/30'
                }`}>
                  {portfolio.status}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-muted">
                <span className="flex items-center">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {portfolio.views.toLocaleString()} views
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {portfolio.lastUpdated}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 self-end sm:self-auto">
              <Button variant="ghost" size="sm" className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1 sm:p-2">
                <Eye className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1 sm:p-2">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1 sm:p-2">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PortfolioManagement: React.FC<PortfolioManagementProps> = ({ isAnimated, portfolios }) => {
  return (
    <div className={`xl:col-span-2 space-y-4 sm:space-y-6 transform transition-all duration-700 delay-200 ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
      <QuickActions />
      <RecentPortfolios portfolios={portfolios} />
    </div>
  );
};

export default PortfolioManagement;