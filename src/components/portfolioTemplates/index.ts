export { default as ModernTemplate } from './ModernTemplate';
export { default as CreativeTemplate } from './CreativeTemplate';
export { default as MinimalTemplate } from './MinimalTemplate';
export { default as TechTemplate } from './TechTemplate';
export { ClassicPortfolioWebsite } from './classic';

import ModernTemplate from './ModernTemplate';
import CreativeTemplate from './CreativeTemplate';
import MinimalTemplate from './MinimalTemplate';
import TechTemplate from './TechTemplate';
import { ClassicPortfolioWebsite } from './classic';

// Template registry for easy access
export const PORTFOLIO_TEMPLATES = {
  modern: ModernTemplate,
  classic: ClassicPortfolioWebsite,
  creative: CreativeTemplate,
  minimal: MinimalTemplate,
  tech: TechTemplate,
} as const;

export type TemplateKey = keyof typeof PORTFOLIO_TEMPLATES;

// Template metadata for selection UI
export const TEMPLATE_METADATA = {
  modern: {
    name: 'Modern',
    description: 'Clean design with gradients and cards',
    preview: '/templates/modern-preview.jpg',
    color: 'bg-gradient-to-br from-blue-500 to-purple-600',
  },
  classic: {
    name: 'Classic',
    description: 'Multi-page professional portfolio website',
    preview: '/templates/classic-preview.jpg',
    color: 'bg-gradient-to-r from-blue-600 via-green-600 to-purple-600',
  },
  creative: {
    name: 'Creative',
    description: 'Vibrant and artistic design',
    preview: '/templates/creative-preview.jpg',
    color: 'bg-gradient-to-r from-pink-500 to-purple-500',
  },
  minimal: {
    name: 'Minimal',
    description: 'Clean and simple typography-focused',
    preview: '/templates/minimal-preview.jpg',
    color: 'bg-white border-2 border-gray-300',
  },
  tech: {
    name: 'Tech',
    description: 'Terminal-inspired developer theme',
    preview: '/templates/tech-preview.jpg',
    color: 'bg-gray-900',
  },
} as const;