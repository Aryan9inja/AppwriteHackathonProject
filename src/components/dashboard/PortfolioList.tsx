import React from "react";
import { Eye, Globe, Clock, ExternalLink, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { deletePortfolio } from "@/services/portfolio.services";
import { toast } from "sonner";

interface Portfolio {
  $id: string;
  portfolioName: string;
  views: number;
  $updatedAt: string;
  urlString: string;
}

interface PortfolioListProps {
  portfolios: Portfolio[];
  isAnimated: boolean;
  loading: boolean;
  onPortfolioDeleted?: (portfolioId: string) => void;
}

const PortfolioCard: React.FC<{ portfolio: Portfolio; index: number; onPortfolioDeleted?: (portfolioId: string) => void }> = ({
  portfolio,
  index,
  onPortfolioDeleted,
}) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate(portfolio.urlString);
  };

  const handleDelete=async()=>{
    try {
      await deletePortfolio(portfolio.$id)
      toast.success("Portfolio deleted successfully")
      // Call the callback to update the parent state
      if (onPortfolioDeleted) {
        onPortfolioDeleted(portfolio.$id);
      }
    } catch (error) {
      toast.error("Failed to delete portfolio")
    }
  }

  const handleEdit=()=>{
    navigate("/portfolio/create",{state:{docId:portfolio.$id}})
  }

  return (
    <div
      className={`bg-card border border-border rounded-lg sm:rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 animate-slide-in group touch-manipulation`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground truncate text-sm sm:text-base group-hover:text-primary transition-colors flex-1">
              {portfolio.portfolioName}
            </h3>
            <Button
              onClick={handleDelete}
              size="sm"
              variant="ghost"
              className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 ml-2 flex-shrink-0"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 mt-1">
            <div className="flex items-center space-x-1">
              <Eye className="w-3 h-3 text-muted" />
              <span className="text-xs text-muted">
                {portfolio.views.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1 text-xs text-muted">
          <Clock className="w-3 h-3" />
          {(() => {
            const date = new Date(portfolio.$updatedAt);
            const now = new Date();
            const diffTime = Math.abs(now.getTime() - date.getTime());
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
              const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
              if (diffHours === 0) {
                const diffMinutes = Math.floor(diffTime / (1000 * 60));
                if (diffMinutes === 0) return "just now";
                return `${diffMinutes}m ago`;
              }
              return `${diffHours}h ago`;
            } else if (diffDays < 7) {
              return `${diffDays}d ago`;
            } else if (diffDays < 30) {
              const diffWeeks = Math.floor(diffDays / 7);
              return `${diffWeeks}w ago`;
            } else {
              return date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              });
            }
          })()}
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleNavigation}
            size="sm"
            variant="outline"
            className="h-8 px-3 text-xs flex-shrink-0"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            <span className="hidden xs:inline">View</span>
            <span className="xs:hidden">View</span>
          </Button>
          <Button
            onClick={handleEdit}
            size="sm"
            className="h-8 px-3 text-xs bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white flex-shrink-0"
          >
            <Edit className="w-3 h-3 mr-1" />
            <span className="hidden xs:inline">Edit</span>
            <span className="xs:hidden">Edit</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const EmptyState: React.FC = () => (
  <div className="text-center py-12">
    <div className="w-20 h-20 mx-auto mb-4 bg-muted/20 rounded-full flex items-center justify-center">
      <Globe className="w-10 h-10 text-muted" />
    </div>
    <h3 className="text-lg font-semibold text-foreground mb-2">
      No Portfolios Yet
    </h3>
    <p className="text-muted text-sm max-w-sm mx-auto">
      Create your first portfolio to showcase your skills and experience to the
      world.
    </p>
  </div>
);

const PortfolioList: React.FC<PortfolioListProps> = ({
  portfolios,
  isAnimated,
  loading,
  onPortfolioDeleted,
}) => {
  return (
    <div
      className={`bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6 transform transition-all duration-700 ${
        isAnimated ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground flex items-center">
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
          My Portfolios
        </h2>
        <span className="text-xs sm:text-sm text-muted bg-muted/20 px-2 py-1 rounded-full">
          {portfolios.length}{" "}
          {portfolios.length === 1 ? "portfolio" : "portfolios"}
        </span>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-muted">Loading portfolios...</p>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto custom-scrollbar">
          {portfolios.length === 0 ? (
            <EmptyState />
          ) : (
            portfolios.map((portfolio, index) => (
              <PortfolioCard
                key={portfolio.$id}
                portfolio={portfolio}
                index={index}
                onPortfolioDeleted={onPortfolioDeleted}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
