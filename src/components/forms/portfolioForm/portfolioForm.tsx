import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  portfolioSchema,
  type PortfolioFormData,
} from "@/schemas/portfolio.schema";
import { Button } from "@/components/ui/button";
import { Save, Eye } from "lucide-react";

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

interface PortfolioFormProps {
  documentId?: string;
  initialData?: Partial<PortfolioFormData>;
  onSubmit: (data: PortfolioFormData) => Promise<void>;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({
  documentId,
  initialData,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

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
    if (initialData) {
      form.reset({
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
        languages: initialData.languages?.length ? initialData.languages : [""],
        socialLinks: initialData.socialLinks || {
          linkedin: "",
          github: "",
          portfolio: "",
        },
        selectedTemplate: initialData.selectedTemplate || "",
      });
      setSelectedTemplate(initialData.selectedTemplate || "");
    }
  }, [initialData, form]);

  const handleSubmit = async (data: PortfolioFormData) => {
    setIsLoading(true);
    try {
      // Filter out empty strings from arrays
      const cleanedData = {
        ...data,
        skills: data.skills.filter((skill) => skill.trim() !== ""),
        languages: data.languages.filter((lang) => lang.trim() !== ""),
        experience: data.experience.filter(
          (exp) => exp.title.trim() !== "" || exp.company.trim() !== ""
        ),
        education: data.education.filter(
          (edu) => edu.degree.trim() !== "" || edu.institution.trim() !== ""
        ),
        projects: data.projects
          .filter(
            (proj) => proj.name.trim() !== "" || proj.description.trim() !== ""
          )
          .map((proj) => ({
            ...proj,
            technologies: proj.technologies.filter(
              (tech) => tech.trim() !== ""
            ),
          })),
        certifications: data.certifications.filter(
          (cert) => cert.name.trim() !== "" || cert.issuer.trim() !== ""
        ),
      };

      await onSubmit(cleanedData);
    } catch (error) {
      console.error("Error submitting portfolio:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            {documentId ? "Edit Portfolio" : "Create Portfolio"}
          </h1>
          <p className="text-muted">
            {documentId
              ? "Update your portfolio information"
              : "Build your professional portfolio"}
          </p>
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
                  {documentId ? "Updating..." : "Creating..."}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {documentId ? "Update Portfolio" : "Create Portfolio"}
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1 sm:flex-none"
              disabled={isLoading}
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioForm;
