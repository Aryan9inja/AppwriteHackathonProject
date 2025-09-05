import { z } from "zod";

export const portfolioSchema = z.object({
  portfolioName: z.string().min(1, "Portfolio name is required").max(100, "Portfolio name must be less than 100 characters"),
  name: z.string().min(1, "Full name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  summary: z.string().min(10, "Summary should be at least 10 characters"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  experience: z.array(z.object({
    title: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company name is required"),
    location: z.string().optional(),
    dates: z.string().min(1, "Date range is required"),
    description: z.string().min(1, "Description is required")
  })).optional(),
  education: z.array(z.object({
    degree: z.string().min(1, "Degree is required"),
    institution: z.string().min(1, "Institution is required"),
    location: z.string().optional(),
    dates: z.string().min(1, "Date range is required"),
    gpa: z.string().optional()
  })),
  projects: z.array(z.object({
    name: z.string().min(1, "Project name is required"),
    description: z.string().min(1, "Project description is required"),
    technologies: z.array(z.string()),
    link: z.string().optional()
  })),
  certifications: z.array(z.object({
    name: z.string().min(1, "Certification name is required"),
    issuer: z.string().min(1, "Issuer is required"),
    date: z.string().min(1, "Date is required")
  })),
  languages: z.array(z.string()),
  socialLinks: z.object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional()
  }),
  selectedTemplate: z.string().min(1, "Please select a template")
});

export type PortfolioFormData = z.infer<typeof portfolioSchema>;
