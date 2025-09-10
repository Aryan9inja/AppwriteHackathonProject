import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { theme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    // Apply theme class to document
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove("light", "dark");
    
    // Add current theme class
    root.classList.add(theme);
    
    // Update theme-color meta tag for better mobile experience
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute(
        "content", 
        theme === "dark" ? "#000000" : "#ffffff"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = theme === "dark" ? "#000000" : "#ffffff";
      document.head.appendChild(meta);
    }
  }, [theme]);

  return <>{children}</>;
};

export default ThemeProvider;
