import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Code, Database, Cpu, Terminal, Globe, Zap } from 'lucide-react';

interface AboutPageProps {
  data: PortfolioFormData;
}

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  return (
    <div className="space-y-4 md:space-y-8">
      {/* Page Header */}
      <div className="bg-black rounded-lg p-3 md:p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Terminal className="w-4 h-4 md:w-6 md:h-6 text-green-400" />
          <span className="text-green-400 text-sm md:text-base">cat /about/profile.json</span>
        </div>
        <div className="space-y-1 md:space-y-2 text-green-300 text-xs md:text-sm">
          <div>Reading profile data...</div>
          <div className="text-green-400">✓ Profile loaded successfully</div>
        </div>
      </div>

      {/* About Section */}
      {data.summary && (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-green-500">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Code className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
            <h2 className="text-lg md:text-xl font-bold text-white">about.md</h2>
          </div>
          <div className="bg-black p-3 md:p-4 rounded border border-gray-700">
            <div className="text-green-400 mb-2 text-xs md:text-sm"># About Me</div>
            <div className="text-gray-300 leading-relaxed text-sm md:text-base">
              {data.summary}
            </div>
          </div>
        </div>
      )}

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-green-500">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Cpu className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
            <h2 className="text-lg md:text-xl font-bold text-white">skills.config</h2>
          </div>
          <div className="bg-black p-3 md:p-4 rounded border border-gray-700">
            <div className="text-green-400 mb-3 md:mb-4 text-xs md:text-sm">const skills = {'{'}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
              {data.skills.filter(skill => skill.trim()).map((skill, index) => (
                <div key={index} className="flex items-center gap-2 pl-3 md:pl-4">
                  <span className="text-green-500 text-sm md:text-base">{'>'}</span>
                  <span className="text-blue-400 text-xs md:text-sm break-all">"{skill}"</span>
                  <span className="text-gray-500 text-xs md:text-sm">,</span>
                </div>
              ))}
            </div>
            <div className="text-green-400 mt-3 md:mt-4 text-xs md:text-sm">{'};'}</div>
          </div>
        </div>
      )}

      {/* Languages Section */}
      {data.languages && data.languages.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-green-500">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Globe className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
            <h2 className="text-lg md:text-xl font-bold text-white">languages.py</h2>
          </div>
          <div className="bg-black p-3 md:p-4 rounded border border-gray-700">
            <div className="text-green-400 mb-3 md:mb-4 text-xs md:text-sm">languages = [</div>
            <div className="space-y-1 md:space-y-2">
              {data.languages.filter(lang => lang.trim()).map((language, index) => (
                <div key={index} className="flex items-center gap-2 pl-3 md:pl-4">
                  <span className="text-yellow-400 text-xs md:text-sm">"{language}"</span>
                  <span className="text-gray-500 text-xs md:text-sm">,</span>
                </div>
              ))}
            </div>
            <div className="text-green-400 mt-3 md:mt-4 text-xs md:text-sm">]</div>
          </div>
        </div>
      )}

      {/* Interactive Terminal Demo */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Terminal className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          <h2 className="text-lg md:text-xl font-bold text-white">interactive_demo.sh</h2>
        </div>
        <div className="bg-black p-3 md:p-4 rounded border border-gray-700">
          <div className="space-y-1 md:space-y-2 text-xs md:text-sm">
            <div className="text-green-400">#!/bin/bash</div>
            <div className="text-gray-400"># Interactive portfolio demonstration</div>
            <div className="text-white break-words">echo "Welcome to {data.name}'s portfolio"</div>
            <div className="text-white">echo "Current skills: {data.skills?.length || 0}"</div>
            <div className="text-white">echo "Languages: {data.languages?.length || 0}"</div>
            <div className="text-green-300">portfolio --status</div>
            <div className="text-gray-400"># Status: Active ✓</div>
            <div className="text-gray-400"># Last update: {new Date().toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-green-500">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <Database className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
            <h3 className="text-base md:text-lg font-bold text-white">system_info.log</h3>
          </div>
          <div className="bg-black p-3 md:p-4 rounded border border-gray-700 space-y-1 md:space-y-2 text-xs md:text-sm">
            <div className="text-green-400">$ uname -a</div>
            <div className="text-gray-300 break-words">Portfolio-OS 2.0.24 #1 {new Date().toDateString()}</div>
            <div className="text-green-400">$ whoami</div>
            <div className="text-gray-300 break-words">{data.name}</div>
            <div className="text-green-400">$ pwd</div>
            <div className="text-gray-300">/portfolio/about</div>
            <div className="text-green-400">$ uptime</div>
            <div className="text-gray-300">System has been running for {Math.floor(Math.random() * 100)} days</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-green-500">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-bold text-white">performance.json</h3>
          </div>
          <div className="bg-black p-4 rounded border border-gray-700 space-y-2 text-sm">
            <div className="text-green-400">{'{'}</div>
            <div className="pl-4">
              <div className="text-white">"motivation": <span className="text-yellow-400">"100%"</span>,</div>
              <div className="text-white">"creativity": <span className="text-yellow-400">"∞"</span>,</div>
              <div className="text-white">"problem_solving": <span className="text-yellow-400">"optimized"</span>,</div>
              <div className="text-white">"learning_speed": <span className="text-yellow-400">"rapid"</span>,</div>
              <div className="text-white">"teamwork": <span className="text-yellow-400">"excellent"</span></div>
            </div>
            <div className="text-green-400">{'}'}</div>
          </div>
        </div>
      </div>

      {/* Code Editor Simulation */}
      <div className="bg-gray-800 rounded-lg p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-4">
          <Code className="w-5 h-5 text-green-400" />
          <h2 className="text-xl font-bold text-white">personal_intro.js</h2>
        </div>
        <div className="bg-black p-4 rounded border border-gray-700">
          <div className="space-y-2 text-sm">
            <div className="text-purple-400">class</div>
            <span className="text-yellow-400"> Developer</span>
            <span className="text-white"> {'{'}</span>
            
            <div className="pl-4 space-y-1">
              <div>
                <span className="text-blue-400">constructor</span>
                <span className="text-white">() {'{'}</span>
              </div>
              <div className="pl-4 space-y-1">
                <div>
                  <span className="text-gray-400">this</span>
                  <span className="text-white">.name = </span>
                  <span className="text-green-300">"{data.name}"</span>
                  <span className="text-white">;</span>
                </div>
                {data.email && (
                  <div>
                    <span className="text-gray-400">this</span>
                    <span className="text-white">.email = </span>
                    <span className="text-green-300">"{data.email}"</span>
                    <span className="text-white">;</span>
                  </div>
                )}
                {data.location && (
                  <div>
                    <span className="text-gray-400">this</span>
                    <span className="text-white">.location = </span>
                    <span className="text-green-300">"{data.location}"</span>
                    <span className="text-white">;</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-400">this</span>
                  <span className="text-white">.passion = </span>
                  <span className="text-green-300">"coding"</span>
                  <span className="text-white">;</span>
                </div>
              </div>
              <div className="text-white">{'}'}</div>
              
              <div className="mt-3">
                <span className="text-blue-400">getSkills</span>
                <span className="text-white">() {'{'}</span>
              </div>
              <div className="pl-4">
                <span className="text-purple-400">return</span>
                <span className="text-white"> [</span>
                {data.skills?.slice(0, 3).map((skill, index) => (
                  <span key={index}>
                    <span className="text-green-300">"{skill}"</span>
                    {index < 2 && data.skills && index < data.skills.length - 1 && <span className="text-white">, </span>}
                  </span>
                ))}
                <span className="text-white">];</span>
              </div>
              <div className="text-white">{'}'}</div>
            </div>
            
            <div className="text-white">{'}'}</div>
          </div>
        </div>
      </div>

      {/* Navigation Terminal */}
      <div className="bg-black rounded-lg p-6 border border-green-500">
        <div className="text-green-400 mb-2">Available navigation commands:</div>
        <div className="space-y-1 text-sm">
          <div><span className="text-green-500">$ cd experience</span> <span className="text-gray-400"># View work history</span></div>
          <div><span className="text-green-500">$ cd education</span> <span className="text-gray-400"># View educational background</span></div>
          <div><span className="text-green-500">$ cd projects</span> <span className="text-gray-400"># Browse portfolio projects</span></div>
          <div><span className="text-green-500">$ cd home</span> <span className="text-gray-400"># Return to main page</span></div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
