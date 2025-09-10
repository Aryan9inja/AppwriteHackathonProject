import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { RootState, AppDispatch } from "@/store/store";
import { toggleTheme, setTheme, type Theme } from "@/store/slices/themeSlice";

interface ThemeToggleProps {
  variant?: "icon" | "text" | "dropdown";
  size?: "sm" | "default" | "lg";
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = "icon", 
  size = "sm",
  className = "" 
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme } = useSelector((state: RootState) => state.theme);

  const handleThemeChange = (newTheme: Theme) => {
    dispatch(setTheme(newTheme));
  };

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const getThemeIcon = () => {
    return theme === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />;
  };

  const getThemeLabel = () => {
    return theme === "light" ? "Light" : "Dark";
  };

  if (variant === "dropdown") {
    return (
      <div className={`relative ${className}`}>
        <select
          value={theme}
          onChange={(e) => handleThemeChange(e.target.value as Theme)}
          className="bg-background border border-border rounded-md px-3 py-2 text-sm text-foreground 
                   focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                   hover:bg-muted transition-colors duration-200"
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
        </select>
      </div>
    );
  }

  if (variant === "text") {
    return (
      <Button
        onClick={handleToggle}
        variant="ghost"
        size={size}
        className={`gap-2 ${className}`}
        title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {getThemeIcon()}
        <span className="hidden sm:inline">{getThemeLabel()}</span>
      </Button>
    );
  }

  // Default icon variant
  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      size={size}
      className={`p-2 ${className}`}
      title={`Current: ${getThemeLabel()}. Click to switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {getThemeIcon()}
    </Button>
  );
};

export default ThemeToggle;
