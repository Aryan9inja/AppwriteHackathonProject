import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="relative z-50 px-4 sm:px-6 lg:px-8 py-4 bg-background/80 backdrop-blur-md border-b border-border/50 dark:bg-background/95">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-md dark:shadow-primary/20 dark:bg-primary">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">PortfolioAI</span>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <ThemeToggle variant="icon" size="sm" className="text-muted-foreground hover:text-foreground transition-colors" />
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/10 dark:hover:bg-muted/20"
          >
            Sign In
          </Button>
          <Button
            onClick={() => navigate("/signup")}
            className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300
                     dark:shadow-primary/20 dark:hover:shadow-primary/30"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
