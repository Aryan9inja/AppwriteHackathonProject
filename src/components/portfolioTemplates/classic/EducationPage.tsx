import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';

interface EducationPageProps {
  data: PortfolioFormData;
}

const EducationPage: React.FC<EducationPageProps> = ({ data }) => {
  const hasEducation = data.education && data.education.length > 0;

  const handleNavigation = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-green-600" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">
              Education
            </h1>
          </div>
          <p className="text-gray-600 text-lg font-light max-w-3xl mx-auto">
            My academic journey and educational achievements that have shaped my knowledge and expertise.
          </p>
        </div>
      </div>

      {hasEducation ? (
        <div className="space-y-8">
          {/* Education Timeline */}
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-green-200"></div>
              
              <div className="space-y-12">
                {data.education!.map((edu, index) => (
                  <div key={index} className="relative flex gap-8 group">
                    {/* Timeline Dot */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-700 transition-colors">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                      <div className="grid md:grid-cols-3 gap-6">
                        <div className="md:col-span-2">
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{edu.degree}</h3>
                          <h4 className="text-xl font-semibold text-green-600 mb-4">{edu.institution}</h4>
                          {edu.gpa && (
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                              <Award className="w-4 h-4" />
                              GPA: {edu.gpa}
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                              <Calendar className="w-4 h-4" />
                              <span className="font-medium">Duration</span>
                            </div>
                            <p className="font-semibold text-green-600">{edu.dates}</p>
                          </div>
                          
                          {edu.location && (
                            <div className="bg-white p-4 rounded-lg shadow-sm">
                              <div className="flex items-center gap-2 text-gray-600 mb-2">
                                <MapPin className="w-4 h-4" />
                                <span className="font-medium">Location</span>
                              </div>
                              <p className="font-semibold text-gray-800">{edu.location}</p>
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

          {/* Education Summary */}
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center pb-2 border-b-2 border-green-600">
              Academic Highlights
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="text-3xl font-bold text-green-600 mb-2">{data.education!.length}</h3>
                <p className="text-gray-700 font-medium">
                  {data.education!.length === 1 ? 'Degree' : 'Degrees'}
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">
                  {new Set(data.education!.map(edu => edu.institution)).size}
                </h3>
                <p className="text-gray-700 font-medium">
                  {new Set(data.education!.map(edu => edu.institution)).size === 1 ? 'Institution' : 'Institutions'}
                </p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="text-3xl font-bold text-purple-600 mb-2">
                  {new Set(data.education!.map(edu => edu.location).filter(Boolean)).size}
                </h3>
                <p className="text-gray-700 font-medium">
                  {new Set(data.education!.map(edu => edu.location).filter(Boolean)).size === 1 ? 'Location' : 'Locations'}
                </p>
              </div>
              <div className="p-6 bg-orange-50 rounded-lg">
                <h3 className="text-3xl font-bold text-orange-600 mb-2">
                  {data.education!.filter(edu => edu.gpa).length}
                </h3>
                <p className="text-gray-700 font-medium">
                  {data.education!.filter(edu => edu.gpa).length === 1 ? 'GPA Listed' : 'GPAs Listed'}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Education Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {data.education!.map((edu, index) => (
              <div key={index} className="bg-white shadow-md border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{edu.degree}</h3>
                  <p className="text-green-600 font-semibold">{edu.institution}</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-gray-800">{edu.dates}</span>
                  </div>
                  
                  {edu.location && (
                    <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold text-gray-800">{edu.location}</span>
                    </div>
                  )}
                  
                  {edu.gpa && (
                    <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                      <span className="text-green-700">GPA:</span>
                      <span className="font-bold text-green-800">{edu.gpa}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-12 text-center">
          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-serif font-bold text-gray-600 mb-2">No Education Added</h3>
          <p className="text-gray-500">Add your educational background to showcase your academic achievements.</p>
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
            onClick={() => handleNavigation('experience')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Experience
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

export default EducationPage;
