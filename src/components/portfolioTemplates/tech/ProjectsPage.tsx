import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Code, Terminal, ExternalLink, Github, Folder, GitBranch, Star, Eye } from 'lucide-react';

interface ProjectsPageProps {
  data: PortfolioFormData;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ data }) => {
  if (!data.projects || data.projects.length === 0) {
    return (
      <div className="space-y-4 md:space-y-8">
        <div className="bg-black rounded-lg p-4 md:p-6 border border-green-500">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Terminal className="w-4 h-4 md:w-6 md:h-6 text-green-400" />
            <span className="text-green-400 text-sm md:text-base">ls /projects/</span>
          </div>
          <div className="text-red-400 text-sm md:text-base">No projects found in current directory</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Page Header */}
      <div className="bg-black rounded-lg p-4 md:p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Terminal className="w-4 h-4 md:w-6 md:h-6 text-green-400" />
          <span className="text-green-400 text-sm md:text-base">ls -la /projects/</span>
        </div>
        <div className="space-y-1 md:space-y-2 text-green-300 text-xs md:text-sm">
          <div>Scanning project repositories...</div>
          <div>Found {data.projects.length} active projects</div>
          <div className="text-green-400">✓ Project scan completed successfully</div>
        </div>
      </div>

      {/* Git Repository List */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <GitBranch className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          <h2 className="text-lg md:text-xl font-bold text-white">git remote -v</h2>
        </div>
        <div className="bg-black p-3 md:p-4 rounded border border-gray-700">
          <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
            {data.projects.map((project, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 break-all">
                <span className="text-yellow-400 flex-shrink-0">origin</span>
                <span className="text-blue-400 break-all">
                  {project.link || `https://github.com/user/${project.name?.toLowerCase().replace(/\s+/g, '-')}.git`}
                </span>
                <span className="text-gray-400 flex-shrink-0">(fetch)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {data.projects.map((project, index) => (
          <div key={index} className="bg-gray-800 rounded-lg border border-green-500 overflow-hidden">
            {/* File Explorer Header */}
            <div className="bg-gray-700 px-3 md:px-4 py-2 border-b border-gray-600">
              <div className="flex items-center gap-2">
                <Folder className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" />
                <span className="text-white font-mono text-xs md:text-sm break-all">
                  {project.name?.toLowerCase().replace(/\s+/g, '-') || `project-${index + 1}`}/
                </span>
              </div>
            </div>

            <div className="p-4 md:p-6">
              {/* Project Header */}
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 break-words">{project.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{Math.floor(Math.random() * 50) + 1}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3 md:w-4 md:h-4" />
                      <span>{Math.floor(Math.random() * 100) + 10}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitBranch className="w-3 h-3 md:w-4 md:h-4" />
                      <span>main</span>
                    </div>
                  </div>
                </div>
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-green-400 hover:text-green-300 transition-colors ml-2 flex-shrink-0"
                  >
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                )}
              </div>

              {/* README.md Simulation */}
              <div className="bg-black p-3 md:p-4 rounded border border-gray-700 mb-3 md:mb-4">
                <div className="flex items-center gap-2 mb-2 md:mb-3">
                  <Code className="w-3 h-3 md:w-4 md:h-4 text-green-400" />
                  <span className="text-green-400 text-xs md:text-sm">README.md</span>
                </div>
                <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                  <div className="text-green-400"># {project.name}</div>
                  <div className="text-gray-300 leading-relaxed break-words">
                    {project.description}
                  </div>
                </div>
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="mb-4">
                  <div className="text-green-400 text-sm mb-2">package.json dependencies:</div>
                  <div className="bg-black p-3 rounded border border-gray-700">
                    <div className="text-green-400 text-xs mb-2">{'{'}</div>
                    <div className="pl-2 space-y-1">
                      <div className="text-blue-400 text-xs">"dependencies": {'{'}</div>
                      <div className="pl-4 space-y-1">
                        {project.technologies.filter(tech => tech.trim()).map((tech, techIndex) => (
                          <div key={techIndex} className="text-xs">
                            <span className="text-yellow-400">"{tech.toLowerCase()}"</span>
                            <span className="text-white">: </span>
                            <span className="text-green-300">"^{Math.floor(Math.random() * 5) + 1}.{Math.floor(Math.random() * 10)}.{Math.floor(Math.random() * 10)}"</span>
                            {techIndex < project.technologies.filter(t => t.trim()).length - 1 && <span className="text-white">,</span>}
                          </div>
                        ))}
                      </div>
                      <div className="text-blue-400 text-xs">{'}'}</div>
                    </div>
                    <div className="text-green-400 text-xs">{'}'}</div>
                  </div>
                </div>
              )}

              {/* Git Commands */}
              <div className="bg-black p-3 rounded border border-gray-700 mb-4">
                <div className="space-y-1 text-xs">
                  <div className="text-green-400">$ git status</div>
                  <div className="text-gray-300">On branch main</div>
                  <div className="text-gray-300">Your branch is up to date with 'origin/main'.</div>
                  <div className="text-gray-300">nothing to commit, working tree clean</div>
                  <div className="text-green-400 mt-2">$ git log --oneline -3</div>
                  <div className="text-yellow-400">{Math.random().toString(16).substr(2, 7)} feat: add new features</div>
                  <div className="text-yellow-400">{Math.random().toString(16).substr(2, 7)} fix: resolve performance issues</div>
                  <div className="text-yellow-400">{Math.random().toString(16).substr(2, 7)} docs: update documentation</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-600 text-black px-3 py-2 rounded text-sm font-medium hover:bg-green-500 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live
                  </a>
                )}
                <button className="flex items-center gap-2 bg-gray-700 text-green-400 px-3 py-2 rounded text-sm font-medium hover:bg-gray-600 transition-colors border border-gray-600">
                  <Github className="w-4 h-4" />
                  Source Code
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Statistics */}
      <div className="bg-gray-800 rounded-lg p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold text-white">project_stats.py</h3>
        </div>
        <div className="bg-black p-4 rounded border border-gray-700">
          <div className="space-y-2 text-sm">
            <div className="text-green-400">#!/usr/bin/env python3</div>
            <div className="text-gray-400"># Project portfolio statistics</div>
            <div className="text-white">
              import collections
            </div>
            <div className="text-white mt-2">
              total_projects = <span className="text-yellow-400">{data.projects.length}</span>
            </div>
            <div className="text-white">
              technologies_used = [
              {data.projects.flatMap(p => p.technologies || []).filter(tech => tech.trim()).slice(0, 10).map((tech, index, arr) => (
                <div key={index} className="pl-4 text-yellow-400">
                  "{tech}"{index < arr.length - 1 ? ',' : ''}
                </div>
              ))}
              ]
            </div>
            <div className="text-white mt-2">
              tech_count = collections.Counter(technologies_used)
            </div>
            <div className="text-white">
              print(f"Portfolio: {'{'}{'{'}total_projects{'}'} projects using {'{'}{'{'}len(set(technologies_used)){'}'} different technologies")
            </div>
            <div className="text-gray-400 mt-2">
              # Output: Portfolio: {data.projects.length} projects using {new Set(data.projects.flatMap(p => p.technologies || []).filter(tech => tech.trim())).size} different technologies
            </div>
          </div>
        </div>
      </div>

      {/* Technology Cloud */}
      <div className="bg-gray-800 rounded-lg p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold text-white">tech_stack.json</h3>
        </div>
        <div className="bg-black p-4 rounded border border-gray-700">
          <div className="text-green-400 mb-2">{'{'}</div>
          <div className="pl-4">
            <div className="text-blue-400">"technologies": [</div>
            <div className="pl-4 flex flex-wrap gap-2 py-2">
              {Array.from(new Set(data.projects.flatMap(p => p.technologies || []).filter(tech => tech.trim()))).map((tech, index) => (
                <span key={index} className="bg-gray-700 text-green-300 px-2 py-1 rounded text-sm border border-green-600">
                  {tech}
                </span>
              ))}
            </div>
            <div className="text-blue-400">]</div>
          </div>
          <div className="text-green-400">{'}'}</div>
        </div>
      </div>

      {/* Command Reference */}
      <div className="bg-black rounded-lg p-6 border border-green-500">
        <div className="text-green-400 mb-4">Available commands in /projects:</div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div><span className="text-green-500">$ git clone {'<url>'}</span> <span className="text-gray-400"># Clone repository</span></div>
            <div><span className="text-green-500">$ npm install</span> <span className="text-gray-400"># Install dependencies</span></div>
            <div><span className="text-green-500">$ npm run build</span> <span className="text-gray-400"># Build project</span></div>
          </div>
          <div className="space-y-2">
            <div><span className="text-green-500">$ cd ../experience</span> <span className="text-gray-400"># Navigate to experience</span></div>
            <div><span className="text-green-500">$ cd ../education</span> <span className="text-gray-400"># Navigate to education</span></div>
            <div><span className="text-green-500">$ cd ../home</span> <span className="text-gray-400"># Return to homepage</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
