import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

interface ExperiencePageProps {
  data: PortfolioFormData;
}

const ExperiencePage: React.FC<ExperiencePageProps> = ({ data }) => {
  const hasExperience = data.experience && data.experience.length > 0;

  const handleNavigation = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Briefcase className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">
              Professional Experience
            </h1>
          </div>
          <p className="text-gray-600 text-lg font-light max-w-3xl mx-auto">
            A comprehensive overview of my professional journey, roles, and accomplishments.
          </p>
        </div>
      </div>

      {hasExperience ? (
        <div className="space-y-8">
          {/* Experience Timeline */}
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              
              <div className="space-y-12">
                {data.experience!.map((exp, index) => (
                  <div key={index} className="relative flex gap-8 group">
                    {/* Timeline Dot */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                        <Briefcase className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                          <h4 className="text-xl font-semibold text-blue-600 mb-4">{exp.company}</h4>
                          <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span className="font-medium">Duration</span>
                            </div>
                            <p className="font-semibold text-blue-600">{exp.dates}</p>
                          </div>
                          
                          {exp.location && (
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span className="font-medium">Location</span>
                              </div>
                              <p className="font-semibold text-gray-800">{exp.location}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Summary */}
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center pb-2 border-b-2 border-blue-600">
              Career Highlights
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">{data.experience!.length}</h3>
                <p className="text-gray-700 font-medium">
                  {data.experience!.length === 1 ? 'Position' : 'Positions'}
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="text-3xl font-bold text-green-600 mb-2">
                  {new Set(data.experience!.map(exp => exp.company)).size}
                </h3>
                <p className="text-gray-700 font-medium">
                  {new Set(data.experience!.map(exp => exp.company)).size === 1 ? 'Company' : 'Companies'}
                </p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="text-3xl font-bold text-purple-600 mb-2">
                  {new Set(data.experience!.map(exp => exp.location).filter(Boolean)).size}
                </h3>
                <p className="text-gray-700 font-medium">
                  {new Set(data.experience!.map(exp => exp.location).filter(Boolean)).size === 1 ? 'Location' : 'Locations'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-serif font-bold text-gray-600 mb-2">No Experience Added</h3>
          <p className="text-gray-500">Add your professional experience to showcase your career journey.</p>
        </div>
      )}

      {/* Quick Navigation */}
      <div className="mt-8 bg-white shadow-md border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-4 text-center">
          Continue Exploring
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleNavigation('about')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            About Me
          </button>
          <button
            onClick={() => handleNavigation('education')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Education
          </button>
          <button
            onClick={() => handleNavigation('projects')}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
