import React from "react";
import { UseFormReturn, UseFieldArrayReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Award, Plus, Trash2 } from "lucide-react";
import { PortfolioFormData } from "@/schemas/portfolio.schema";

interface CertificationsSectionProps {
  form: UseFormReturn<PortfolioFormData>;
  certificationsFieldArray: UseFieldArrayReturn<PortfolioFormData, "certifications", "id">;
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ 
  form, 
  certificationsFieldArray 
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Award className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Certifications</h2>
      </div>
      
      <div className="space-y-4">
        {certificationsFieldArray.fields.map((field, index) => (
          <div key={field.id} className="border border-border rounded-lg p-4 bg-muted/20">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Certification {index + 1}</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => certificationsFieldArray.remove(index)}
                className="hover:bg-error hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Certification Name *</Label>
                <Input
                  {...form.register(`certifications.${index}.name`)}
                  placeholder="AWS Solutions Architect"
                />
              </div>
              <div className="space-y-2">
                <Label>Issuer *</Label>
                <Input
                  {...form.register(`certifications.${index}.issuer`)}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div className="space-y-2">
                <Label>Date Obtained *</Label>
                <Input
                  {...form.register(`certifications.${index}.date`)}
                  placeholder="March 2023"
                />
              </div>
            </div>
          </div>
        ))}
        {certificationsFieldArray.fields.length === 0 && (
          <p className="text-muted text-center py-4">No certifications added yet</p>
        )}
        <Button
          type="button"
          variant="outline"
          onClick={() => certificationsFieldArray.append({
            name: "",
            issuer: "",
            date: ""
          })}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Certification
        </Button>
      </div>
    </div>
  );
};

export default CertificationsSection;
