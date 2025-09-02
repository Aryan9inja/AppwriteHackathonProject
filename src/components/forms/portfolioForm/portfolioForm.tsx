import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  portfolioSchema,
  type PortfolioFormData,
} from "@/schemas/portfolio.schema";
import { Button } from "@/components/ui/button";
import { Save, Eye, X } from "lucide-react";
import { PORTFOLIO_TEMPLATES, TemplateKey } from "@/components/portfolioTemplates";

// Import modular sections
import PersonalInfoSection from "./PersonalInfoSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import ProjectsSection from "./ProjectsSection";
import CertificationsSection from "./CertificationsSection";
import LanguagesSection from "./LanguagesSection";
import SocialLinksSection from "./SocialLinksSection";
import TemplateSection from "./TemplateSection";
import { PortfolioData } from "@/types/types";
import { getPortfolioData } from "@/services/portfolio.services";
import { useLocation } from "react-router-dom";

interface PortfolioFormProps {
  onSubmit: (data: PortfolioFormData) => Promise<void>;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const location = useLocation();
  const { docId } = location.state;

  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      skills: [""],
      experience: [
        {
          title: "",
          company: "",
          location: "",
          dates: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          location: "",
          dates: "",
          gpa: "",
        },
      ],
      projects: [
        {
          name: "",
          description: "",
          technologies: [""],
          link: "",
        },
      ],
      certifications: [],
      languages: [""],
      socialLinks: {
        linkedin: "",
        github: "",
        portfolio: "",
      },
      selectedTemplate: "",
    },
  });

  // Field arrays for complex sections only
  const experienceFieldArray = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const educationFieldArray = useFieldArray({
    control: form.control,
    name: "education",
  });

  const projectsFieldArray = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const certificationsFieldArray = useFieldArray({
    control: form.control,
    name: "certifications",
  });

  // Load initial data if provided
  useEffect(() => {
    const getAndSetInitialData = async () => {
      if (!docId) return; // Don't fetch if no docId

      try {
        const initialData: PortfolioData = await getPortfolioData(docId);
        console.log("Fetched data:", initialData);
        console.log("Type of fetched data", typeof(initialData))

        if (initialData && typeof initialData === "object") {
          const formData = {
            ...initialData,
            skills: initialData.skills?.length ? initialData.skills : [""],
            experience: initialData.experience?.length
              ? initialData.experience
              : [
                  {
                    title: "",
                    company: "",
                    location: "",
                    dates: "",
                    description: "",
                  },
                ],
            education: initialData.education?.length
              ? initialData.education
              : [
                  {
                    degree: "",
                    institution: "",
                    location: "",
                    dates: "",
                    gpa: "",
                  },
                ],
            projects: initialData.projects?.length
              ? initialData.projects
              : [
                  {
                    name: "",
                    description: "",
                    technologies: [""],
                    link: "",
                  },
                ],
            certifications: initialData.certifications?.length
              ? initialData.certifications
              : [],
            languages: initialData.languages?.length
              ? initialData.languages
              : [""],
            socialLinks: initialData.socialLinks || {
              linkedin: "",
              github: "",
              portfolio: "",
            },
          };

          console.log("Form data to reset with:", formData);
          form.reset(formData);
        }
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    getAndSetInitialData();
  }, [docId]);

  const handleSubmit = async (data: PortfolioFormData) => {
    setIsLoading(true);
    // TODO: Implement the function
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            {docId ? "Edit Portfolio" : "Create Portfolio"}
          </h1>
          <p className="text-muted">
            {docId
              ? "Update your portfolio information"
              : "Build your professional portfolio"}
          </p>
          {/* Debug info - remove in production */}
          {docId && (
            <p className="text-sm text-muted-foreground mt-2">
              Document ID: {docId}
            </p>
          )}
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <PersonalInfoSection form={form} />
          <SkillsSection form={form} />
          <ExperienceSection
            form={form}
            experienceFieldArray={experienceFieldArray}
          />
          <EducationSection
            form={form}
            educationFieldArray={educationFieldArray}
          />
          <ProjectsSection
            form={form}
            projectsFieldArray={projectsFieldArray}
          />
          <CertificationsSection
            form={form}
            certificationsFieldArray={certificationsFieldArray}
          />
          <LanguagesSection form={form} />
          <SocialLinksSection form={form} />
          <TemplateSection
            form={form}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />

          {/* Submit Section */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary-hover text-primary-foreground animate-pulse-glow"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  {docId ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {docId ? "Update Portfolio" : "Create Portfolio"}
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1 sm:flex-none"
              disabled={isLoading}
              onClick={handlePreview}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </form>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Portfolio Preview</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(false)}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Close
                </Button>
              </div>
              <div className="p-4">
                {(() => {
                  const formData = form.getValues();
                  const templateKey = (formData.selectedTemplate as TemplateKey) || 'modern';
                  const TemplateComponent = PORTFOLIO_TEMPLATES[templateKey] || PORTFOLIO_TEMPLATES.modern;
                  
                  return <TemplateComponent data={formData} />;
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioForm;
