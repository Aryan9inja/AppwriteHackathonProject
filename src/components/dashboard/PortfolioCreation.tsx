import React, { useRef, useState } from "react";
import { Upload, FileText, User, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadResume } from "@/services/portfolio.services";
import { functions } from "@/lib/appwrite.config";
import { PARSE_RESUME_FUNC } from "@/constants/appwrite";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface JsonRes {
  docId: string;
}

const FullscreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 flex items-center justify-center animate-backdrop-fade-in">
      <div className="text-center space-y-8 p-8 max-w-md mx-auto">
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse animate-pulse-glow"></div>
          <div className="relative w-full h-full bg-background rounded-full flex items-center justify-center">
            <Upload className="w-10 h-10 text-primary animate-bounce" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <h2 className="text-xl font-semibold text-foreground">
              Processing Your Resume
            </h2>
          </div>
          <p className="text-muted text-sm max-w-sm mx-auto leading-relaxed">
            Our AI is analyzing your resume to create a stunning portfolio. This
            usually takes 10-30 seconds.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-1">
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const PortfolioCreation: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const handleResumeUpload = async (file: File) => {
    if (!user) return;

    setIsUploading(true);
    try {
      const fileId = await uploadResume(file);

      const requestBody = {
        userId: user.userId,
        fileId: fileId,
      };

      const result = await functions.createExecution({
        functionId: PARSE_RESUME_FUNC,
        body: JSON.stringify(requestBody),
      });
      
      const responseBody: string = result.responseBody;
      const resAsJson: JsonRes = JSON.parse(responseBody);

      navigate(`/portfolio/create`,{state:{docId:resAsJson.docId}});
    } catch (error) {
      toast.error("AI parsing failed")
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleResumeUpload(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleCreateFromScratch = () => {
    navigate("/portfolio/create",{state:{docId:"new"}});
  };

  return (
    <>
      {isUploading && <FullscreenLoader />}

      <div className="bg-card border border-border rounded-lg sm:rounded-xl p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center">
          <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary" />
          Create New Portfolio
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {/* Create with Resume */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-sm group-hover:blur-none transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            <div className="relative bg-card border-2 border-dashed border-muted hover:border-primary rounded-lg p-4 sm:p-6 transition-all duration-300 group-hover:shadow-lg touch-manipulation">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                    Upload Resume
                  </h3>
                  <p className="text-sm text-muted mb-3 sm:mb-4 leading-relaxed">
                    Let our AI create a stunning portfolio from your resume in
                    seconds
                  </p>
                </div>
                <Button
                  onClick={triggerFileUpload}
                  disabled={isUploading}
                  className="w-full h-11 sm:h-10 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resume (PDF)
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted">Or</span>
            </div>
          </div>

          {/* Create from Scratch */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-lg blur-sm group-hover:blur-none transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
            <div className="relative bg-card border-2 border-muted hover:border-secondary rounded-lg p-4 sm:p-6 transition-all duration-300 group-hover:shadow-lg touch-manipulation">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                    Start from Scratch
                  </h3>
                  <p className="text-sm text-muted mb-3 sm:mb-4 leading-relaxed">
                    Build your portfolio manually with our guided form builder
                  </p>
                </div>
                <Button
                  onClick={handleCreateFromScratch}
                  variant="outline"
                  className="w-full h-11 sm:h-10 border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 text-sm sm:text-base"
                >
                  <User className="w-4 h-4 mr-2" />
                  Create Manually
                </Button>
              </div>
            </div>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </>
  );
};

export default PortfolioCreation;
