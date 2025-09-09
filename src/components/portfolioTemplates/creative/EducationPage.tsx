import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { GraduationCap, MapPin, Calendar, Award, BookOpen, Star, Trophy } from 'lucide-react';

interface EducationPageProps {
  data: PortfolioFormData;
}

const EducationPage: React.FC<EducationPageProps> = ({ data }) => {
  // Navigation function
  const handleNavigation = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  // If no education data, show empty state
  if (!data.education || data.education.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="text-center py-16">
          <GraduationCap className="w-24 h-24 mx-auto text-gray-400 mb-6" />
          <h2 className="text-3xl font-bold text-gray-600 mb-4">No Education Listed</h2>
          <p className="text-gray-500 mb-8">Educational background will appear here when available.</p>
          <button
            onClick={() => handleNavigation('home')}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-8 py-3 rounded-full font-medium hover:from-indigo-600 hover:to-blue-600 transition-all"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-6">
          <GraduationCap className="w-12 h-12 text-indigo-500" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Educational Journey
          </h1>
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Academic achievements and educational milestones that shaped my knowledge and expertise.
        </p>
      </div>

      {/* Education Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-blue-500 to-purple-500 rounded-full hidden md:block"></div>

        <div className="space-y-12">
          {data.education.map((edu, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-4 top-8 w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full border-4 border-white shadow-lg hidden md:flex items-center justify-center z-10">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>

              {/* Education Card */}
              <div className="md:ml-20 relative">
                <div className="group bg-white/70 backdrop-blur-lg shadow-xl border border-indigo-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-400 to-blue-400 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 rounded-full translate-y-8 -translate-x-8"></div>
                  
                  <div className="relative z-10">
                    {/* Education Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-full font-medium text-sm mb-4 shadow-lg">
                      <BookOpen className="w-4 h-4" />
                      Education #{(data.education?.length || 0) - index}
                    </div>

                    {/* Degree */}
                    <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {edu.degree}
                    </h3>

                    {/* Institution */}
                    <h4 className="text-2xl font-semibold text-indigo-600 mb-4">
                      {edu.institution}
                    </h4>

                    {/* Education Details */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      {edu.location && (
                        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200">
                          <MapPin className="w-5 h-5 text-indigo-500" />
                          <span className="text-gray-700 font-medium">{edu.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200">
                        <Calendar className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-700 font-medium">{edu.dates}</span>
                      </div>
                      {edu.gpa && (
                        <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                          <Trophy className="w-5 h-5" />
                          <span className="font-medium">GPA: {edu.gpa}</span>
                        </div>
                      )}
                    </div>

                    {/* Academic Achievement Highlights */}
                    <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <h5 className="text-lg font-semibold text-gray-900">Academic Excellence</h5>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                          <BookOpen className="w-8 h-8 text-green-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-700">Knowledge Acquired</p>
                        </div>
                        <div className="text-center bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                          <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-700">Academic Achievements</p>
                        </div>
                        <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                          <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-700">Skills Developed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Statistics */}
      <div className="mt-16 bg-white/70 backdrop-blur-lg shadow-xl border border-indigo-200 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Educational Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center bg-white/50 backdrop-blur-sm border border-indigo-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{data.education.length}</h3>
            <p className="text-gray-600 font-medium">Degree{data.education.length !== 1 ? 's' : ''} Earned</p>
          </div>
          
          <div className="text-center bg-white/50 backdrop-blur-sm border border-blue-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {new Set(data.education.map(edu => edu.institution)).size}
            </h3>
            <p className="text-gray-600 font-medium">Institution{new Set(data.education.map(edu => edu.institution)).size !== 1 ? 's' : ''} Attended</p>
          </div>
          
          <div className="text-center bg-white/50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {data.education.filter(edu => edu.gpa).length || 'Multiple'}
            </h3>
            <p className="text-gray-600 font-medium">Academic Records</p>
          </div>
        </div>
      </div>

      {/* Academic Excellence Section */}
      <div className="mt-12 bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 rounded-3xl p-8 text-white">
        <div className="text-center">
          <Trophy className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h3 className="text-3xl font-bold mb-4">Commitment to Learning</h3>
          <p className="text-xl mb-6 opacity-90 max-w-3xl mx-auto">
            My educational journey reflects a dedication to continuous learning and academic excellence, 
            building the foundation for professional success and innovation.
          </p>
          
          {/* Highlight achievements */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Star className="w-10 h-10 mx-auto mb-3 text-yellow-300" />
              <h4 className="text-lg font-bold mb-2">Academic Excellence</h4>
              <p className="text-sm opacity-90">Strived for high standards in all coursework</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-blue-300" />
              <h4 className="text-lg font-bold mb-2">Knowledge Pursuit</h4>
              <p className="text-sm opacity-90">Continuously expanding expertise and skills</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Award className="w-10 h-10 mx-auto mb-3 text-green-300" />
              <h4 className="text-lg font-bold mb-2">Goal Achievement</h4>
              <p className="text-sm opacity-90">Successfully completed all educational milestones</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 text-center">
        <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-indigo-200 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Continue Exploring</h3>
          <p className="text-lg text-gray-700 mb-6">Discover more about my professional journey</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleNavigation('about')}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              About Me
            </button>
            {data.experience && data.experience.length > 0 && (
              <button
                onClick={() => handleNavigation('experience')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Experience
              </button>
            )}
            {data.projects && data.projects.length > 0 && (
              <button
                onClick={() => handleNavigation('projects')}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Projects
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
