import React, { useRef, useState } from "react";
import {
  FileText,
  Eye,
  Settings,
  Download,
  Clock,
  Zap,
  Globe,
  BarChart3,
  Loader2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadResume } from "@/services/portfolio.services";
import { functions } from "@/lib/appwrite.config";
import { PARSE_RESUME_FUNC } from "@/constants/appwrite";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

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

interface QuickActionsProps {
  isUploading: boolean;
  setIsUploading: (uploading: boolean) => void;
}

const FullscreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center animate-backdrop-fade-in">
      <div className="text-center space-y-8 p-8 max-w-md mx-auto">
        {/* Animated upload icon with glow effect */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse animate-pulse-glow"></div>
          <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center shadow-lg">
            <Upload className="w-10 h-10 text-primary animate-bounce-subtle" />
          </div>
          {/* Rotating ring */}
          <div className="absolute -inset-2 border-2 border-transparent border-t-primary/30 border-r-secondary/30 rounded-full animate-spin"></div>
        </div>
        
        {/* Dual loading spinner */}
        <div className="relative flex justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-secondary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        
        {/* Text content with better spacing */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold gradient-text animate-scale-in">
            Processing Your Resume
          </h2>
          <div className="space-y-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-foreground/90 text-lg font-medium">
              Uploading and parsing your resume...
            </p>
            <p className="text-muted text-sm leading-relaxed">
              Your portfolio website will be initiated shortly. This process may take a few moments as we analyze your experience and skills.
            </p>
          </div>
        </div>
        
        {/* Enhanced progress animation */}
        <div className="w-80 mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="h-3 bg-muted/20 rounded-full overflow-hidden border border-border/50">
            <div className="h-full bg-gradient-to-r from-primary via-secondary to-primary animate-shimmer rounded-full"></div>
          </div>
          <p className="text-xs text-muted mt-2 text-center">
            Please don't close this window...
          </p>
        </div>
        
        {/* Floating dots animation with staggered delays */}
        <div className="flex justify-center space-x-3 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
          <div className="w-3 h-3 bg-info rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
        </div>
      </div>
    </div>
  );
};

const QuickActions: React.FC<QuickActionsProps> = ({ isUploading, setIsUploading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleUploadResume = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      alert("Please select a PDF file");
      return;
    }

    // Validate file size (e.g., max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    if (!user?.userId) {
      alert("User not authenticated");
      return;
    }

    setIsUploading(true);
    try {
      console.log("Uploading resume...");
      const fileId = await uploadResume(file);
      
      console.log("Resume uploaded, starting parsing...");
      // Trigger the resume parsing function
      await functions.createExecution({
        functionId: PARSE_RESUME_FUNC,
        body: JSON.stringify({
          userId: user.userId,
          fileId: fileId
        })
      });

      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to upload resume:", error);
      alert("Failed to upload resume. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAIGenerator = () => {
    console.log("AI Generator clicked");
    // TODO: Implement AI generator functionality
  };

  const handleTemplates = () => {
    console.log("Templates clicked");
    // TODO: Implement templates functionality
  };

  const handleAnalytics = () => {
    console.log("Analytics clicked");
    // TODO: Implement analytics functionality
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4 flex items-center">
        <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
        Quick Actions
      </h3>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            label: "Upload Resume",
            icon: FileText,
            color: "from-primary to-primary-hover",
            onClick: handleUploadResume,
            disabled: isUploading,
          },
          {
            label: "AI Generator",
            icon: Zap,
            color: "from-secondary to-secondary-hover",
            onClick: handleAIGenerator,
            disabled: isUploading,
          },
          {
            label: "Templates",
            icon: Globe,
            color: "from-info to-info-hover",
            onClick: handleTemplates,
            disabled: isUploading,
          },
          {
            label: "Analytics",
            icon: BarChart3,
            color: "from-success to-success-hover",
            onClick: handleAnalytics,
            disabled: isUploading,
          },
        ].map((action) => (
          <div
            key={action.label}
            className={`group relative overflow-hidden bg-gradient-to-r from-muted/10 to-muted/5 hover:from-muted/20 hover:to-muted/10 border border-border rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-300 hover:shadow-md ${
              action.disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={action.disabled ? undefined : action.onClick}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-r ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            ></div>
            <div className="relative z-10 text-center">
              {action.label === "Upload Resume" && isUploading ? (
                <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-muted group-hover:text-foreground transition-colors animate-spin" />
              ) : (
                <action.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-muted group-hover:text-foreground transition-colors" />
              )}
              <p className="text-xs sm:text-sm font-medium text-muted group-hover:text-foreground transition-colors leading-tight">
                {action.label === "Upload Resume" && isUploading 
                  ? "Processing..." 
                  : action.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RecentPortfolios: React.FC<{ portfolios: Portfolio[] }> = ({
  portfolios,
}) => (
  <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
      <h3 className="text-base sm:text-lg font-semibold text-foreground flex items-center">
        <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
        Your Portfolios
      </h3>
      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:text-primary-hover self-start sm:self-auto"
      >
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
                <span
                  className={`px-2 py-1 text-xs rounded-full self-start sm:self-auto ${
                    portfolio.status === "published"
                      ? "bg-success/20 text-success border border-success/30"
                      : "bg-warning/20 text-warning border border-warning/30"
                  }`}
                >
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
              <Button
                variant="ghost"
                size="sm"
                className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1 sm:p-2"
              >
                <Eye className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1 sm:p-2"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity p-1 sm:p-2"
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PortfolioManagement: React.FC<PortfolioManagementProps> = ({
  isAnimated,
  portfolios,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <>
      {isUploading && <FullscreenLoader />}
      <div
        className={`xl:col-span-2 space-y-4 sm:space-y-6 transform transition-all duration-700 delay-200 ${
          isAnimated ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <QuickActions isUploading={isUploading} setIsUploading={setIsUploading} />
        <RecentPortfolios portfolios={portfolios} />
      </div>
    </>
  );
};

export default PortfolioManagement;
