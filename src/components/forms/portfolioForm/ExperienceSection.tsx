import React from "react";
import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import { PortfolioFormData } from "@/schemas/portfolio.schema";

interface ExperienceSectionProps {
  form: UseFormReturn<PortfolioFormData>;
  experienceFieldArray: UseFieldArrayReturn<PortfolioFormData, "experience", "id">;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ 
  form, 
  experienceFieldArray 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Work Experience</h2>
      </div>
      
      <div className="space-y-6">
        {experienceFieldArray.fields.map((field, index) => (
          <div key={field.id} className="border border-border rounded-lg p-4 bg-muted/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Experience {index + 1}</h3>
              {experienceFieldArray.fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => experienceFieldArray.remove(index)}
                  className="hover:bg-error hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Title *</Label>
                <Input
                  {...form.register(`experience.${index}.title`)}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label>Company *</Label>
                <Input
                  {...form.register(`experience.${index}.company`)}
                  placeholder="Company Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  {...form.register(`experience.${index}.location`)}
                  placeholder="City, State"
                />
              </div>
              <div className="space-y-2">
                <Label>Date Range *</Label>
                <Input
                  {...form.register(`experience.${index}.dates`)}
                  placeholder="Jan 2020 - Present"
                />
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <Label>Description *</Label>
              <textarea
                {...form.register(`experience.${index}.description`)}
                placeholder="Describe your responsibilities and achievements..."
                className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => experienceFieldArray.append({
            title: "",
            company: "",
            location: "",
            dates: "",
            description: ""
          })}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>
    </div>
  );
};

export default ExperienceSection;
