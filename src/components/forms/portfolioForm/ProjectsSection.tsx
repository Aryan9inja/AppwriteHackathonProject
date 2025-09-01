import React from "react";
import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Code, Plus, Trash2 } from "lucide-react";
import { PortfolioFormData } from "@/schemas/portfolio.schema";

interface ProjectsSectionProps {
  form: UseFormReturn<PortfolioFormData>;
  projectsFieldArray: UseFieldArrayReturn<PortfolioFormData, "projects", "id">;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  form, 
  projectsFieldArray 
}) => {
  const addProjectTechnology = (projectIndex: number) => {
    const currentProject = form.getValues(`projects.${projectIndex}`);
    const updatedTechnologies = [...currentProject.technologies, ""];
    form.setValue(`projects.${projectIndex}.technologies`, updatedTechnologies);
  };

  const removeProjectTechnology = (projectIndex: number, techIndex: number) => {
    const currentProject = form.getValues(`projects.${projectIndex}`);
    const updatedTechnologies = currentProject.technologies.filter((_, index) => index !== techIndex);
    form.setValue(`projects.${projectIndex}.technologies`, updatedTechnologies);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Code className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Projects</h2>
      </div>
      
      <div className="space-y-6">
        {projectsFieldArray.fields.map((field, index) => (
          <div key={field.id} className="border border-border rounded-lg p-4 bg-muted/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Project {index + 1}</h3>
              {projectsFieldArray.fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => projectsFieldArray.remove(index)}
                  className="hover:bg-error hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Project Name *</Label>
                <Input
                  {...form.register(`projects.${index}.name`)}
                  placeholder="Project Name"
                />
              </div>
              <div className="space-y-2">
                <Label>Project Link</Label>
                <Input
                  {...form.register(`projects.${index}.link`)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <Label>Description *</Label>
              <textarea
                {...form.register(`projects.${index}.description`)}
                placeholder="Describe your project..."
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
              />
            </div>

            <div className="mt-4">
              <Label>Technologies Used</Label>
              <div className="space-y-2 mt-2">
                {form.watch(`projects.${index}.technologies`)?.map((_, techIndex) => (
                  <div key={techIndex} className="flex gap-2">
                    <Input
                      {...form.register(`projects.${index}.technologies.${techIndex}`)}
                      placeholder="Technology name"
                    />
                    {form.watch(`projects.${index}.technologies`)?.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeProjectTechnology(index, techIndex)}
                        className="hover:bg-error hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addProjectTechnology(index)}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Technology
                </Button>
              </div>
            </div>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() => projectsFieldArray.append({
            name: "",
            description: "",
            technologies: [""],
            link: ""
          })}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectsSection;
