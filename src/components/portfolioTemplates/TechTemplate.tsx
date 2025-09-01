import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Code, Terminal, Cpu, Database } from 'lucide-react';

interface TechTemplateProps {
  data: PortfolioFormData;
}

const TechTemplate: React.FC<TechTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      <div className="max-w-6xl mx-auto p-8">
        {/* Terminal Header */}
        <div className="bg-gray-800 rounded-t-lg p-4 border-b border-green-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-4 text-green-400">portfolio@{data.name?.toLowerCase().replace(/\s+/g, '-') || 'user'}:~$</span>
          </div>
        </div>

        {/* Main Terminal Content */}
        <div className="bg-black rounded-b-lg p-8 shadow-2xl">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6 text-green-400" />
              <span className="text-green-400">cat portfolio.json</span>
            </div>
            <div className="pl-8 border-l-2 border-green-500">
              <h1 className="text-4xl font-bold text-white mb-2">{data.name}</h1>
              <div className="space-y-1 mb-4">
                {data.email && (
                  <div className="flex items-center gap-2 text-green-300">
                    <Mail className="w-4 h-4" />
                    <span>{data.email}</span>
                  </div>
                )}
                {data.phone && (
                  <div className="flex items-center gap-2 text-green-300">
                    <Phone className="w-4 h-4" />
                    <span>{data.phone}</span>
                  </div>
                )}
                {data.location && (
                  <div className="flex items-center gap-2 text-green-300">
                    <MapPin className="w-4 h-4" />
                    <span>{data.location}</span>
                  </div>
                )}
              </div>
              {data.summary && (
                <p className="text-gray-300 leading-relaxed">{data.summary}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Skills */}
              {data.skills && data.skills.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="w-5 h-5 text-green-400" />
                    <h2 className="text-xl font-bold text-white">skills.json</h2>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border border-green-500">
                    <div className="space-y-2">
                      {data.skills.filter(skill => skill.trim()).map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-green-500">{'>'}</span>
                          <span className="text-green-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Languages */}
              {data.languages && data.languages.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="w-5 h-5 text-green-400" />
                    <h2 className="text-xl font-bold text-white">languages.db</h2>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border border-green-500">
                    <div className="space-y-2">
                      {data.languages.filter(lang => lang.trim()).map((language, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-green-500">*</span>
                          <span className="text-green-300">{language}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Social Links */}
              {(data.socialLinks?.linkedin || data.socialLinks?.github || data.socialLinks?.portfolio) && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <ExternalLink className="w-5 h-5 text-green-400" />
                    <h2 className="text-xl font-bold text-white">links.config</h2>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border border-green-500 space-y-2">
                    {data.socialLinks?.linkedin && (
                      <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                        <Linkedin className="w-4 h-4" />
                        <span>linkedin</span>
                      </a>
                    )}
                    {data.socialLinks?.github && (
                      <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-2 text-gray-400 hover:text-gray-300">
                        <Github className="w-4 h-4" />
                        <span>github</span>
                      </a>
                    )}
                    {data.socialLinks?.portfolio && (
                      <a href={data.socialLinks.portfolio} target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-2 text-purple-400 hover:text-purple-300">
                        <ExternalLink className="w-4 h-4" />
                        <span>portfolio</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Experience */}
              {data.experience && data.experience.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Cpu className="w-5 h-5 text-green-400" />
                    <h2 className="text-2xl font-bold text-white">work_experience.log</h2>
                  </div>
                  <div className="space-y-6">
                    {data.experience.map((exp, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-6 border border-green-500">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                            <p className="text-green-400">{exp.company}</p>
                          </div>
                          <div className="text-right text-sm text-gray-400">
                            {exp.location && <p>{exp.location}</p>}
                            <p>{exp.dates}</p>
                          </div>
                        </div>
                        <div className="text-gray-300 leading-relaxed">
                          <span className="text-green-500">$ </span>
                          {exp.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {data.projects && data.projects.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Code className="w-5 h-5 text-green-400" />
                    <h2 className="text-2xl font-bold text-white">projects/</h2>
                  </div>
                  <div className="grid gap-6">
                    {data.projects.map((project, index) => (
                      <div key={index} className="bg-gray-800 rounded-lg p-6 border border-green-500">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-white">{project.name}</h3>
                          {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                               className="text-green-400 hover:text-green-300">
                              <ExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                        <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                        {project.technologies && project.technologies.length > 0 && (
                          <div>
                            <p className="text-green-400 mb-2">Tech Stack:</p>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.filter(tech => tech.trim()).map((tech, techIndex) => (
                                <span key={techIndex} className="bg-gray-700 text-green-300 px-3 py-1 rounded text-sm border border-green-600">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {data.education && data.education.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Database className="w-5 h-5 text-green-400" />
                    <h2 className="text-2xl font-bold text-white">education.sql</h2>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-6 border border-green-500">
                    {data.education.map((edu, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="text-green-400">SELECT * FROM education WHERE id = {index + 1};</div>
                        <div className="pl-4 mt-2 space-y-1">
                          <p className="text-white">degree: <span className="text-green-300">"{edu.degree}"</span></p>
                          <p className="text-white">institution: <span className="text-green-300">"{edu.institution}"</span></p>
                          {edu.location && <p className="text-white">location: <span className="text-green-300">"{edu.location}"</span></p>}
                          <p className="text-white">dates: <span className="text-green-300">"{edu.dates}"</span></p>
                          {edu.gpa && <p className="text-white">gpa: <span className="text-green-300">"{edu.gpa}"</span></p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {data.certifications && data.certifications.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Terminal className="w-5 h-5 text-green-400" />
                    <h2 className="text-2xl font-bold text-white">certifications.sh</h2>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-6 border border-green-500">
                    <div className="space-y-4">
                      {data.certifications.map((cert, index) => (
                        <div key={index}>
                          <div className="text-green-400">#!/bin/bash</div>
                          <div className="text-green-300"># {cert.name}</div>
                          <div className="text-white">echo "Certified by: {cert.issuer}"</div>
                          <div className="text-white">echo "Date: {cert.date}"</div>
                          {index < data.certifications.length - 1 && (
                            <div className="border-t border-gray-700 my-4"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="text-green-500">
            portfolio@{data.name?.toLowerCase().replace(/\s+/g, '-') || 'user'}:~$ <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechTemplate;
