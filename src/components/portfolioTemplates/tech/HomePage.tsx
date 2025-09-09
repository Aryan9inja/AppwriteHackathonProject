import React from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Terminal, Code, User, Briefcase, GraduationCap } from 'lucide-react';

interface HomePageProps {
  data: PortfolioFormData;
}

const HomePage: React.FC<HomePageProps> = ({ data }) => {
  const navigationItems = [
    { name: 'About', icon: User, page: 'about', command: 'cd about' },
    { name: 'Experience', icon: Briefcase, page: 'experience', command: 'cd experience' },
    { name: 'Education', icon: GraduationCap, page: 'education', command: 'cd education' },
    { name: 'Projects', icon: Code, page: 'projects', command: 'cd projects' },
  ];

  // Get navigation function from parent via event delegation
  const handleNavigation = (page: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: page }));
  };

  return (
    <div className="space-y-4 md:space-y-8">
      {/* Terminal Welcome */}
      <div className="bg-black rounded-lg p-3 md:p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Terminal className="w-4 h-4 md:w-6 md:h-6 text-green-400" />
          <span className="text-green-400 text-sm md:text-base">./portfolio --init</span>
        </div>
        <div className="space-y-1 md:space-y-2 text-green-300 text-xs md:text-sm">
          <div>Initializing portfolio...</div>
          <div>Loading user data...</div>
          <div className="text-green-400">✓ Portfolio loaded successfully</div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-8 border border-green-500">
        <div className="text-center">
          <div className="mb-4 md:mb-6">
            <div className="text-green-400 text-xs md:text-sm mb-2">class Portfolio:</div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4 break-words">
              {data.name}
            </h1>
            <div className="text-green-300 text-sm md:text-lg">
              def __init__(self):
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8 text-left">
            {data.email && (
              <div className="bg-gray-700 p-3 md:p-4 rounded border border-gray-600">
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <Mail className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-green-400 text-xs md:text-sm">self.email =</span>
                </div>
                <div className="text-white pl-4 md:pl-6 text-xs md:text-sm break-all">"{data.email}"</div>
              </div>
            )}
            {data.phone && (
              <div className="bg-gray-700 p-3 md:p-4 rounded border border-gray-600">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Phone className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-green-400 text-xs md:text-sm">self.phone =</span>
                </div>
                <div className="text-white pl-4 md:pl-6 text-xs md:text-sm">"{data.phone}"</div>
              </div>
            )}
            {data.location && (
              <div className="bg-gray-700 p-3 md:p-4 rounded border border-gray-600">
                <div className="flex items-center gap-2 text-red-400 mb-2">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-green-400 text-xs md:text-sm">self.location =</span>
                </div>
                <div className="text-white pl-4 md:pl-6 text-xs md:text-sm">"{data.location}"</div>
              </div>
            )}
          </div>

          {data.summary && (
            <div className="bg-gray-700 p-4 md:p-6 rounded border border-gray-600 mb-6 md:mb-8">
              <div className="text-green-400 mb-2 text-xs md:text-sm">self.summary = """</div>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg">
                {data.summary}
              </p>
              <div className="text-green-400 mt-2 text-xs md:text-sm">"""</div>
            </div>
          )}

          {/* Social Links */}
          {(data.socialLinks?.linkedin || data.socialLinks?.github || data.socialLinks?.portfolio) && (
            <div className="bg-gray-700 p-4 md:p-6 rounded border border-gray-600 mb-6 md:mb-8">
              <div className="text-green-400 mb-3 md:mb-4 text-xs md:text-sm">self.social_links = {'{'}</div>
              <div className="space-y-2">
                {data.socialLinks?.linkedin && (
                  <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-2 md:gap-3 text-blue-400 hover:text-blue-300 pl-4 md:pl-6 text-xs md:text-sm break-all">
                    <Linkedin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span>"linkedin": "{data.socialLinks.linkedin}"</span>
                  </a>
                )}
                {data.socialLinks?.github && (
                  <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 md:gap-3 text-gray-400 hover:text-gray-300 pl-4 md:pl-6 text-xs md:text-sm break-all">
                    <Github className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span>"github": "{data.socialLinks.github}"</span>
                  </a>
                )}
                {data.socialLinks?.portfolio && (
                  <a href={data.socialLinks.portfolio} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 md:gap-3 text-purple-400 hover:text-purple-300 pl-4 md:pl-6 text-xs md:text-sm break-all">
                    <ExternalLink className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span>"portfolio": "{data.socialLinks.portfolio}"</span>
                  </a>
                )}
              </div>
              <div className="text-green-400 mt-3 md:mt-4 text-xs md:text-sm">{'}'}</div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Commands */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-green-500">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <Terminal className="w-4 h-4 md:w-5 md:h-5 text-green-400" />
          <h2 className="text-lg md:text-xl font-bold text-white">Navigation Commands</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {navigationItems.map((item) => {
            const hasData = 
              (item.page === 'experience' && data.experience && data.experience.length > 0) ||
              (item.page === 'education' && data.education && data.education.length > 0) ||
              (item.page === 'projects' && data.projects && data.projects.length > 0) ||
              item.page === 'about';

            if (!hasData) return null;

            return (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.page)}
                className="bg-gray-700 border border-gray-600 rounded-lg p-3 md:p-4 hover:border-green-500 hover:bg-gray-600 transition-all duration-200 group text-left"
              >
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <item.icon className="w-4 h-4 md:w-6 md:h-6 text-green-400 group-hover:text-green-300 flex-shrink-0" />
                  <span className="text-white font-medium text-sm md:text-base">{item.name}</span>
                </div>
                <div className="text-green-400 text-xs md:text-sm font-mono">
                  $ {item.command}
                </div>
                <div className="text-gray-400 text-xs md:text-sm mt-2">
                  {item.name === 'About' && 'Personal information and skills'}
                  {item.name === 'Experience' && `${data.experience?.length || 0} work experiences`}
                  {item.name === 'Education' && `${data.education?.length || 0} educational records`}
                  {item.name === 'Projects' && `${data.projects?.length || 0} projects`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-black rounded-lg p-4 md:p-6 border border-green-500">
        <div className="text-green-400 mb-3 md:mb-4 text-sm md:text-base"># Quick Stats</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-center">
          <div className="bg-gray-800 p-3 md:p-4 rounded border border-gray-700">
            <div className="text-xl md:text-2xl font-bold text-white">
              {data.skills?.filter(skill => skill.trim()).length || 0}
            </div>
            <div className="text-green-400 text-xs md:text-sm">Skills</div>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded border border-gray-700">
            <div className="text-xl md:text-2xl font-bold text-white">
              {data.experience?.length || 0}
            </div>
            <div className="text-green-400 text-xs md:text-sm">Experience</div>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded border border-gray-700">
            <div className="text-xl md:text-2xl font-bold text-white">
              {data.projects?.length || 0}
            </div>
            <div className="text-green-400 text-xs md:text-sm">Projects</div>
          </div>
          <div className="bg-gray-800 p-3 md:p-4 rounded border border-gray-700">
            <div className="text-xl md:text-2xl font-bold text-white">
              {data.education?.length || 0}
            </div>
            <div className="text-green-400 text-xs md:text-sm">Education</div>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="bg-gray-800 rounded-lg p-4 md:p-6 border border-green-500">
        <div className="text-green-400 mb-3 md:mb-4 text-xs md:text-sm">$ cat /proc/portfolio/info</div>
        <div className="space-y-1 md:space-y-2 text-gray-300 text-xs md:text-sm">
          <div>Portfolio System: v2.0.24</div>
          <div>Last Updated: {new Date().toLocaleDateString()}</div>
          <div>Status: Online ✓</div>
          <div>Uptime: {Math.floor(Math.random() * 365)} days</div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
