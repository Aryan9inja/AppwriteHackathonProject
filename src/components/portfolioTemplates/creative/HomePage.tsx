import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, User, Briefcase, GraduationCap, Code, Star, Zap } from 'lucide-react';

interface HomePageProps {
  data: PortfolioFormData;
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const navigationItems = [
    { name: 'About', icon: User, page: 'about', color: 'from-pink-500 to-rose-500' },
    { name: 'Experience', icon: Briefcase, page: 'experience', color: 'from-purple-500 to-violet-500' },
    { name: 'Education', icon: GraduationCap, page: 'education', color: 'from-indigo-500 to-blue-500' },
    { name: 'Projects', icon: Code, page: 'projects', color: 'from-cyan-500 to-teal-500' },
  ];

  // Get navigation function from parent via event delegation
  const handleNavigation = (page: string) => {
    // Dispatch custom event that parent can listen to
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <div className="relative bg-white/70 backdrop-blur-lg shadow-xl border border-pink-200 rounded-3xl p-8 md:p-12 mb-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-400 opacity-20 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-400 to-cyan-400 opacity-20 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10 text-center">
          {/* Profile Avatar */}
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl transform hover:scale-110 transition-transform duration-300">
            {data.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            {data.name}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-gray-700 mb-8">
            {data.email && (
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200 hover:border-pink-300 hover:shadow-md transition-all">
                <Mail className="w-6 h-6 text-pink-600" />
                <span className="font-medium text-lg">{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200 hover:border-purple-300 hover:shadow-md transition-all">
                <Phone className="w-6 h-6 text-purple-600" />
                <span className="font-medium text-lg">{data.phone}</span>
              </div>
            )}
            {data.location && (
              <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200 hover:border-indigo-300 hover:shadow-md transition-all">
                <MapPin className="w-6 h-6 text-indigo-600" />
                <span className="font-medium text-lg">{data.location}</span>
              </div>
            )}
          </div>

          {data.summary && (
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-8 font-light">
              {data.summary}
            </p>
          )}

          {/* Social Links */}
          {(data.socialLinks?.linkedin || data.socialLinks?.github || data.socialLinks?.portfolio) && (
            <div className="flex justify-center gap-4 mb-8">
              {data.socialLinks?.linkedin && (
                <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {data.socialLinks?.github && (
                <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"
                   className="bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Github className="w-6 h-6" />
                </a>
              )}
              {data.socialLinks?.portfolio && (
                <a href={data.socialLinks.portfolio} target="_blank" rel="noopener noreferrer"
                   className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 px-6 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <ExternalLink className="w-6 h-6" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          
          // Check if we should show this navigation item based on data
          const shouldShow = 
            item.page === 'about' ||
            (item.page === 'experience' && data.experience && data.experience.length > 0) ||
            (item.page === 'education' && data.education && data.education.length > 0) ||
            (item.page === 'projects' && data.projects && data.projects.length > 0);

          if (!shouldShow) return null;

          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.page)}
              className="group relative bg-white/70 backdrop-blur-lg border border-pink-200 hover:border-pink-300 rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {item.name}
              </h3>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent rounded-full group-hover:via-purple-400 transition-colors"></div>
            </button>
          );
        })}
      </div>

      {/* Featured Skills Preview */}
      {data.skills && data.skills.length > 0 && (
        <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-pink-200 rounded-3xl p-8 mb-8 hover:shadow-2xl transition-all duration-500">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="w-8 h-8 text-pink-500" />
              <h2 className="text-3xl font-bold text-gray-900">Featured Skills</h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mx-auto"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {data.skills.slice(0, 8).filter(skill => skill.trim()).map((skill, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {skill}
              </span>
            ))}
            {data.skills.length > 8 && (
              <button
                onClick={() => handleNavigation('about')}
                className="bg-white/70 backdrop-blur-sm text-purple-600 border border-purple-300 hover:border-purple-400 px-6 py-3 rounded-full font-medium text-lg hover:shadow-md transition-all duration-300"
              >
                +{data.skills.length - 8} more
              </button>
            )}
          </div>
        </div>
      )}

      {/* Recent Projects Preview */}
      {data.projects && data.projects.length > 0 && (
        <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-pink-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-purple-500" />
              <h2 className="text-3xl font-bold text-gray-900">Featured Projects</h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.projects.slice(0, 3).map((project, index) => (
              <div
                key={index}
                className="group bg-white/50 backdrop-blur-sm border border-pink-200 hover:border-pink-300 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).filter(tech => tech.trim()).map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
          {data.projects.length > 3 && (
            <div className="text-center mt-8">
              <button
                onClick={() => handleNavigation('projects')}
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:from-purple-600 hover:to-indigo-600 px-8 py-3 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
