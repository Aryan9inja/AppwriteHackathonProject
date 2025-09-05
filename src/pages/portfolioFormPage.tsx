import React, { useState, useEffect } from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  portfolioSchema,
  type PortfolioFormData,
} from "@/schemas/portfolio.schema";
import { Button } from "@/components/ui/button";
import { Save, Eye, X } from "lucide-react";
import {
  PORTFOLIO_TEMPLATES,
  TemplateKey,
} from "@/components/portfolioTemplates";

// Import modular sections
import PortfolioNameSection from "@/components/forms/portfolioForm/PortfolioNameSection";
import PersonalInfoSection from "@/components/forms/portfolioForm/PersonalInfoSection";
import SkillsSection from "@/components/forms/portfolioForm/SkillsSection";
import ExperienceSection from "@/components/forms/portfolioForm/ExperienceSection";
import EducationSection from "@/components/forms/portfolioForm/EducationSection";
import ProjectsSection from "@/components/forms/portfolioForm/ProjectsSection";
import CertificationsSection from "@/components/forms/portfolioForm/CertificationsSection";
import LanguagesSection from "@/components/forms/portfolioForm/LanguagesSection";
import SocialLinksSection from "@/components/forms/portfolioForm/SocialLinksSection";
import TemplateSection from "@/components/forms/portfolioForm/TemplateSection";
import { PortfolioData } from "@/types/types";
import {
  createPortfolioFromScratch,
  getPortfolioData,
  savePortfolioData,
} from "@/services/portfolio.services";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const PortfolioForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const location = useLocation();
  let { docId } = location.state;
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.auth.user?.userId!);

  const form = useForm<PortfolioFormData>({
    resolver: zodResolver(portfolioSchema),
    defaultValues: {
      portfolioName: "",
      name: "",
      email: "",
      phone: "",
      location: "",
      summary: "",
      skills: [""],
      experience: [],
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

  useEffect(() => {
    const getAndSetInitialData = async () => {
      if (!docId || docId=="new") {
        console.log("You")
        return;
      }

      try {
        const initialData: PortfolioData = await getPortfolioData(docId);

        if (initialData && typeof initialData === "object") {
          const formData = {
            ...initialData,
            skills: initialData.skills?.length ? initialData.skills : [""],
            experience: initialData.experience?.length
              ? initialData.experience
              : [],
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
        if (error instanceof SyntaxError && error.message.includes("JSON")) {
          toast.error("AI working failed, try again or do manually");
        } else {
          toast.error("Could not get data. Try again");
        }
      }
    };

    getAndSetInitialData();
  }, [docId]);

  const handleSubmit = async (data: PortfolioFormData) => {
    setIsLoading(true);
    try {
      if (!docId || docId === "new") {
        docId = await createPortfolioFromScratch(
          data,
          selectedTemplate,
          data.portfolioName,
          userId
        );
      } else {
        await savePortfolioData(
          docId,
          data,
          selectedTemplate,
          data.portfolioName
        );
      }

      navigate(`/portfolio/${docId}`, { replace: true });
    } catch (error) {
      toast.error("Could not save data. Try again");
    }
    setIsLoading(false);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            {docId ? "Edit Portfolio Data" : "Add Portfolio Data"}
          </h1>
          <p className="text-muted">
            {docId
              ? "Update your portfolio information"
              : "Build your professional portfolio"}
          </p>
        </div>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <PortfolioNameSection form={form} />
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
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Create Portfolio
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
        </FormProvider>

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
                  const templateKey =
                    (formData.selectedTemplate as TemplateKey) || "modern";
                  const TemplateComponent =
                    PORTFOLIO_TEMPLATES[templateKey] ||
                    PORTFOLIO_TEMPLATES.modern;

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
