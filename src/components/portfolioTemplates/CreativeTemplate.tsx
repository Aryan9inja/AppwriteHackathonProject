import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Star, Zap } from 'lucide-react';

interface CreativeTemplateProps {
  data: PortfolioFormData;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100">
      <div className="max-w-6xl mx-auto p-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 rounded-3xl p-8 mb-8 text-white overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-40 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-6xl font-bold backdrop-blur-sm">
                {data.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-bold mb-4">{data.name}</h1>
                <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
                  {data.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      <span>{data.email}</span>
                    </div>
                  )}
                  {data.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5" />
                      <span>{data.phone}</span>
                    </div>
                  )}
                  {data.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{data.location}</span>
                    </div>
                  )}
                </div>
                {data.summary && (
                  <p className="text-lg leading-relaxed opacity-90">{data.summary}</p>
                )}
              </div>
            </div>

            {/* Social Links */}
            {(data.socialLinks?.linkedin || data.socialLinks?.github || data.socialLinks?.portfolio) && (
              <div className="flex justify-center md:justify-start gap-4 mt-8">
                {data.socialLinks?.linkedin && (
                  <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 px-4 py-2 rounded-full transition-all">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {data.socialLinks?.github && (
                  <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"
                     className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 px-4 py-2 rounded-full transition-all">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {data.socialLinks?.portfolio && (
                  <a href={data.socialLinks.portfolio} target="_blank" rel="noopener noreferrer"
                     className="bg-white bg-opacity-20 backdrop-blur-sm hover:bg-opacity-30 px-4 py-2 rounded-full transition-all">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="md:col-span-4 space-y-6">
            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-pink-200">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-6 h-6 text-pink-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
                </div>
                <div className="space-y-3">
                  {data.skills.filter(skill => skill.trim()).map((skill, index) => (
                    <div key={index} className="relative">
                      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-center font-medium transform hover:scale-105 transition-transform">
                        {skill}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-indigo-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages</h2>
                <div className="space-y-2">
                  {data.languages.filter(lang => lang.trim()).map((language, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{language}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <div className="bg-white rounded-3xl p-6 shadow-lg border border-yellow-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Certifications</h2>
                <div className="space-y-4">
                  {data.certifications.map((cert, index) => (
                    <div key={index} className="relative p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                      <h3 className="font-bold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-600">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="md:col-span-8 space-y-8">
            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-7 h-7 text-purple-500" />
                  <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
                </div>
                <div className="space-y-8">
                  {data.experience.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-l-4 border-purple-500">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{exp.title}</h3>
                        <p className="text-xl text-purple-600 font-semibold mb-2">{exp.company}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                          {exp.location && <span className="bg-white px-2 py-1 rounded">{exp.location}</span>}
                          <span className="bg-white px-2 py-1 rounded">{exp.dates}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Education</h2>
                <div className="space-y-6">
                  {data.education.map((edu, index) => (
                    <div key={index} className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 border-l-4 border-indigo-500">
                      <h3 className="text-xl font-bold text-gray-900">{edu.degree}</h3>
                      <p className="text-lg text-indigo-600 font-semibold">{edu.institution}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                        {edu.location && <span className="bg-white px-2 py-1 rounded">{edu.location}</span>}
                        <span className="bg-white px-2 py-1 rounded">{edu.dates}</span>
                        {edu.gpa && <span className="bg-white px-2 py-1 rounded">GPA: {edu.gpa}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Projects</h2>
                <div className="grid gap-6">
                  {data.projects.map((project, index) => (
                    <div key={index} className="group relative bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                          {project.name}
                        </h3>
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer"
                             className="text-purple-600 hover:text-purple-800 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all">
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.filter(tech => tech.trim()).map((tech, techIndex) => (
                            <span key={techIndex} className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
