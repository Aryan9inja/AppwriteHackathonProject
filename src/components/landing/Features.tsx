import { CheckCircle } from "lucide-react";

const benefits = [
  "AI-powered content extraction from resumes",
  "Professional templates designed by experts",
  "Mobile-responsive and fast-loading websites",
  "SEO optimized for better visibility",
  "Custom domain support",
  "Analytics and visitor tracking",
];

const Features = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-muted/5 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Side */}
        <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white mb-6">
            Why Choose Our Platform?
          </h2>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 animate-in fade-in slide-in-from-left-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CheckCircle className="w-6 h-6 text-success flex-shrink-0" />
                <span className="text-muted-foreground dark:text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Side */}
        <div className="animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl dark:bg-primary/5"></div>
            <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 border border-border/50 shadow-2xl dark:bg-gray-900/80 dark:border-gray-700/50 dark:shadow-xl">
              <div className="space-y-4">
                <div className="h-4 bg-primary/30 rounded w-3/4 animate-pulse dark:bg-primary/25"></div>
                <div className="h-4 bg-muted/30 rounded w-1/2 animate-pulse delay-100 dark:bg-gray-700/30"></div>
                <div className="h-4 bg-muted/30 rounded w-2/3 animate-pulse delay-200 dark:bg-gray-700/30"></div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="h-20 bg-primary/10 rounded-lg animate-pulse delay-300 dark:bg-primary/15"></div>
                  <div className="h-20 bg-secondary/10 rounded-lg animate-pulse delay-400 dark:bg-secondary/15"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
