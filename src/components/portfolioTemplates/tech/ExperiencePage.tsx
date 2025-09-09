import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Briefcase, Terminal, Calendar, MapPin, Code, GitBranch } from 'lucide-react';

interface ExperiencePageProps {
  data: PortfolioFormData;
}

const ExperiencePage: React.FC<ExperiencePageProps> = ({ data }) => {
  if (!data.experience || data.experience.length === 0) {
    return (
      <div className="space-y-4 md:space-y-8">
        <div className="bg-black rounded-lg p-4 md:p-6 border border-green-500">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Terminal className="w-4 h-4 md:w-6 md:h-6 text-green-400" />
            <span className="text-green-400 text-sm md:text-base">ls /experience/</span>
          </div>
          <div className="text-red-400 text-sm md:text-base">No experience records found</div>
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
          <span className="text-green-400 text-sm md:text-base">cat /experience/work_history.log</span>
        </div>
        <div className="space-y-1 md:space-y-2 text-green-300 text-xs md:text-sm">
          <div>Loading work experience...</div>
          <div>Found {data.experience.length} entries</div>
          <div className="text-green-400">✓ Experience data loaded successfully</div>
        </div>
      </div>

      {/* Git-style Timeline */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <GitBranch className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          <h2 className="text-lg md:text-xl font-bold text-white">git log --oneline --experience</h2>
        </div>
        <div className="space-y-3 md:space-y-4">
          {data.experience.map((exp, index) => (
            <div key={index} className="flex items-start gap-2 md:gap-4 text-xs md:text-sm">
              <div className="text-yellow-400 font-mono flex-shrink-0">
                {(Math.random() * 1000000).toString(16).substring(0, 7)}
              </div>
              <div className="text-green-400 flex-shrink-0">•</div>
              <div className="text-white break-words">
                {exp.title} at {exp.company} ({exp.dates})
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Details */}
      <div className="space-y-4 md:space-y-6">
        {data.experience.map((exp, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-4 md:p-6 border border-green-500">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
              <h3 className="text-base md:text-lg font-bold text-white">experience_{index + 1}.json</h3>
            </div>
            
            <div className="bg-black p-3 md:p-4 rounded border border-gray-700">
              <div className="text-green-400 mb-2 text-xs md:text-sm">{'{'}</div>
              <div className="pl-3 md:pl-4 space-y-1 md:space-y-2">
                <div className="flex items-start gap-2 text-xs md:text-sm">
                  <span className="text-blue-400 flex-shrink-0">"position":</span>
                  <span className="text-yellow-400 break-words">"{exp.title}"</span>
                </div>
                <div className="flex items-start gap-2 text-xs md:text-sm">
                  <span className="text-blue-400 flex-shrink-0">"company":</span>
                  <span className="text-yellow-400 break-words">"{exp.company}"</span>
                </div>
                <div className="flex items-start gap-2 text-xs md:text-sm">
                  <span className="text-blue-400 flex-shrink-0">"duration":</span>
                  <span className="text-yellow-400 break-words">"{exp.dates}"</span>
                </div>
                {exp.location && (
                  <div className="flex items-start gap-2 text-xs md:text-sm">
                    <span className="text-blue-400 flex-shrink-0">"location":</span>
                    <span className="text-yellow-400 break-words">"{exp.location}"</span>
                  </div>
                )}
                <div className="flex items-start gap-2 text-xs md:text-sm">
                  <span className="text-blue-400 flex-shrink-0">"description":</span>
                  <span className="text-yellow-400 break-words">"{exp.description}"</span>
                </div>
              </div>
              <div className="text-green-400 mt-2 text-xs md:text-sm">{'}'}</div>
            </div>

            {/* Command Line Simulation */}
            <div className="mt-3 md:mt-4 bg-black p-3 md:p-4 rounded border border-gray-700">
              <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
                <div className="text-green-400 break-words">$ cd /experience/{exp.company?.toLowerCase().replace(/\s+/g, '-')}</div>
                <div className="text-gray-300">Entering {exp.company} workspace...</div>
                <div className="text-green-400">$ ls -la</div>
                <div className="text-gray-300">total 4</div>
                <div className="text-gray-300">drwxr-xr-x achievements/</div>
                <div className="text-gray-300">drwxr-xr-x responsibilities/</div>
                <div className="text-gray-300">-rw-r--r-- role_summary.txt</div>
                <div className="text-green-400">$ cat role_summary.txt</div>
                <div className="text-gray-300 pl-3 md:pl-4 break-words">{exp.description}</div>
              </div>
            </div>

            {/* Visual Timeline Element */}
            <div className="mt-3 md:mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                <span>{exp.dates}</span>
              </div>
              {exp.location && (
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{exp.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Experience Analytics */}
      <div className="bg-gray-800 rounded-lg p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-bold text-white">experience_analytics.py</h3>
        </div>
        <div className="bg-black p-4 rounded border border-gray-700">
          <div className="space-y-2 text-sm">
            <div className="text-green-400">#!/usr/bin/env python3</div>
            <div className="text-gray-400"># Experience analytics script</div>
            <div className="text-white">
              total_positions = <span className="text-yellow-400">{data.experience.length}</span>
            </div>
            <div className="text-white">
              companies = [
              {data.experience.map((exp, index) => (
                <div key={index} className="pl-4 text-yellow-400">
                  "{exp.company}"{index < (data.experience?.length || 0) - 1 ? ',' : ''}
                </div>
              ))}
              ]
            </div>
            <div className="text-white">
              print(f"Total experience: {'{'}{'{'}total_positions{'}'} positions across {'{'}{'{'}len(companies){'}'} companies")
            </div>
            <div className="text-gray-400"># Output: Total experience: {data.experience.length} positions across {new Set(data.experience.map(exp => exp.company)).size} companies</div>
          </div>
        </div>
      </div>

      {/* Command Reference */}
      <div className="bg-black rounded-lg p-6 border border-green-500">
        <div className="text-green-400 mb-4">Available commands in /experience:</div>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div><span className="text-green-500">$ git log --experience</span> <span className="text-gray-400"># View timeline</span></div>
            <div><span className="text-green-500">$ ls companies/</span> <span className="text-gray-400"># List all companies</span></div>
            <div><span className="text-green-500">$ grep -r "skills"</span> <span className="text-gray-400"># Find skill mentions</span></div>
          </div>
          <div className="space-y-2">
            <div><span className="text-green-500">$ cd ../projects</span> <span className="text-gray-400"># Navigate to projects</span></div>
            <div><span className="text-green-500">$ cd ../education</span> <span className="text-gray-400"># Navigate to education</span></div>
            <div><span className="text-green-500">$ cd ../home</span> <span className="text-gray-400"># Return to homepage</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
