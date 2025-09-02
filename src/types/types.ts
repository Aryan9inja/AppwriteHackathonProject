import type { Models } from "appwrite";

export interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface User {
  userId: string;
  username: string;
  name: string;
}

export interface UserDoc extends Models.DefaultRow {
  userId: string;
  username: string;
  name: string;
}

export interface Experience {
  title: string;
  company: string;
  location?: string;
  dates: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  dates: string;
  gpa?: string;
}

export interface Project {
  name: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface PortfolioData {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: string[];
  socialLinks: SocialLinks;
}

export interface PortfolioDoc extends Models.DefaultRow, PortfolioData {
  userId: string;
  data: string;
}
