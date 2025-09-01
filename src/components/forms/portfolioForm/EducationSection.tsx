import React from "react";
import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GraduationCap, Plus, Trash2 } from "lucide-react";
import { PortfolioFormData } from "@/schemas/portfolio.schema";

interface EducationSectionProps {
  form: UseFormReturn<PortfolioFormData>;
  educationFieldArray: UseFieldArrayReturn<PortfolioFormData, "education", "id">;
}

const EducationSection: React.FC<EducationSectionProps> = ({ 
  form, 
  educationFieldArray 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Education</h2>
      </div>
      
      <div className="space-y-6">
        {educationFieldArray.fields.map((field, index) => (
          <div key={field.id} className="border border-border rounded-lg p-4 bg-muted/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Education {index + 1}</h3>
              {educationFieldArray.fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => educationFieldArray.remove(index)}
                  className="hover:bg-error hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Degree *</Label>
                <Input
                  {...form.register(`education.${index}.degree`)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div className="space-y-2">
                <Label>Institution *</Label>
                <Input
                  {...form.register(`education.${index}.institution`)}
                  placeholder="University Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  {...form.register(`education.${index}.location`)}
                  placeholder="City, State"
                />
              </div>
              <div className="space-y-2">
                <Label>Date Range *</Label>
                <Input
                  {...form.register(`education.${index}.dates`)}
                  placeholder="2018 - 2022"
                />
              </div>
              <div className="space-y-2">
                <Label>GPA</Label>
                <Input
                  {...form.register(`education.${index}.gpa`)}
                  placeholder="3.8"
                />
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => educationFieldArray.append({
            degree: "",
            institution: "",
            location: "",
            dates: "",
            gpa: ""
          })}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>
    </div>
  );
};

export default EducationSection;
