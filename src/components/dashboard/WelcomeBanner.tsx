import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomeBannerProps {
  isAnimated: boolean;
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ isAnimated }) => {
  return (
    <div
      className={`mb-4 sm:mb-6 lg:mb-8 transform transition-all duration-700 ${
        isAnimated ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 border border-border/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-1 sm:mb-2">
              Welcome back! 👋
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-muted leading-relaxed">
              Ready to create amazing portfolios? Let's build something great
              today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
