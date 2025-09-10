import { ArrowRight, Users, Star, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-20 dark:bg-black">
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Transform Your{" "}
          <span className="text-primary dark:text-purple-400">
            Resume
          </span>
          <br />
          Into a Stunning{" "}
          <span className="text-secondary dark:text-pink-400">
            Portfolio
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Upload your resume and watch as AI creates a beautiful, professional portfolio website 
          in seconds. Stand out from the crowd and land your dream job.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => navigate("/signup")}
            className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl
                     transform hover:scale-105 transition-all duration-300
                     shadow-lg hover:shadow-xl hover:shadow-primary/25
                     dark:shadow-primary/20 dark:hover:shadow-primary/30"
          >
            Create Your Portfolio
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 flex items-center justify-center space-x-8 text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">10,000+ Users</span>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-warning" />
            <span className="text-sm font-medium">4.9/5 Rating</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span className="text-sm font-medium">&lt; 30 Seconds</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
