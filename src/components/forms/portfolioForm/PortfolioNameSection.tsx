import React from "react";
import { UseFormReturn } from "react-hook-form";
import { PortfolioFormData } from "@/schemas/portfolio.schema";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";

interface PortfolioNameSectionProps {
  form: UseFormReturn<PortfolioFormData>;
}

const PortfolioNameSection: React.FC<PortfolioNameSectionProps> = ({ form }) => {
  return (
    <div className="bg-card p-6 rounded-lg border border-border space-y-4">
      <h2 className="text-xl font-semibold text-card-foreground mb-4">
        Portfolio Name
      </h2>
      
      <FormField
        control={form.control}
        name="portfolioName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Portfolio Name</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g., My Main Portfolio, Work Portfolio, Creative Portfolio"
                {...field}
              />
            </FormControl>
            <FormDescription>
              This name will only be shown on your dashboard to help you identify this portfolio.
              It won't appear on the actual portfolio page.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PortfolioNameSection;
