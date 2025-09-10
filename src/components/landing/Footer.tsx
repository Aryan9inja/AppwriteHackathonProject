import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t border-border/50 bg-card/30 dark:bg-gray-950 dark:border-gray-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-6 h-6 bg-primary rounded flex items-center justify-center shadow-sm dark:shadow-primary/20 dark:bg-primary">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground">PortfolioAI</span>
        </div>

        {/* Copyright */}
        <p className="text-sm text-muted-foreground">
          © 2025 PortfolioAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
