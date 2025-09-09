import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { GraduationCap, Terminal, Calendar, MapPin, Database, BookOpen } from 'lucide-react';

interface EducationPageProps {
  data: PortfolioFormData;
}

const EducationPage: React.FC<EducationPageProps> = ({ data }) => {
  if (!data.education || data.education.length === 0) {
    return (
      <div className="space-y-8">
        <div className="bg-black rounded-lg p-6 border border-green-500">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-6 h-6 text-green-400" />
            <span className="text-green-400">ls /education/</span>
          </div>
          <div className="text-red-400">No education records found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="bg-black rounded-lg p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-4">
          <Terminal className="w-6 h-6 text-green-400" />
          <span className="text-green-400">cat /education/academic_records.db</span>
        </div>
        <div className="space-y-2 text-green-300">
          <div>Connecting to education database...</div>
          <div>Found {data.education.length} academic records</div>
          <div className="text-green-400">✓ Database query completed successfully</div>
        </div>
      </div>

      {/* SQL-style Query */}
      <div className="bg-gray-800 rounded-lg p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-bold text-white">education.sql</h2>
        </div>
        <div className="bg-black p-4 rounded border border-gray-700">
          <div className="space-y-2 text-sm">
            <div className="text-blue-400">SELECT * FROM education</div>
            <div className="text-blue-400">WHERE student_name = '{data.name}'</div>
            <div className="text-blue-400">ORDER BY graduation_date DESC;</div>
            <div className="text-gray-400 mt-4">-- Query returned {data.education.length} rows</div>
          </div>
        </div>
      </div>

      {/* Education Records */}
      <div className="space-y-6">
        {data.education.map((edu, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 border border-green-500">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-bold text-white">record_{index + 1}.json</h3>
            </div>
            
            {/* JSON Format Display */}
            <div className="bg-black p-4 rounded border border-gray-700 mb-4">
              <div className="text-green-400 mb-2">{'{'}</div>
              <div className="pl-4 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-blue-400">"degree":</span>
                  <span className="text-yellow-400">"{edu.degree}"</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400">"institution":</span>
                  <span className="text-yellow-400">"{edu.institution}"</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-400">"dates":</span>
                  <span className="text-yellow-400">"{edu.dates}"</span>
                </div>
                {edu.location && (
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">"location":</span>
                    <span className="text-yellow-400">"{edu.location}"</span>
                  </div>
                )}
                {edu.gpa && (
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400">"gpa":</span>
                    <span className="text-yellow-400">"{edu.gpa}"</span>
                  </div>
                )}
                <div className="flex items-start gap-2">
                  <span className="text-blue-400">"status":</span>
                  <span className="text-green-300">"completed"</span>
                </div>
              </div>
              <div className="text-green-400 mt-2">{'}'}</div>
            </div>

            {/* Terminal Simulation */}
            <div className="bg-black p-4 rounded border border-gray-700 mb-4">
              <div className="space-y-2 text-sm">
                <div className="text-green-400">$ cd /education/{edu.institution?.toLowerCase().replace(/\s+/g, '-')}</div>
                <div className="text-gray-300">Accessing institutional records...</div>
                <div className="text-green-400">$ cat degree_info.txt</div>
                <div className="text-gray-300 pl-4">
                  Degree: {edu.degree}
                </div>
                <div className="text-gray-300 pl-4">
                  Institution: {edu.institution}
                </div>
                <div className="text-gray-300 pl-4">
                  Duration: {edu.dates}
                </div>
                {edu.gpa && (
                  <div className="text-gray-300 pl-4">
                    GPA: {edu.gpa}
                  </div>
                )}
                <div className="text-green-400">$ ls -la achievements/</div>
                <div className="text-gray-300">✓ Degree completed successfully</div>
                <div className="text-gray-300">✓ Academic requirements fulfilled</div>
              </div>
            </div>

            {/* Visual Info Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-700 p-3 rounded border border-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400">DEGREE</span>
                </div>
                <div className="text-white text-sm font-medium">{edu.degree}</div>
              </div>
              
              <div className="bg-gray-700 p-3 rounded border border-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400">DATES</span>
                </div>
                <div className="text-white text-sm font-medium">{edu.dates}</div>
              </div>
              
              {edu.location && (
                <div className="bg-gray-700 p-3 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-gray-400">LOCATION</span>
                  </div>
                  <div className="text-white text-sm font-medium">{edu.location}</div>
                </div>
              )}
              
              {edu.gpa && (
                <div className="bg-gray-700 p-3 rounded border border-gray-600">
                  <div className="flex items-center gap-2 mb-2">
                    <GraduationCap className="w-4 h-4 text-yellow-400" />
                    <span className="text-xs text-gray-400">GPA</span>
                  </div>
                  <div className="text-white text-sm font-medium">{edu.gpa}</div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Education Analytics */}
      <div className="bg-gray-800 rounded-lg p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold text-white">education_analytics.py</h3>
        </div>
        <div className="bg-black p-4 rounded border border-gray-700">
          <div className="space-y-2 text-sm">
            <div className="text-green-400">#!/usr/bin/env python3</div>
            <div className="text-gray-400"># Education analytics and statistics</div>
            <div className="text-white">
              import pandas as pd
            </div>
            <div className="text-white">
              from datetime import datetime
            </div>
            <div className="text-white mt-2">
              total_degrees = <span className="text-yellow-400">{data.education.length}</span>
            </div>
            <div className="text-white">
              institutions = [
              {data.education.map((edu, index) => (
                <div key={index} className="pl-4 text-yellow-400">
                  "{edu.institution}"{index < (data.education?.length || 0) - 1 ? ',' : ''}
                </div>
              ))}
              ]
            </div>
            <div className="text-white mt-2">
              print(f"Academic journey: {'{'}{'{'}total_degrees{'}'} degrees from {'{'}{'{'}len(set(institutions)){'}'} institutions")
            </div>
            <div className="text-gray-400 mt-2">
              # Output: Academic journey: {data.education.length} degrees from {new Set(data.education.map(edu => edu.institution)).size} institutions
            </div>
          </div>
        </div>
      </div>

      {/* Database Schema */}
      <div className="bg-gray-800 rounded-lg p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-4">
          <Database className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold text-white">schema.sql</h3>
        </div>
        <div className="bg-black p-4 rounded border border-gray-700">
          <div className="space-y-2 text-sm">
            <div className="text-blue-400">CREATE TABLE education (</div>
            <div className="pl-4 space-y-1">
              <div className="text-white">id <span className="text-purple-400">INT</span> <span className="text-yellow-400">PRIMARY KEY</span>,</div>
              <div className="text-white">degree <span className="text-purple-400">VARCHAR(255)</span> <span className="text-yellow-400">NOT NULL</span>,</div>
              <div className="text-white">institution <span className="text-purple-400">VARCHAR(255)</span> <span className="text-yellow-400">NOT NULL</span>,</div>
              <div className="text-white">dates <span className="text-purple-400">VARCHAR(100)</span>,</div>
              <div className="text-white">location <span className="text-purple-400">VARCHAR(255)</span>,</div>
              <div className="text-white">gpa <span className="text-purple-400">VARCHAR(10)</span>,</div>
              <div className="text-white">created_at <span className="text-purple-400">TIMESTAMP</span> <span className="text-yellow-400">DEFAULT CURRENT_TIMESTAMP</span></div>
            </div>
            <div className="text-blue-400">);</div>
          </div>
        </div>
      </div>

      {/* Command Reference */}
      <div className="bg-black rounded-lg p-6 border border-green-500">
        <div className="text-green-400 mb-4">Available commands in /education:</div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div><span className="text-green-500">$ SELECT * FROM education;</span> <span className="text-gray-400"># View all records</span></div>
            <div><span className="text-green-500">$ ls institutions/</span> <span className="text-gray-400"># List all schools</span></div>
            <div><span className="text-green-500">$ cat transcript.pdf</span> <span className="text-gray-400"># View grades</span></div>
          </div>
          <div className="space-y-2">
            <div><span className="text-green-500">$ cd ../experience</span> <span className="text-gray-400"># Navigate to experience</span></div>
            <div><span className="text-green-500">$ cd ../projects</span> <span className="text-gray-400"># Navigate to projects</span></div>
            <div><span className="text-green-500">$ cd ../home</span> <span className="text-gray-400"># Return to homepage</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
