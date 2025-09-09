import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Code, ExternalLink, Github, Folder, Star, Zap, ChevronRight, Rocket } from 'lucide-react';

interface ProjectsPageProps {
  data: PortfolioFormData;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ data }) => {
  // Navigation function
  const handleNavigation = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  if (!data.projects || data.projects.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-12 text-center">
          <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Projects Added</h2>
          <p className="text-gray-600">Project information will appear here once added.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="bg-white/90 backdrop-blur-md shadow-2xl border border-blue-200 rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-400/10 to-red-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-orange-400/10 rounded-full blur-2xl"></div>
        
        <div className="relative text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-2xl">
            <Rocket className="w-10 h-10" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            Featured Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of innovative solutions and creative implementations that demonstrate my technical skills
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-8">
        {data.projects.map((project, index) => (
          <div key={index} className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            {/* Project Header */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-200 p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                      <Folder className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-orange-500 mb-4">
                    <Star className="w-5 h-5" />
                    <span className="font-medium">Featured Project #{index + 1}</span>
                  </div>
                </div>
                
                {/* Project Links */}
                <div className="flex gap-3">
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
                      title="View Project"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {/* If GitHub link is in the project link, show GitHub icon */}
                  {project.link && project.link.includes('github.com') && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all duration-300 transform hover:scale-110 shadow-lg"
                      title="View on GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-8">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-500" />
                  Project Overview
                </h4>
                <p className="text-gray-700 text-lg leading-relaxed">{project.description}</p>
              </div>

              {/* Technologies Used */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Code className="w-5 h-5 text-blue-500" />
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.filter(tech => tech.trim()).map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="text-sm font-medium">Project Progress</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  </div>
                  <span className="text-sm font-medium text-green-600">Complete</span>
                </div>
                
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium group-hover:translate-x-1 transition-all duration-300"
                  >
                    <span>Explore Project</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects Summary Stats */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
            {data.projects.length}
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Total Projects</h3>
          <p className="text-gray-600">Completed implementations</p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <Code className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Technologies</h3>
          <p className="text-gray-600">
            {data.projects.reduce((acc, project) => 
              acc + (project.technologies?.length || 0), 0
            )} total used
          </p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-6 text-center hover:shadow-2xl transition-shadow">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
            <Star className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">Innovation</h3>
          <p className="text-gray-600">Creative solutions delivered</p>
        </div>
      </div>

      {/* Skills Showcase from Projects */}
      {data.skills && data.skills.length > 0 && (
        <div className="mt-12 bg-white/90 backdrop-blur-md shadow-xl border border-blue-200 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            Skills Demonstrated
          </h2>
          <p className="text-gray-600 mb-6">Key technical skills showcased across these projects</p>
          <div className="flex flex-wrap gap-3">
            {data.skills.slice(0, 12).filter(skill => skill.trim()).map((skill, index) => (
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

      {/* Navigation Prompt */}
      <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Interested in Working Together?</h3>
        <p className="text-gray-600 mb-6">Let's discuss how I can contribute to your next project</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleNavigation('about')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Learn More About Me
          </button>
          {data.experience && data.experience.length > 0 && (
            <button
              onClick={() => handleNavigation('experience')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View Experience
            </button>
          )}
          <button
            onClick={() => handleNavigation('home')}
            className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
