import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin } from 'lucide-react';

interface ClassicTemplateProps {
  data: PortfolioFormData;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        {/* Header */}
        <div className="bg-white border-2 border-gray-300 p-8 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">{data.name}</h1>
            <div className="flex flex-wrap justify-center gap-6 text-gray-600 mb-4">
              {data.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  <span>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  <span>{data.phone}</span>
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{data.location}</span>
                </div>
              )}
            </div>
            {data.summary && (
              <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto">{data.summary}</p>
            )}
          </div>

          {/* Social Links */}
          {(data.socialLinks?.linkedin || data.socialLinks?.github || data.socialLinks?.portfolio) && (
            <div className="flex justify-center gap-4 pt-4 border-t border-gray-200">
              {data.socialLinks?.linkedin && (
                <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                   className="text-blue-600 hover:text-blue-800 underline">
                  LinkedIn
                </a>
              )}
              {data.socialLinks?.github && (
                <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"
                   className="text-gray-800 hover:text-gray-900 underline">
                  GitHub
                </a>
              )}
              {data.socialLinks?.portfolio && (
                <a href={data.socialLinks.portfolio} target="_blank" rel="noopener noreferrer"
                   className="text-purple-600 hover:text-purple-800 underline">
                  Portfolio
                </a>
              )}
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
              <div className="bg-white border-2 border-gray-300 p-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-900">
                  SKILLS
                </h2>
                <ul className="space-y-2">
                  {data.skills.filter(skill => skill.trim()).map((skill, index) => (
                    <li key={index} className="text-gray-700 before:content-['•'] before:mr-2 before:text-gray-500">
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <div className="bg-white border-2 border-gray-300 p-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-900">
                  LANGUAGES
                </h2>
                <ul className="space-y-2">
                  {data.languages.filter(lang => lang.trim()).map((language, index) => (
                    <li key={index} className="text-gray-700 before:content-['•'] before:mr-2 before:text-gray-500">
                      {language}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <div className="bg-white border-2 border-gray-300 p-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-900">
                  CERTIFICATIONS
                </h2>
                <div className="space-y-3">
                  {data.certifications.map((cert, index) => (
                    <div key={index}>
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-600 text-sm">{cert.issuer}</p>
                      <p className="text-gray-500 text-sm">{cert.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <div className="bg-white border-2 border-gray-300 p-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-900">
                  PROFESSIONAL EXPERIENCE
                </h2>
                <div className="space-y-6">
                  {data.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{exp.title}</h3>
                          <p className="text-gray-700 font-medium">{exp.company}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          {exp.location && <p>{exp.location}</p>}
                          <p>{exp.dates}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <div className="bg-white border-2 border-gray-300 p-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-900">
                  EDUCATION
                </h2>
                <div className="space-y-4">
                  {data.education.map((edu, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                          <p className="text-gray-700">{edu.institution}</p>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          {edu.location && <p>{edu.location}</p>}
                          <p>{edu.dates}</p>
                          {edu.gpa && <p>GPA: {edu.gpa}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <div className="bg-white border-2 border-gray-300 p-6">
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-4 pb-2 border-b-2 border-gray-900">
                  PROJECTS
                </h2>
                <div className="space-y-6">
                  {data.projects.map((project, index) => (
                    <div key={index}>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer"
                             className="text-gray-600 hover:text-gray-800">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">{project.description}</p>
                      {project.technologies && project.technologies.length > 0 && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Technologies:</span> {project.technologies.filter(tech => tech.trim()).join(', ')}
                        </p>
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

export default ClassicTemplate;
