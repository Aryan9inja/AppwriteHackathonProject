import React, { useState } from "react";
import { PortfolioFormData } from "@/schemas/portfolio.schema";

// Import all the page components
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import ExperiencePage from "./ExperiencePage";
import EducationPage from "./EducationPage";
import ProjectsPage from "./ProjectsPage";

interface ModernPortfolioWebsiteProps {
  data: PortfolioFormData;
}

type PageType = "home" | "about" | "experience" | "education" | "projects";

const ModernPortfolioWebsite: React.FC<ModernPortfolioWebsiteProps> = ({
  data,
}) => {
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  // Listen for navigation events from child components
  React.useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setCurrentPage(event.detail as PageType);
    };

    window.addEventListener("navigate", handleNavigate as EventListener);
    return () =>
      window.removeEventListener("navigate", handleNavigate as EventListener);
  }, []);

  // Determine which tabs to show based on data
  const navItems: { name: string; page: PageType }[] = [
    { name: "Home", page: "home" },
    { name: "About", page: "about" },
    ...(data.experience && data.experience.length > 0
      ? [{ name: "Experience", page: "experience" as PageType }]
      : []),
    ...(data.education && data.education.length > 0
      ? [{ name: "Education", page: "education" as PageType }]
      : []),
    ...(data.projects && data.projects.length > 0
      ? [{ name: "Projects", page: "projects" as PageType }]
      : []),
  ];

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage data={data} />;
      case "about":
        return <AboutPage data={data} />;
      case "experience":
        return <ExperiencePage data={data} />;
      case "education":
        return <EducationPage data={data} />;
      case "projects":
        return <ProjectsPage data={data} />;
      default:
        return <HomePage data={data} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Modern Navigation */}
      <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-blue-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center hover:text-blue-600 transition-colors group"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm md:text-lg font-bold mr-2 md:mr-3 group-hover:scale-105 transition-transform">
                {data.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {data.name}
              </h1>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCurrentPage(item.page)}
                    className={`px-4 lg:px-6 py-2 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 text-sm lg:text-base ${
                      currentPage === item.page
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-700 hover:text-gray-900 hover:bg-blue-50"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(e.target.value as PageType)}
                className="text-gray-700 bg-white/90 border border-blue-300 rounded-xl px-3 py-1.5 text-sm backdrop-blur-sm min-w-[100px]"
              >
                {navItems.map((item) => (
                  <option key={item.name} value={item.page}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{renderCurrentPage()}</main>

      {/* Modern Footer */}
      <footer className="bg-white/90 backdrop-blur-md border-t border-blue-200 mt-8 md:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4 md:mb-6">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-lg md:text-xl font-bold mr-3 md:mr-4">
                {data.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">{data.name}</h3>
            </div>

            <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-lg">
              © {new Date().getFullYear()} {data.name}. All rights reserved.
            </p>

            {/* Footer Navigation */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-6 mb-4 md:mb-6">
              {navItems
                .filter((item) => item.page !== "home")
                .map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCurrentPage(item.page)}
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium hover:scale-105 transform duration-200 px-2 py-1 text-sm md:text-base"
                  >
                    {item.name}
                  </button>
                ))}
            </div>

            {/* Contact Info in Footer */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-8 text-gray-500 text-sm md:text-base">
              {data.email && (
                <span className="hover:text-blue-600 transition-colors cursor-pointer break-all">
                  {data.email}
                </span>
              )}
              {data.phone && (
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  {data.phone}
                </span>
              )}
              {data.location && (
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  {data.location}
                </span>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernPortfolioWebsite;
