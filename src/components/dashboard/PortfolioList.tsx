import React from 'react';
import { Eye, Globe, Clock, Settings, ExternalLink, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Portfolio {
  id: number;
  name: string;
  views: number;
  status: string;
  lastUpdated: string;
}

interface PortfolioListProps {
  portfolios: Portfolio[];
  isAnimated: boolean;
}

const PortfolioCard: React.FC<{ portfolio: Portfolio; index: number }> = ({ portfolio, index }) => {
  const isPublished = portfolio.status === 'published';
  
  return (
    <div 
      className={`bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 animate-slide-in group touch-manipulation`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 pr-2">
          <h3 className="font-semibold text-foreground truncate text-sm sm:text-base group-hover:text-primary transition-colors">
            {portfolio.name}
          </h3>
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 mt-1">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3 text-muted" />
              <span className="text-xs text-muted">{portfolio.views.toLocaleString()}</span>
            </div>
            <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              isPublished 
                ? 'bg-success/10 text-success border border-success/20' 
                : 'bg-warning/10 text-warning border border-warning/20'
            }`}>
              {portfolio.status}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="outline" className="p-1.5 h-8 w-8 sm:h-7 sm:w-7 sm:p-1">
            <Settings className="w-3 h-3" />
          </Button>
          {isPublished && (
            <Button size="sm" variant="outline" className="p-1.5 h-8 w-8 sm:h-7 sm:w-7 sm:p-1">
              <ExternalLink className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-xs text-muted">
          <Clock className="w-3 h-3" />
          <span className="truncate">Updated {portfolio.lastUpdated}</span>
        </div>
        <Button 
          size="sm" 
          className="h-8 px-3 text-xs bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white flex-shrink-0"
        >
          <Edit className="w-3 h-3 mr-1" />
          <span className="hidden xs:inline">Edit</span>
          <span className="xs:hidden">Edit</span>
        </Button>
      </div>
    </div>
  );
};

const EmptyState: React.FC = () => (
  <div className="text-center py-12">
    <div className="w-20 h-20 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
      <Globe className="w-10 h-10 text-muted" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">No Portfolios Yet</h3>
    <p className="text-muted text-sm max-w-sm mx-auto">
      Create your first portfolio to showcase your skills and experience to the world.
    </p>
  </div>
);

const PortfolioList: React.FC<PortfolioListProps> = ({ portfolios, isAnimated }) => {
  return (
    <div className={`bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 transform transition-all duration-700 ${
      isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
    }`}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground flex items-center">
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
          My Portfolios
        </h2>
        <span className="text-xs sm:text-sm text-muted bg-muted/20 px-2 py-1 rounded-full">
          {portfolios.length} {portfolios.length === 1 ? 'portfolio' : 'portfolios'}
        </span>
      </div>

      <div className="space-y-3 sm:space-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto custom-scrollbar">
        {portfolios.length === 0 ? (
          <EmptyState />
        ) : (
          portfolios.map((portfolio, index) => (
            <PortfolioCard 
              key={portfolio.id} 
              portfolio={portfolio} 
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PortfolioList;
