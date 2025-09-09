import React, { useState, useEffect } from 'react';
import { PortfolioFormData } from '@/schemas/portfolio.schema';

// Import all the page components
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import ExperiencePage from './ExperiencePage';
import EducationPage from './EducationPage';
import ProjectsPage from './ProjectsPage';

interface TechPortfolioWebsiteProps {
  data: PortfolioFormData;
}

type PageType = 'home' | 'about' | 'experience' | 'education' | 'projects';

const TechPortfolioWebsite: React.FC<TechPortfolioWebsiteProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to the portfolio terminal!',
    'Type "help" to see available commands.',
    ''
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  // Listen for navigation events from child components
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setCurrentPage(event.detail as PageType);
      addToTerminalHistory(`> Navigated to ${event.detail}`);
    };

    window.addEventListener('navigate', handleNavigate as EventListener);
    return () => window.removeEventListener('navigate', handleNavigate as EventListener);
  }, []);

  // Determine which commands/pages are available based on data
  const availableCommands = {
    'ls': 'List available pages',
    'cd': 'Change directory/page (cd home, cd about, etc.)',
    'pwd': 'Show current page',
    'help': 'Show this help message',
    'clear': 'Clear terminal',
    'whoami': 'Show user information',
    'cat': 'Display content (cat skills, cat contact, etc.)',
    ...(data.experience && data.experience.length > 0 ? { 'experience': 'Navigate to experience page' } : {}),
    ...(data.education && data.education.length > 0 ? { 'education': 'Navigate to education page' } : {}),
    ...(data.projects && data.projects.length > 0 ? { 'projects': 'Navigate to projects page' } : {}),
  };

  const availablePages = ['home', 'about'];
  if (data.experience && data.experience.length > 0) availablePages.push('experience');
  if (data.education && data.education.length > 0) availablePages.push('education');
  if (data.projects && data.projects.length > 0) availablePages.push('projects');

  const addToTerminalHistory = (text: string) => {
    setTerminalHistory(prev => [...prev, text]);
  };

  const handleTerminalCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    const [mainCmd, ...args] = cmd.split(' ');
    
    addToTerminalHistory(`${data.name?.toLowerCase().replace(/\s+/g, '-') || 'user'}@portfolio:~$ ${command}`);
    
    switch (mainCmd) {
      case 'help':
        addToTerminalHistory('Available commands:');
        Object.entries(availableCommands).forEach(([cmd, desc]) => {
          addToTerminalHistory(`  ${cmd.padEnd(12)} - ${desc}`);
        });
        break;
        
      case 'ls':
        addToTerminalHistory('Available pages:');
        availablePages.forEach(page => {
          addToTerminalHistory(`  ${page}${page === currentPage ? ' (current)' : ''}`);
        });
        break;
        
      case 'cd':
        const targetPage = args[0];
        if (!targetPage) {
          addToTerminalHistory('cd: missing page name');
          addToTerminalHistory('Usage: cd <page>');
        } else if (availablePages.includes(targetPage)) {
          setCurrentPage(targetPage as PageType);
          addToTerminalHistory(`Changed to ${targetPage} page`);
        } else {
          addToTerminalHistory(`cd: ${targetPage}: No such page`);
          addToTerminalHistory(`Available pages: ${availablePages.join(', ')}`);
        }
        break;
        
      case 'pwd':
        addToTerminalHistory(`/portfolio/${currentPage}`);
        break;
        
      case 'clear':
        setTerminalHistory([]);
        break;
        
      case 'whoami':
        addToTerminalHistory(`Name: ${data.name || 'Unknown'}`);
        if (data.email) addToTerminalHistory(`Email: ${data.email}`);
        if (data.location) addToTerminalHistory(`Location: ${data.location}`);
        break;
        
      case 'cat':
        const file = args[0];
        if (!file) {
          addToTerminalHistory('cat: missing file name');
          addToTerminalHistory('Available files: skills, contact, summary');
        } else {
          switch (file) {
            case 'skills':
              if (data.skills && data.skills.length > 0) {
                addToTerminalHistory('Skills:');
                data.skills.filter(skill => skill.trim()).forEach(skill => {
                  addToTerminalHistory(`  - ${skill}`);
                });
              } else {
                addToTerminalHistory('No skills data found');
              }
              break;
            case 'contact':
              addToTerminalHistory('Contact Information:');
              if (data.email) addToTerminalHistory(`  Email: ${data.email}`);
              if (data.phone) addToTerminalHistory(`  Phone: ${data.phone}`);
              if (data.location) addToTerminalHistory(`  Location: ${data.location}`);
              break;
            case 'summary':
              if (data.summary) {
                addToTerminalHistory('Summary:');
                addToTerminalHistory(`  ${data.summary}`);
              } else {
                addToTerminalHistory('No summary available');
              }
              break;
            default:
              addToTerminalHistory(`cat: ${file}: No such file`);
          }
        }
        break;
        
      default:
        if (availablePages.includes(mainCmd)) {
          setCurrentPage(mainCmd as PageType);
          addToTerminalHistory(`Navigated to ${mainCmd} page`);
        } else {
          addToTerminalHistory(`${mainCmd}: command not found`);
          addToTerminalHistory('Type "help" for available commands');
        }
    }
    
    addToTerminalHistory('');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      setCommandHistory(prev => [...prev, terminalInput]);
      handleTerminalCommand(terminalInput);
      setTerminalInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setTerminalInput('');
      }
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage data={data} />;
      case 'about':
        return <AboutPage data={data} />;
      case 'experience':
        return <ExperiencePage data={data} />;
      case 'education':
        return <EducationPage data={data} />;
      case 'projects':
        return <ProjectsPage data={data} />;
      default:
        return <HomePage data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Terminal Navigation Header */}
        <div className="bg-gray-800 border-b border-green-500 p-2 md:p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-3 md:mb-4 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
              <span className="ml-2 md:ml-4 text-green-400 text-xs md:text-base break-all">
                {data.name?.toLowerCase().replace(/\s+/g, '-') || 'user'}@portfolio:~/{currentPage}$
              </span>
            </div>
            <div className="text-xs md:text-sm text-gray-400">
              Type "help" for commands
            </div>
          </div>
          
          {/* Mini Terminal */}
          <div className="bg-black rounded-lg p-2 md:p-4 h-32 md:h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-green-600">
            {terminalHistory.map((line, index) => (
              <div key={index} className="text-xs md:text-sm break-words">
                {line}
              </div>
            ))}
            <form onSubmit={handleTerminalSubmit} className="flex items-center">
              <span className="text-green-400 mr-1 md:mr-2 text-xs md:text-sm hidden sm:inline">
                {data.name?.toLowerCase().replace(/\s+/g, '-') || 'user'}@portfolio:~$
              </span>
              <span className="text-green-400 mr-1 text-xs sm:hidden">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none flex-1 text-green-400 text-xs md:text-sm"
                placeholder="Enter command..."
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </div>
        </div>

        {/* Quick Navigation Buttons */}
        <div className="bg-gray-800 border-b border-green-500 p-2 md:p-4">
          <div className="flex flex-wrap gap-1 md:gap-2">
            {availablePages.map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page as PageType);
                  addToTerminalHistory(`> Quick nav to ${page}`);
                }}
                className={`px-2 md:px-3 py-1 rounded text-xs md:text-sm border transition-colors ${
                  currentPage === page
                    ? 'bg-green-600 text-black border-green-400'
                    : 'bg-gray-700 text-green-400 border-gray-600 hover:border-green-500'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <main className="p-2 md:p-4">
          {renderCurrentPage()}
        </main>

        {/* Footer Terminal */}
        <footer className="bg-gray-800 border-t border-green-500 p-2 md:p-4">
          <div className="text-center text-xs md:text-sm text-gray-400">
            <div className="mb-2">
              <span className="hidden sm:inline">{data.name?.toLowerCase().replace(/\s+/g, '-') || 'user'}@portfolio:~$ connection established</span>
              <span className="sm:hidden">Connection established</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
              {data.email && <span className="break-all">📧 {data.email}</span>}
              {data.location && <span>📍 {data.location}</span>}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TechPortfolioWebsite;
