import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Star, Award, Globe } from 'lucide-react';

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
      <div className="relative bg-white/70 backdrop-blur-lg shadow-xl border border-pink-200 rounded-3xl p-8 mb-8 hover:shadow-2xl transition-all duration-500">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-400 opacity-20 rounded-full -translate-y-20 translate-x-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-indigo-400 to-cyan-400 opacity-20 rounded-full translate-y-16 -translate-x-16"></div>
        
        <div className="relative z-10 text-center mb-8">
          {/* Profile Avatar */}
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl">
            {data.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            About {data.name.split(' ')[0]}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-gray-700 mb-6">
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

          {/* Social Links */}
          {(data.socialLinks?.linkedin || data.socialLinks?.github || data.socialLinks?.portfolio) && (
            <div className="flex justify-center gap-4 mb-6">
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

        {/* Summary Section */}
        {data.summary && (
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm border border-pink-200 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Professional Summary</h2>
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                {data.summary}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column - Skills and Languages */}
        <div className="space-y-8">
          {/* Skills Section */}
          {hasSkills && (
            <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-pink-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-8 h-8 text-pink-500" />
                <h2 className="text-3xl font-bold text-gray-900">Skills & Expertise</h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mb-6"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.skills!.filter(skill => skill.trim()).map((skill, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 rounded-2xl text-center font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300"></div>
                    <span className="relative z-10">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {hasLanguages && (
            <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-indigo-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="w-8 h-8 text-indigo-500" />
                <h2 className="text-3xl font-bold text-gray-900">Languages</h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mb-6"></div>
              <div className="space-y-4">
                {data.languages!.filter(lang => lang.trim()).map((language, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-indigo-200 hover:border-indigo-300 transition-all">
                    <div className="w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium text-lg">{language}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Certifications */}
        <div className="space-y-8">
          {hasCertifications && (
            <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-yellow-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-900">Certifications & Achievements</h2>
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-6"></div>
              <div className="space-y-6">
                {data.certifications!.map((cert, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="absolute top-4 right-4">
                      <Award className="w-6 h-6 text-yellow-500 group-hover:text-orange-500 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 pr-10">{cert.name}</h3>
                    <p className="text-lg text-gray-700 mb-2 font-medium">{cert.issuer}</p>
                    <p className="text-sm text-gray-600 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full inline-block">
                      {cert.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Navigation */}
          <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-pink-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Explore More</h2>
            <div className="space-y-4">
              {data.experience && data.experience.length > 0 && (
                <button
                  onClick={() => handleNavigation('experience')}
                  className="w-full bg-gradient-to-r from-purple-500 to-violet-500 text-white hover:from-purple-600 hover:to-violet-600 py-4 rounded-2xl font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  View Experience
                </button>
              )}
              {data.education && data.education.length > 0 && (
                <button
                  onClick={() => handleNavigation('education')}
                  className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 py-4 rounded-2xl font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  View Education
                </button>
              )}
              {data.projects && data.projects.length > 0 && (
                <button
                  onClick={() => handleNavigation('projects')}
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 py-4 rounded-2xl font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  View Projects
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Work Together?</h3>
          <p className="text-lg mb-6 opacity-90">Let's create something amazing together!</p>
          {data.email && (
            <a
              href={`mailto:${data.email}`}
              className="bg-white text-purple-600 hover:text-purple-800 px-8 py-3 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block"
            >
              Get In Touch
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
