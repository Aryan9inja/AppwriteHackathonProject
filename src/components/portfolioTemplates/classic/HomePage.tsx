import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, User, Briefcase, GraduationCap, Code } from 'lucide-react';

interface HomePageProps {
  data: PortfolioFormData;
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const navigationItems = [
    { name: 'About', icon: User, page: 'about' },
    { name: 'Experience', icon: Briefcase, page: 'experience' },
    { name: 'Education', icon: GraduationCap, page: 'education' },
    { name: 'Projects', icon: Code, page: 'projects' },
  ];

  // Get navigation function from parent via event delegation
  const handleNavigation = (page: string) => {
    // Dispatch custom event that parent can listen to
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-6 md:p-8 lg:p-12 mb-6 md:mb-8 hover:shadow-xl transition-shadow duration-300">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
            {data.name}
          </h1>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-gray-600 mb-6 md:mb-8">
            {data.email && (
              <div className="flex items-center justify-center gap-2 md:gap-3 hover:text-gray-800 transition-colors">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                <span className="font-medium text-sm sm:text-base md:text-lg break-all">{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center justify-center gap-2 md:gap-3 hover:text-gray-800 transition-colors">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                <span className="font-medium text-sm sm:text-base md:text-lg">{data.phone}</span>
              </div>
            )}
            {data.location && (
              <div className="flex items-center justify-center gap-2 md:gap-3 hover:text-gray-800 transition-colors">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                <span className="font-medium text-sm sm:text-base md:text-lg">{data.location}</span>
              </div>
            )}
          </div>
          {data.summary && (
            <p className="text-gray-700 leading-relaxed max-w-5xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl font-light mb-6 md:mb-8 px-4">
              {data.summary}
            </p>
          )}

          {/* Social Links */}
          {(data.socialLinks?.linkedin || data.socialLinks?.github || data.socialLinks?.portfolio) && (
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 pt-6 md:pt-8 border-t border-gray-200">
              {data.socialLinks?.linkedin && (
                <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="flex items-center justify-center gap-2 md:gap-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 font-medium text-sm md:text-lg">
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                  LinkedIn
                </a>
              )}
              {data.socialLinks?.github && (
                <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center gap-2 md:gap-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 font-medium text-sm md:text-lg">
                  <Github className="w-5 h-5 md:w-6 md:h-6" />
                  GitHub
                </a>
              )}
              {data.socialLinks?.portfolio && (
                <a href={data.socialLinks.portfolio} target="_blank" rel="noopener noreferrer"
                   className="flex items-center justify-center gap-2 md:gap-3 text-purple-600 hover:text-purple-800 hover:bg-purple-50 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 font-medium text-sm md:text-lg">
                  <ExternalLink className="w-5 h-5 md:w-6 md:h-6" />
                  Portfolio
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
        {navigationItems.map((item) => (
          <button
            key={item.name}
            onClick={() => handleNavigation(item.page)}
            className="bg-white shadow-md border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 group text-left w-full"
          >
            <div className="text-center">
              <item.icon className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-600 group-hover:text-blue-600 mx-auto mb-3 md:mb-4 transition-colors" />
              <h3 className="text-lg md:text-xl font-serif font-bold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-gray-600 text-xs md:text-sm">
                {item.name === 'About' && 'Learn more about me'}
                {item.name === 'Experience' && 'My professional journey'}
                {item.name === 'Education' && 'Academic background'}
                {item.name === 'Projects' && 'Things I\'ve built'}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Skills Preview */}
      {data.skills && data.skills.length > 0 && data.skills.some(skill => skill.trim()) && (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 md:p-8 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-4 md:mb-6 text-center pb-2 border-b-2 border-blue-600">
            Skills Overview
          </h2>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {data.skills.filter(skill => skill.trim()).slice(0, 10).map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 md:px-4 py-1 md:py-2 rounded-full font-medium text-sm md:text-base lg:text-lg hover:bg-blue-200 transition-colors">
                {skill}
              </span>
            ))}
            {data.skills.filter(skill => skill.trim()).length > 10 && (
              <span className="text-gray-500 font-medium text-sm md:text-base lg:text-lg">
                +{data.skills.filter(skill => skill.trim()).length - 10} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
