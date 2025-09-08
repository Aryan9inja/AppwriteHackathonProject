import React, { useState } from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';

// Import all the page components
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ExperiencePage from './ExperiencePage';
import EducationPage from './EducationPage';
import ProjectsPage from './ProjectsPage';

interface ClassicPortfolioWebsiteProps {
  data: PortfolioFormData;
}

type PageType = 'home' | 'about' | 'experience' | 'education' | 'projects';

const ClassicPortfolioWebsite: React.FC<ClassicPortfolioWebsiteProps> = ({ data }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              <h1 className="text-xl font-serif font-bold text-gray-900">
                {data.name}
              </h1>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCurrentPage(item.page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      currentPage === item.page
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
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
                className="text-gray-700 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
      <main>{renderCurrentPage()}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">{data.name}</h3>
            <p className="text-gray-600 mb-4">
              © {new Date().getFullYear()} {data.name}. All rights reserved.
            </p>
            
            {/* Footer Navigation */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {navItems.filter(item => item.page !== 'home').map((item) => (
                <button
                  key={item.name}
                  onClick={() => setCurrentPage(item.page)}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Contact Info in Footer */}
            <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm text-gray-500">
              {data.email && <span>{data.email}</span>}
              {data.phone && <span>{data.phone}</span>}
              {data.location && <span>{data.location}</span>}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ClassicPortfolioWebsite;
