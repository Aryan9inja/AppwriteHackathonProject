import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Briefcase, MapPin, Calendar, Building2, TrendingUp, ChevronRight } from 'lucide-react';

interface ExperiencePageProps {
  data: PortfolioFormData;
}

const ExperiencePage: React.FC<ExperiencePageProps> = ({ data }) => {
  // Navigation function
  const handleNavigation = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  if (!data.experience || data.experience.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-12 text-center">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Experience Added</h2>
          <p className="text-gray-600">Experience information will appear here once added.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="bg-white/90 backdrop-blur-md shadow-2xl border border-blue-200 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
        
        <div className="relative text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-2xl">
            <Briefcase className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Professional Experience
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            My journey through various roles and responsibilities that have shaped my professional growth
          </p>
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-8 md:p-12">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 rounded-full"></div>
          
          <div className="space-y-12">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-20">
                {/* Timeline Dot */}
                <div className="absolute -left-4 top-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                
                {/* Experience Card */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-5 h-5 text-purple-500" />
                        <span className="text-xl text-purple-600 font-semibold">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-purple-500 group-hover:text-purple-600 transition-colors">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-6">
                    {exp.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">{exp.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{exp.dates}</span>
                    </div>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50">
                    <p className="text-gray-700 leading-relaxed text-lg">{exp.description}</p>
                  </div>
                  
                  {/* Position Indicator */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-purple-500 font-medium">
                      Position #{(data.experience?.length || 0) - index}
                    </span>
                    <ChevronRight className="w-5 h-5 text-purple-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Summary Stats */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
            {data.experience.length}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Total Positions</h3>
          <p className="text-gray-600">Professional roles held</p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <Building2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Companies</h3>
          <p className="text-gray-600">Organizations worked with</p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Growth</h3>
          <p className="text-gray-600">Continuous professional development</p>
        </div>
      </div>

      {/* Navigation Prompt */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore More</h3>
        <p className="text-gray-600 mb-6">Discover my educational background and projects</p>
        <div className="flex flex-wrap justify-center gap-4">
          {data.education && data.education.length > 0 && (
            <button
              onClick={() => handleNavigation('education')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Education
            </button>
          )}
          {data.projects && data.projects.length > 0 && (
            <button
              onClick={() => handleNavigation('projects')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Projects
            </button>
          )}
          <button
            onClick={() => handleNavigation('about')}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            About Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
