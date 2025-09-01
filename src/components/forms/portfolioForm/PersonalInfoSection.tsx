import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MapPin, FileText } from "lucide-react";
import { PortfolioFormData } from "@/schemas/portfolio.schema";

interface PersonalInfoSectionProps {
  form: UseFormReturn<PortfolioFormData>;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ form }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Personal Information</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            {...form.register("name")}
            placeholder="Enter your full name"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-error">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              placeholder="your.email@example.com"
              className="pl-10"
            />
          </div>
          {form.formState.errors.email && (
            <p className="text-sm text-error">{form.formState.errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              id="phone"
              {...form.register("phone")}
              placeholder="+1 (555) 123-4567"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
            <Input
              id="location"
              {...form.register("location")}
              placeholder="City, State/Country"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Label htmlFor="summary">Professional Summary *</Label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted" />
          <textarea
            id="summary"
            {...form.register("summary")}
            placeholder="Write a brief professional summary about yourself..."
            className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 pl-10 text-base shadow-xs placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none"
          />
        </div>
        {form.formState.errors.summary && (
          <p className="text-sm text-error">{form.formState.errors.summary.message}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInfoSection;
