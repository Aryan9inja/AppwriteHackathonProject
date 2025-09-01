import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Linkedin, Github } from "lucide-react";
import { PortfolioFormData } from "@/schemas/portfolio.schema";

interface SocialLinksSectionProps {
  form: UseFormReturn<PortfolioFormData>;
}

const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({ form }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Social Links</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>LinkedIn</Label>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              {...form.register("socialLinks.linkedin")}
              placeholder="https://linkedin.com/in/username"
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>GitHub</Label>
          <div className="relative">
            <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              {...form.register("socialLinks.github")}
              placeholder="https://github.com/username"
              className="pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Portfolio Website</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              {...form.register("socialLinks.portfolio")}
              placeholder="https://yourportfolio.com"
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinksSection;
