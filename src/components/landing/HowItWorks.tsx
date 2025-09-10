import { useEffect, useState } from "react";
import { Upload, Palette, Code, Globe } from "lucide-react";

const features = [
  {
    icon: <Upload className="w-8 h-8" />,
    title: "Upload Your Resume",
    description: "Simply upload your existing resume and let our AI extract all the information",
  },
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Choose Your Style",
    description: "Pick from beautiful, professional templates designed to showcase your skills",
  },
  {
    icon: <Code className="w-8 h-8" />,
    title: "Instant Generation",
    description: "Watch as your portfolio website is created in seconds with your content",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Publish & Share",
    description: "Get a live URL to share with employers and showcase your professional brand",
  },
];

const HowItWorks = () => {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 dark:bg-black">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white mb-4">How It Works</h2>
        <p className="text-lg text-muted-foreground dark:text-gray-300 max-w-2xl mx-auto">
          Four simple steps to create your professional portfolio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`relative group p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm
                        transition-all duration-500 hover:shadow-xl hover:shadow-primary/10
                        hover:border-primary/30 hover:bg-card/80
                        dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-700 
                        dark:hover:border-primary/40 dark:hover:shadow-primary/20
                        ${currentFeature === index ? "ring-2 ring-primary/50 shadow-lg shadow-primary/20 dark:ring-primary/60 dark:shadow-primary/30" : ""}`}
          >
            <div className={`w-16 h-16 rounded-xl bg-primary 
                           flex items-center justify-center mb-4 text-primary-foreground
                           transform transition-transform duration-300 group-hover:scale-110
                           shadow-lg dark:shadow-primary/20 dark:bg-primary
                           ${currentFeature === index ? "scale-110" : ""}`}>
              {feature.icon}
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-secondary 
                           rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold
                           shadow-md dark:shadow-primary/20 dark:bg-secondary">
              {index + 1}
            </div>
            <h3 className="text-xl font-semibold text-foreground dark:text-white mb-2">{feature.title}</h3>
            <p className="text-muted-foreground dark:text-gray-300 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
