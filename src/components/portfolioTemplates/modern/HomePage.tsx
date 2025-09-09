import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, User, Briefcase, GraduationCap, Code, Sparkles, ArrowRight } from 'lucide-react';

interface HomePageProps {
  data: PortfolioFormData;
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const navigationItems = [
    { name: 'About', icon: User, page: 'about', color: 'from-blue-500 to-cyan-500' },
    { name: 'Experience', icon: Briefcase, page: 'experience', color: 'from-purple-500 to-pink-500' },
    { name: 'Education', icon: GraduationCap, page: 'education', color: 'from-green-500 to-emerald-500' },
    { name: 'Projects', icon: Code, page: 'projects', color: 'from-orange-500 to-red-500' },
  ];

  // Get navigation function from parent via event delegation
  const handleNavigation = (page: string) => {
    // Dispatch custom event that parent can listen to
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <div className="bg-white/90 backdrop-blur-md shadow-2xl border border-blue-200 rounded-2xl md:rounded-3xl p-6 md:p-12 lg:p-16 mb-8 md:mb-12 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"></div>
        
        <div className="relative text-center">
          {/* Profile Avatar */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mx-auto mb-6 md:mb-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            {data.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4 md:mb-6 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight pb-2">
            {data.name}
          </h1>
          
          {data.summary && (
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 md:mb-8 leading-relaxed max-w-4xl mx-auto px-4">
              {data.summary}
            </p>
          )}

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-gray-600 mb-6 md:mb-8">
            {data.email && (
              <div className="flex items-center justify-center gap-2 md:gap-3 hover:text-blue-600 transition-colors group cursor-pointer">
                <div className="p-2 md:p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <Mail className="w-4 h-4 md:w-6 md:h-6 text-blue-600" />
                </div>
                <span className="font-medium text-sm sm:text-base md:text-lg break-all">{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center justify-center gap-2 md:gap-3 hover:text-green-600 transition-colors group cursor-pointer">
                <div className="p-2 md:p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <Phone className="w-4 h-4 md:w-6 md:h-6 text-green-600" />
                </div>
                <span className="font-medium text-lg">{data.phone}</span>
              </div>
            )}
            {data.location && (
              <div className="flex items-center gap-3 hover:text-red-600 transition-colors group cursor-pointer">
                <div className="p-3 bg-red-100 rounded-xl group-hover:bg-red-200 transition-colors">
                  <MapPin className="w-6 h-6 text-red-600" />
                </div>
                <span className="font-medium text-lg">{data.location}</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          {(data.socialLinks?.linkedin || data.socialLinks?.github || data.socialLinks?.portfolio) && (
            <div className="flex justify-center gap-4 mb-8">
              {data.socialLinks?.linkedin && (
                <a 
                  href={data.socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              )}
              {data.socialLinks?.github && (
                <a 
                  href={data.socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3 rounded-xl hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              )}
              {data.socialLinks?.portfolio && (
                <a 
                  href={data.socialLinks.portfolio} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <ExternalLink className="w-5 h-5" />
                  Portfolio
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-500" />
            Explore My Journey
          </h2>
          <p className="text-gray-600 text-lg">Click on any section to learn more about my background</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.page)}
              className="group bg-white/90 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
              <div className="flex items-center justify-center text-gray-500 group-hover:text-blue-500 transition-colors">
                <span className="text-sm">Explore</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Skills Preview */}
      {data.skills && data.skills.length > 0 && (
        <div className="bg-white/90 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Featured Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills.slice(0, 8).filter(skill => skill.trim()).map((skill, index) => (
              <span 
                key={index} 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
            {data.skills.length > 8 && (
              <button
                onClick={() => handleNavigation('about')}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                +{data.skills.length - 8} more
              </button>
            )}
          </div>
        </div>
      )}

      {/* Recent Projects Preview */}
      {data.projects && data.projects.length > 0 && (
        <div className="bg-white/90 backdrop-blur-md shadow-xl border border-gray-200 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Recent Projects</h2>
            <button
              onClick={() => handleNavigation('projects')}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {data.projects.slice(0, 2).map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {project.name}
                  </h3>
                  {project.link && (
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  )}
                </div>
                <p className="text-gray-700 mb-3 line-clamp-3">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).filter(tech => tech.trim()).map((tech, techIndex) => (
                      <span key={techIndex} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
