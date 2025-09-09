import React, { useState } from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';

// Import all the page components
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ExperiencePage from './ExperiencePage';
import EducationPage from './EducationPage';
import ProjectsPage from './ProjectsPage';

interface CreativePortfolioWebsiteProps {
  data: PortfolioFormData;
}

type PageType = 'home' | 'about' | 'experience' | 'education' | 'projects';

const CreativePortfolioWebsite: React.FC<CreativePortfolioWebsiteProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Listen for navigation events from child components
  React.useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setCurrentPage(event.detail as PageType);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  // Determine which tabs to show based on data
  const navItems: { name: string; page: PageType }[] = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    ...(data.experience && data.experience.length > 0 ? [{ name: 'Experience', page: 'experience' as PageType }] : []),
    ...(data.education && data.education.length > 0 ? [{ name: 'Education', page: 'education' as PageType }] : []),
    ...(data.projects && data.projects.length > 0 ? [{ name: 'Projects', page: 'projects' as PageType }] : []),
  ];

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage data={data} />;
      case 'about':
        return <AboutPage data={data} />;
      case 'experience':
        return <ExperiencePage data={data} />;
      case 'education':
        return <EducationPage data={data} />;
      case 'projects':
        return <ProjectsPage data={data} />;
      default:
        return <HomePage data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      {/* Navigation */}
      <nav className="backdrop-blur-lg bg-white/70 shadow-lg border-b border-pink-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center hover:text-purple-600 transition-colors group"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-lg mr-2 md:mr-3 group-hover:scale-110 transition-transform">
                {data.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent truncate">
                {data.name}
              </h1>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCurrentPage(item.page)}
                    className={`px-4 lg:px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-sm lg:text-base ${
                      currentPage === item.page
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                        : 'text-gray-700 hover:text-purple-600 hover:bg-white/50 backdrop-blur-sm'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <select 
                value={currentPage} 
                onChange={(e) => setCurrentPage(e.target.value as PageType)}
                className="text-gray-700 bg-white/70 backdrop-blur-sm border border-pink-300 rounded-full px-3 py-1.5 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[100px]"
              >
                {navItems.map((item) => (
                  <option key={item.name} value={item.page}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        {/* Background decorative elements - responsive */}
        <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-pink-300 bg-opacity-20 rounded-full blur-3xl -translate-x-16 md:-translate-x-32 -translate-y-16 md:-translate-y-32"></div>
        <div className="absolute top-1/3 right-0 w-48 h-48 md:w-96 md:h-96 bg-purple-300 bg-opacity-20 rounded-full blur-3xl translate-x-24 md:translate-x-48"></div>
        <div className="absolute bottom-0 left-1/3 w-40 h-40 md:w-80 md:h-80 bg-indigo-300 bg-opacity-20 rounded-full blur-3xl translate-y-20 md:translate-y-40"></div>
        
        <div className="relative z-10">
          {renderCurrentPage()}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 backdrop-blur-lg bg-white/70 border-t border-pink-200 mt-8 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-3 md:mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl mr-2 md:mr-3">
                {data.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <h3 className="text-base md:text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {data.name}
              </h3>
            </div>
            <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base">
              © {new Date().getFullYear()} {data.name}. Crafted with creativity & passion.
            </p>
            
            {/* Footer Navigation */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-xs md:text-sm mb-3 md:mb-4">
              {navItems.filter(item => item.page !== 'home').map((item) => (
                <button
                  key={item.name}
                  onClick={() => setCurrentPage(item.page)}
                  className="text-gray-600 hover:text-purple-600 transition-colors font-medium px-2 py-1"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Contact Info in Footer */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 md:gap-6 text-xs md:text-sm text-gray-500">
              {data.email && (
                <span className="bg-white/50 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full border border-pink-200 break-all">
                  {data.email}
                </span>
              )}
              {data.phone && (
                <span className="bg-white/50 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full border border-pink-200">
                  {data.phone}
                </span>
              )}
              {data.location && (
                <span className="bg-white/50 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full border border-pink-200">
                  {data.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreativePortfolioWebsite;
