import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin } from 'lucide-react';

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
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-6 md:p-8 mb-6 md:mb-8 hover:shadow-xl transition-shadow duration-300">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
            About {data.name.split(' ')[0]}
          </h1>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 text-gray-600 mb-6">
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
              <div className="flex items-center gap-3 hover:text-gray-800 transition-colors">
                <MapPin className="w-6 h-6 text-red-600" />
                <span className="font-medium text-lg">{data.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* About Me Summary */}
        {data.summary && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center pb-2 border-b-2 border-blue-600">
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg font-light text-center mb-8">
              {data.summary}
            </p>
          </div>
        )}

        {/* Social Links */}
        {(data.socialLinks?.linkedin || data.socialLinks?.github || data.socialLinks?.portfolio) && (
          <div className="flex flex-wrap justify-center gap-6 pt-6 border-t border-gray-200">
            {data.socialLinks?.linkedin && (
              <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-lg">
                <Linkedin className="w-6 h-6" />
                LinkedIn
              </a>
            )}
            {data.socialLinks?.github && (
              <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-lg">
                <Github className="w-6 h-6" />
                GitHub
              </a>
            )}
            {data.socialLinks?.portfolio && (
              <a href={data.socialLinks.portfolio} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 text-purple-600 hover:text-purple-800 hover:bg-purple-50 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-lg">
                <ExternalLink className="w-6 h-6" />
                Portfolio
              </a>
            )}
          </div>
        )}
      </div>

      {/* Skills, Languages, and Certifications Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Skills */}
        {hasSkills && (
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b-2 border-blue-600 text-center">
              SKILLS
            </h2>
            <div className="space-y-3">
              {data.skills!.filter(skill => skill.trim()).map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {hasLanguages && (
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b-2 border-green-600 text-center">
              LANGUAGES
            </h2>
            <div className="space-y-3">
              {data.languages!.filter(lang => lang.trim()).map((language, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-3 h-3 bg-green-600 rounded-full flex-shrink-0"></div>
                  <span className="font-medium text-gray-700">{language}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {hasCertifications && (
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-serif font-bold text-gray-900 mb-6 pb-2 border-b-2 border-purple-600 text-center">
              CERTIFICATIONS
            </h2>
            <div className="space-y-4">
              {data.certifications!.map((cert, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <h3 className="font-semibold text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 font-medium">{cert.issuer}</p>
                  <p className="text-gray-500 text-sm">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick Navigation */}
      <div className="mt-8 bg-white shadow-md border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4 text-center">
          Explore More
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleNavigation('experience')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Experience
          </button>
          <button
            onClick={() => handleNavigation('education')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            View Education
          </button>
          <button
            onClick={() => handleNavigation('projects')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            View Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
