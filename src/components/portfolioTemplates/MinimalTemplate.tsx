import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin } from 'lucide-react';

interface MinimalTemplateProps {
  data: PortfolioFormData;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-light text-gray-900 mb-4 tracking-wide">{data.name}</h1>
          <div className="flex justify-center gap-8 text-gray-600 mb-6">
            {data.email && (
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {data.email}
              </span>
            )}
            {data.phone && (
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {data.phone}
              </span>
            )}
            {data.location && (
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {data.location}
              </span>
            )}
          </div>
          {data.summary && (
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mx-auto font-light">
              {data.summary}
            </p>
          )}
          
          {/* Social Links */}
          {(data.socialLinks?.linkedin || data.socialLinks?.github || data.socialLinks?.portfolio) && (
            <div className="flex justify-center gap-6 mt-8">
              {data.socialLinks?.linkedin && (
                <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {data.socialLinks?.github && (
                <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {data.socialLinks?.portfolio && (
                <a href={data.socialLinks.portfolio} target="_blank" rel="noopener noreferrer"
                   className="text-gray-600 hover:text-gray-900 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">Skills</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.skills.filter(skill => skill.trim()).map((skill, index) => (
                <span key={index} className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-12 text-center">Experience</h2>
            <div className="space-y-12">
              {data.experience?.map((exp, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{exp.title}</h3>
                  <p className="text-lg text-gray-600 mb-2">{exp.company}</p>
                  <div className="flex justify-center gap-4 text-sm text-gray-500 mb-4">
                    {exp.location && <span>{exp.location}</span>}
                    <span>{exp.dates}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">{exp.description}</p>
                  {index < (data.experience?.length ?? 0) - 1 && (
                    <div className="w-px h-12 bg-gray-300 mx-auto mt-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-12 text-center">Education</h2>
            <div className="space-y-8">
              {data.education?.map((edu, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-medium text-gray-900">{edu.degree}</h3>
                  <p className="text-lg text-gray-600 mb-2">{edu.institution}</p>
                  <div className="flex justify-center gap-4 text-sm text-gray-500">
                    {edu.location && <span>{edu.location}</span>}
                    <span>{edu.dates}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-12 text-center">Projects</h2>
            <div className="space-y-12">
              {data.projects?.map((project, index) => (
                <div key={index} className="text-center border-b border-gray-200 pb-12 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <h3 className="text-xl font-medium text-gray-900">{project.name}</h3>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                         className="text-gray-600 hover:text-gray-900">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-700 mb-6 max-w-2xl mx-auto leading-relaxed">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                      {project.technologies.filter(tech => tech.trim()).map((tech, techIndex) => (
                        <span key={techIndex} className="text-sm text-gray-600 border-b border-gray-300 pb-1">
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

        {/* Certifications at bottom if present */}
        {data.certifications && data.certifications.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-12 text-center">Certifications</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {data.certifications?.map((cert, index) => (
                <div key={index} className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-medium text-gray-900 mb-1">{cert.name}</h3>
                  <p className="text-gray-600 mb-1">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages at bottom if present and not in sidebar */}
        {data.languages && data.languages.length > 0 && (
          <div className="md:hidden mb-16">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">Languages</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {data.languages.filter(lang => lang.trim()).map((language, index) => (
                <span key={index} className="px-4 py-2 border border-gray-300 rounded-full text-gray-700">
                  {language}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;
