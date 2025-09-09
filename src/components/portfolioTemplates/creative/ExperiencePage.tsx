import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Briefcase, MapPin, Calendar, Zap, TrendingUp, Users, Target } from 'lucide-react';

interface ExperiencePageProps {
  data: PortfolioFormData;
}

const ExperiencePage: React.FC<ExperiencePageProps> = ({ data }) => {
  // Navigation function
  const handleNavigation = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  // If no experience data, show empty state
  if (!data.experience || data.experience.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="text-center py-16">
          <Briefcase className="w-24 h-24 mx-auto text-gray-400 mb-6" />
          <h2 className="text-3xl font-bold text-gray-600 mb-4">No Experience Listed</h2>
          <p className="text-gray-500 mb-8">Experience information will appear here when available.</p>
          <button
            onClick={() => handleNavigation('home')}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-full font-medium hover:from-purple-600 hover:to-indigo-600 transition-all"
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
          <Briefcase className="w-12 h-12 text-purple-500" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Professional Experience
          </h1>
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          A journey through my professional career, showcasing growth, achievements, and valuable contributions.
        </p>
      </div>

      {/* Experience Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-indigo-500 rounded-full hidden md:block"></div>

        <div className="space-y-12">
          {data.experience.map((exp, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute left-4 top-8 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-white shadow-lg hidden md:flex items-center justify-center z-10">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>

              {/* Experience Card */}
              <div className="md:ml-20 relative">
                <div className="group bg-white/70 backdrop-blur-lg shadow-xl border border-pink-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-indigo-400 to-cyan-400 opacity-20 rounded-full translate-y-8 -translate-x-8"></div>
                  
                  <div className="relative z-10">
                    {/* Company Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium text-sm mb-4 shadow-lg">
                      <Briefcase className="w-4 h-4" />
                      Experience #{(data.experience?.length || 0) - index}
                    </div>

                    {/* Job Title */}
                    <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {exp.title}
                    </h3>

                    {/* Company Name */}
                    <h4 className="text-2xl font-semibold text-purple-600 mb-4">
                      {exp.company}
                    </h4>

                    {/* Job Details */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      {exp.location && (
                        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200">
                          <MapPin className="w-5 h-5 text-pink-500" />
                          <span className="text-gray-700 font-medium">{exp.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-200">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <span className="text-gray-700 font-medium">{exp.dates}</span>
                      </div>
                    </div>

                    {/* Job Description */}
                    <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="w-5 h-5 text-indigo-500" />
                        <h5 className="text-lg font-semibold text-gray-900">Role & Responsibilities</h5>
                      </div>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {exp.description}
                      </p>
                    </div>

                    {/* Achievement highlights */}
                    <div className="mt-6 flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        <TrendingUp className="w-4 h-4" />
                        Growth
                      </div>
                      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        <Users className="w-4 h-4" />
                        Collaboration
                      </div>
                      <div className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                        <Zap className="w-4 h-4" />
                        Innovation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Statistics */}
      <div className="mt-16 bg-white/70 backdrop-blur-lg shadow-xl border border-pink-200 rounded-3xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Career Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center bg-white/50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{data.experience.length}</h3>
            <p className="text-gray-600 font-medium">Professional Role{data.experience.length !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="text-center bg-white/50 backdrop-blur-sm border border-indigo-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {new Set(data.experience.map(exp => exp.company)).size}
            </h3>
            <p className="text-gray-600 font-medium">Companies Worked With</p>
          </div>
          
          <div className="text-center bg-white/50 backdrop-blur-sm border border-cyan-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {new Set(data.experience.map(exp => exp.location).filter(Boolean)).size || 'Multiple'}
            </h3>
            <p className="text-gray-600 font-medium">Location{new Set(data.experience.map(exp => exp.location).filter(Boolean)).size !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Explore More</h3>
          <p className="text-lg mb-6 opacity-90">Discover other aspects of my professional journey</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleNavigation('about')}
              className="bg-white text-purple-600 hover:text-purple-800 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              About Me
            </button>
            {data.education && data.education.length > 0 && (
              <button
                onClick={() => handleNavigation('education')}
                className="bg-white text-indigo-600 hover:text-indigo-800 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Education
              </button>
            )}
            {data.projects && data.projects.length > 0 && (
              <button
                onClick={() => handleNavigation('projects')}
                className="bg-white text-cyan-600 hover:text-cyan-800 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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

export default ExperiencePage;
