import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Globe, Plus, Trash2 } from "lucide-react";
import { PortfolioFormData } from "@/schemas/portfolio.schema";

interface LanguagesSectionProps {
  form: UseFormReturn<PortfolioFormData>;
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ form }) => {
  const addLanguage = () => {
    const currentLanguages = form.getValues("languages");
    form.setValue("languages", [...currentLanguages, ""]);
  };

  const removeLanguage = (index: number) => {
    const currentLanguages = form.getValues("languages");
    form.setValue("languages", currentLanguages.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Languages</h2>
      </div>
      
      <div className="space-y-3">
        {form.watch("languages").map((_, index) => (
          <div key={index} className="flex gap-2">
            <Input
              {...form.register(`languages.${index}`)}
              placeholder="Enter a language"
            />
            {form.watch("languages").length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeLanguage(index)}
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
          onClick={addLanguage}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Language
        </Button>
      </div>
    </div>
  );
};

export default LanguagesSection;
