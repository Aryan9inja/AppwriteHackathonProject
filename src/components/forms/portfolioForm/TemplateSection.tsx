import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Eye } from "lucide-react";
import { PortfolioFormData } from "@/schemas/portfolio.schema";
import { TEMPLATE_METADATA } from "@/components/portfolioTemplates";

interface TemplateSectionProps {
  form: UseFormReturn<PortfolioFormData>;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
}

const TemplateSection: React.FC<TemplateSectionProps> = ({ 
  form, 
  selectedTemplate, 
  setSelectedTemplate 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Choose Template</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(TEMPLATE_METADATA).map(([templateId, template]) => (
          <div
            key={templateId}
            className={`border-2 rounded-lg p-3 cursor-pointer transition-all hover-lift ${
              selectedTemplate === templateId
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => {
              setSelectedTemplate(templateId);
              form.setValue("selectedTemplate", templateId);
            }}
          >
            {/* Template Preview */}
            <div className={`aspect-[3/4] rounded-md mb-3 relative overflow-hidden ${template.color}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-600 font-bold text-lg opacity-75">
                  {template.name}
                </div>
              </div>
              {/* Preview skeleton based on template type */}
              <div className="absolute bottom-2 left-2 right-2">
                <div className="space-y-1">
                  <div className="h-1 bg-white/30 rounded w-3/4"></div>
                  <div className="h-1 bg-white/20 rounded w-1/2"></div>
                  <div className="mt-1 grid grid-cols-2 gap-1">
                    <div className="h-2 bg-white/25 rounded"></div>
                    <div className="h-2 bg-white/25 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="font-medium text-sm">{template.name}</h3>
              <p className="text-xs text-muted mt-1">{template.description}</p>
            </div>
            
            {selectedTemplate === templateId && (
              <div className="mt-2 flex justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <input type="hidden" {...form.register("selectedTemplate")} />
      {form.formState.errors.selectedTemplate && (
        <p className="text-sm text-error mt-2">{form.formState.errors.selectedTemplate.message}</p>
      )}
    </div>
  );
};

export default TemplateSection;
