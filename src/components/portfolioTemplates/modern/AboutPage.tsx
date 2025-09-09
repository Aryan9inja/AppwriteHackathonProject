import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Award, Globe, Star } from 'lucide-react';

interface AboutPageProps {
  data: PortfolioFormData;
}

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  // Helper function to check if array has valid content
  const hasValidContent = (array?: string[]) => {
    return array && array.length > 0 && array.some(item => item.trim());
  };

  // Helper function to check if object array has content
  const hasValidObjectArray = (array?: any[]) => {
    return array && array.length > 0;
  };

  const hasSkills = hasValidContent(data.skills);
  const hasLanguages = hasValidContent(data.languages);
  const hasCertifications = hasValidObjectArray(data.certifications);

  // Navigation function
  const handleNavigation = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Personal Information Section */}
      <div className="bg-white/90 backdrop-blur-md shadow-2xl border border-blue-200 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl"></div>
        
        <div className="relative text-center mb-12">
          {/* Profile Avatar */}
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mx-auto mb-8 shadow-2xl">
            {data.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About {data.name.split(' ')[0]}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-gray-600 mb-8">
            {data.email && (
              <div className="flex items-center gap-3 hover:text-blue-600 transition-colors group cursor-pointer">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <span className="font-medium text-lg">{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-3 hover:text-green-600 transition-colors group cursor-pointer">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <Phone className="w-6 h-6 text-green-600" />
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
        </div>

        {/* About Me Summary */}
        {data.summary && (
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Star className="w-6 h-6 text-blue-500" />
                My Story
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed text-center">
                {data.summary}
              </p>
            </div>
          </div>
        )}

        {/* Social Links */}
        {(data.socialLinks?.linkedin || data.socialLinks?.github || data.socialLinks?.portfolio) && (
          <div className="flex justify-center gap-4 mt-8">
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

      {/* Skills, Languages, and Certifications Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Skills */}
        {hasSkills && (
          <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.skills!.filter(skill => skill.trim()).map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {hasLanguages && (
          <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              Languages
            </h2>
            <div className="space-y-4">
              {data.languages!.filter(lang => lang.trim()).map((language, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full group-hover:scale-125 transition-transform"></div>
                  <span className="text-gray-700 font-medium group-hover:text-green-600 transition-colors">{language}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {hasCertifications && (
          <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              Certifications
            </h2>
            <div className="space-y-6">
              {data.certifications!.map((cert, index) => (
                <div key={index} className="border-l-4 border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 rounded-r-xl pl-6 py-4 hover:shadow-lg transition-shadow">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{cert.name}</h3>
                  <p className="text-purple-600 font-medium mb-1">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Prompt */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Want to know more?</h3>
        <p className="text-gray-600 mb-6">Explore my professional journey and projects</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleNavigation('experience')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Experience
          </button>
          <button
            onClick={() => handleNavigation('projects')}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
