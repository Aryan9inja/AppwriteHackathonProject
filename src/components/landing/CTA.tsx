import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24 bg-slate-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground dark:text-white mb-6">
            Ready to Build Your
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Dream Portfolio?
            </span>
          </h2>

          <p className="text-lg text-muted-foreground dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their careers with stunning portfolio websites.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover 
                       text-primary-foreground px-10 py-5 text-xl font-semibold rounded-xl
                       transform hover:scale-105 transition-all duration-300
                       shadow-xl hover:shadow-2xl hover:shadow-primary/30
                       dark:shadow-primary/20 dark:hover:shadow-primary/40"
            >
              Start Building Now
              <Sparkles className="ml-2 w-6 h-6" />
            </Button>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              No credit card required • Free to start
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
