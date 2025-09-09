export { default as MinimalTemplate } from "./MinimalTemplate";
export { ClassicPortfolioWebsite } from "./classic";
export { ModernPortfolioWebsite } from "./modern";
export { CreativePortfolioWebsite } from "./creative";
export { TechPortfolioWebsite } from "./tech";

import MinimalTemplate from "./MinimalTemplate";
import { ClassicPortfolioWebsite } from "./classic";
import { ModernPortfolioWebsite } from "./modern";
import { CreativePortfolioWebsite } from "./creative";
import { TechPortfolioWebsite } from "./tech";

// Template registry for easy access
export const PORTFOLIO_TEMPLATES = {
  modern: ModernPortfolioWebsite,
  classic: ClassicPortfolioWebsite,
  creative: CreativePortfolioWebsite,
  minimal: MinimalTemplate,
  tech: TechPortfolioWebsite,
} as const;

export type TemplateKey = keyof typeof PORTFOLIO_TEMPLATES;

// Template metadata for selection UI
export const TEMPLATE_METADATA = {
  modern: {
    name: "Modern",
    description: "Multi-page modern portfolio with navigation",
    preview: "/templates/modern-website-preview.jpg",
    color: "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500",
  },
  classic: {
    name: "Classic",
    description: "Multi-page professional portfolio website",
    preview: "/templates/classic-preview.jpg",
    color: "bg-gradient-to-r from-blue-600 via-green-600 to-purple-600",
  },
  creative: {
    name: "Creative",
    description: "Multi-page creative portfolio with vibrant design",
    preview: "/templates/creative-website-preview.jpg",
    color: "bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
  },
  minimal: {
    name: "Minimal",
    description: "Clean and simple typography-focused",
    preview: "/templates/minimal-preview.jpg",
    color: "bg-white border-2 border-gray-300",
  },
  tech: {
    name: "Tech",
    description: "Multi-page terminal-based portfolio with interactive CLI",
    preview: "/templates/tech-multipage-preview.jpg",
    color: "bg-gray-900 border-2 border-green-500",
  },
} as const;
