import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Code, ExternalLink, Github, Zap, Star, Lightbulb, Rocket, Target } from 'lucide-react';

interface ProjectsPageProps {
  data: PortfolioFormData;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ data }) => {
  // Navigation function
  const handleNavigation = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  // If no projects data, show empty state
  if (!data.projects || data.projects.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="text-center py-16">
          <Code className="w-24 h-24 mx-auto text-gray-400 mb-6" />
          <h2 className="text-3xl font-bold text-gray-600 mb-4">No Projects Listed</h2>
          <p className="text-gray-500 mb-8">Project portfolio will appear here when available.</p>
          <button
            onClick={() => handleNavigation('home')}
            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-8 py-3 rounded-full font-medium hover:from-cyan-600 hover:to-teal-600 transition-all"
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
          <Code className="w-12 h-12 text-cyan-500" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
            Creative Projects
          </h1>
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          A showcase of innovative solutions, creative implementations, and technical achievements.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {data.projects.map((project, index) => (
          <div
            key={index}
            className="group relative bg-white/70 backdrop-blur-lg shadow-xl border border-cyan-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400 to-teal-400 opacity-20 rounded-full -translate-y-12 translate-x-12"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 opacity-20 rounded-full translate-y-8 -translate-x-8"></div>
            
            <div className="relative z-10">
              {/* Project Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-full font-medium text-sm shadow-lg">
                  <Rocket className="w-4 h-4" />
                  Project #{index + 1}
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/50 backdrop-blur-sm border border-cyan-200 hover:border-cyan-300 text-cyan-600 hover:text-cyan-800 p-3 rounded-full transition-all transform hover:scale-110 shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* Project Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-cyan-600 transition-colors">
                {project.name}
              </h3>

              {/* Project Description */}
              <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <h5 className="text-lg font-semibold text-gray-900">Project Overview</h5>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Technologies Used */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 text-purple-500" />
                    <h5 className="text-lg font-semibold text-gray-900">Technologies Used</h5>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.filter(tech => tech.trim()).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
                  <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Problem Solving</p>
                </div>
                <div className="text-center bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4">
                  <Zap className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Innovation</p>
                </div>
                <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4">
                  <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Excellence</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Statistics */}
      <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-cyan-200 rounded-3xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Project Portfolio Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center bg-white/50 backdrop-blur-sm border border-cyan-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{data.projects.length}</h3>
            <p className="text-gray-600 font-medium">Total Projects</p>
          </div>
          
          <div className="text-center bg-white/50 backdrop-blur-sm border border-purple-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {data.projects.reduce((count, project) => 
                count + (project.technologies?.filter(tech => tech.trim()).length || 0), 0
              )}
            </h3>
            <p className="text-gray-600 font-medium">Technologies Used</p>
          </div>
          
          <div className="text-center bg-white/50 backdrop-blur-sm border border-blue-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {data.projects.filter(project => project.link).length}
            </h3>
            <p className="text-gray-600 font-medium">Live Projects</p>
          </div>
          
          <div className="text-center bg-white/50 backdrop-blur-sm border border-green-200 rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
            <p className="text-gray-600 font-medium">Completion Rate</p>
          </div>
        </div>
      </div>

      {/* Featured Technologies */}
      <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-purple-200 rounded-3xl p-8 mb-12">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Featured Technologies</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from(new Set(
            data.projects
              .flatMap(project => project.technologies || [])
              .filter(tech => tech.trim())
          )).slice(0, 12).map((tech, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Innovation Showcase */}
      <div className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 rounded-3xl p-8 text-white mb-12">
        <div className="text-center">
          <Rocket className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h3 className="text-3xl font-bold mb-4">Innovation & Creativity</h3>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Each project represents a unique solution to real-world problems, demonstrating technical expertise, 
            creative problem-solving, and a commitment to building meaningful applications.
          </p>
          
          {/* Innovation highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Lightbulb className="w-10 h-10 mx-auto mb-3 text-yellow-300" />
              <h4 className="text-lg font-bold mb-2">Creative Solutions</h4>
              <p className="text-sm opacity-90">Innovative approaches to complex challenges</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Code className="w-10 h-10 mx-auto mb-3 text-cyan-300" />
              <h4 className="text-lg font-bold mb-2">Technical Excellence</h4>
              <p className="text-sm opacity-90">Clean, efficient, and maintainable code</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <Target className="w-10 h-10 mx-auto mb-3 text-green-300" />
              <h4 className="text-lg font-bold mb-2">Goal Achievement</h4>
              <p className="text-sm opacity-90">Successful delivery of project objectives</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <div className="bg-white/70 backdrop-blur-lg shadow-xl border border-cyan-200 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Interested in Collaboration?</h3>
          <p className="text-lg text-gray-700 mb-6">Let's work together to bring your ideas to life!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleNavigation('about')}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:from-cyan-600 hover:to-teal-600 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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
            {data.education && data.education.length > 0 && (
              <button
                onClick={() => handleNavigation('education')}
                className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Education
              </button>
            )}
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block"
              >
                Contact Me
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
