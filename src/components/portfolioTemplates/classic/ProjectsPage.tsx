import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Code, ExternalLink, Github, Folder, Tag } from 'lucide-react';

interface ProjectsPageProps {
  data: PortfolioFormData;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ data }) => {
  const hasProjects = data.projects && data.projects.length > 0;

  const handleNavigation = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="bg-white shadow-lg border border-gray-200 rounded-lg p-8 mb-8 hover:shadow-xl transition-shadow duration-300">
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Code className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">
              Projects
            </h1>
          </div>
          <p className="text-gray-600 text-lg font-light max-w-3xl mx-auto">
            A showcase of my creative work, technical projects, and innovative solutions I've built.
          </p>
        </div>
      </div>

      {hasProjects ? (
        <div className="space-y-8">
          {/* Projects Summary */}
          <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center pb-2 border-b-2 border-purple-600">
              Project Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-purple-50 rounded-lg">
                <h3 className="text-3xl font-bold text-purple-600 mb-2">{data.projects!.length}</h3>
                <p className="text-gray-700 font-medium">
                  {data.projects!.length === 1 ? 'Project' : 'Projects'}
                </p>
              </div>
              <div className="p-6 bg-blue-50 rounded-lg">
                <h3 className="text-3xl font-bold text-blue-600 mb-2">
                  {data.projects!.filter(project => project.link).length}
                </h3>
                <p className="text-gray-700 font-medium">Live Projects</p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg">
                <h3 className="text-3xl font-bold text-green-600 mb-2">
                  {data.projects!.reduce((total, project) => 
                    total + (project.technologies ? project.technologies.filter(tech => tech.trim()).length : 0), 0
                  )}
                </h3>
                <p className="text-gray-700 font-medium">Technologies Used</p>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects!.map((project, index) => (
              <div key={index} className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                {/* Project Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Folder className="w-6 h-6" />
                      <h3 className="text-xl font-bold truncate">{project.name}</h3>
                    </div>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/20 rounded-lg"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <p className="text-gray-700 leading-relaxed mb-4 min-h-[4rem]">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Tag className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-semibold text-gray-600">Technologies</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.filter(tech => tech.trim()).map((tech, techIndex) => (
                          <span 
                            key={techIndex} 
                            className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium hover:bg-purple-200 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Project Actions */}
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm flex-1 justify-center"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </a>
                    )}
                    {project.link && project.link.includes('github') && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors font-medium text-sm"
                      >
                        <Github className="w-4 h-4" />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Project (First project gets special treatment) */}
          {data.projects!.length > 0 && (
            <div className="bg-white shadow-md border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 text-center pb-2 border-b-2 border-purple-600">
                Featured Project
              </h2>
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Folder className="w-8 h-8 text-purple-600" />
                      <h3 className="text-3xl font-bold text-gray-900">{data.projects![0].name}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      {data.projects![0].description}
                    </p>
                    
                    {data.projects![0].technologies && data.projects![0].technologies.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-3">
                          {data.projects![0].technologies.filter(tech => tech.trim()).map((tech, techIndex) => (
                            <span 
                              key={techIndex} 
                              className="bg-white text-purple-800 px-4 py-2 rounded-lg font-medium shadow-sm border border-purple-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    {data.projects![0].link && (
                      <a 
                        href={data.projects![0].link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
                      >
                        <ExternalLink className="w-6 h-6" />
                        View Live Project
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-12 text-center">
          <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-serif font-bold text-gray-600 mb-2">No Projects Added</h3>
          <p className="text-gray-500">Add your projects to showcase your technical skills and creativity.</p>
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
            onClick={() => handleNavigation('education')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Education
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
