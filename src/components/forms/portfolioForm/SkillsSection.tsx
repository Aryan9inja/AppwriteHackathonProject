import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Code, Plus, Trash2 } from "lucide-react";
import { PortfolioFormData } from "@/schemas/portfolio.schema";

interface SkillsSectionProps {
  form: UseFormReturn<PortfolioFormData>;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ form }) => {
  const addSkill = () => {
    const currentSkills = form.getValues("skills");
    form.setValue("skills", [...currentSkills, ""]);
  };

  const removeSkill = (index: number) => {
    const currentSkills = form.getValues("skills");
    form.setValue("skills", currentSkills.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Code className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Skills</h2>
      </div>
      
      <div className="space-y-3">
        {form.watch("skills").map((_, index) => (
          <div key={index} className="flex gap-2">
            <Input
              {...form.register(`skills.${index}`)}
              placeholder="Enter a skill"
            />
            {form.watch("skills").length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeSkill(index)}
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
          onClick={addSkill}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Skill
        </Button>
      </div>
      {form.formState.errors.skills && (
        <p className="text-sm text-error mt-2">{form.formState.errors.skills.message}</p>
      )}
    </div>
  );
};

export default SkillsSection;
