import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignUpFormData } from "@/types/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "@/store/store";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, User, Lock, AlertCircle } from "lucide-react";
import { registerUserThunk } from "@/store/thunks/authThunk";

const SignupForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loadingType = useSelector((state: RootState) => state.auth.loadingType);
  const isLoading = loadingType === "signup"; // ✅ rely only on redux
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onInvalidSubmit = () => {
    const errors = form.formState.errors;
    if (errors.name) {
      toast.error("Name is required", {
        description: errors.name.message,
        duration: 4000,
      });
    } else if (errors.email) {
      toast.error("Invalid email", {
        description: errors.email.message,
        duration: 4000,
      });
    } else if (errors.password) {
      toast.error("Password issue", {
        description: errors.password.message,
        duration: 4000,
      });
    }
  };

  const onSubmit = async (data: SignUpFormData) => {
    // show loading toast first
    const loadingToast = toast.loading("Creating your account...", {
      description: "Please wait while we set up your portfolio website.",
    });

    try {
      await dispatch(registerUserThunk(data)).unwrap();

      toast.dismiss(loadingToast);
      toast.success("Account created successfully!", {
        description: "Welcome! Your portfolio website is ready to be built.",
        duration: 5000,
        action: {
          label: "Continue",
          onClick: () => navigate("/dashboard"),
        },
      });

      form.reset();
    } catch (error: any) {
      console.error(error);
      toast.dismiss(loadingToast);

      if (
        error?.code === 409 ||
        error?.message?.includes("user_already_exists") ||
        error?.message?.includes("already exists")
      ) {
        toast.error("Email already registered", {
          description:
            "This email is already associated with an account. Try signing in instead.",
          duration: 6000,
        });
      } else if (error?.code === 400 && error?.message?.includes("password")) {
        toast.error("Password requirements not met", {
          description:
            "Password must be at least 8 characters with letters and numbers.",
          duration: 6000,
        });
      } else if (error?.code === 400 && error?.message?.includes("email")) {
        toast.error("Invalid email format", {
          description: "Please enter a valid email address.",
          duration: 5000,
        });
      } else if (
        error?.message?.includes("network") ||
        error?.message?.includes("connection") ||
        error?.code === 500
      ) {
        toast.error("Connection failed", {
          description: "Please check your internet connection and try again.",
          duration: 6000,
        });
      } else if (error?.code === 429) {
        toast.error("Too many attempts", {
          description: "Please wait a moment before trying again.",
          duration: 7000,
        });
      } else {
        toast.error("Account creation failed", {
          description:
            error?.message ||
            "Something went wrong. Please try again in a moment.",
          duration: 6000,
        });
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFieldFocus = (fieldName: string) => {
    const errors = form.formState.errors;
    if (errors[fieldName as keyof typeof errors]) {
      toast.dismiss();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-card/80 backdrop-blur-sm shadow-2xl rounded-2xl p-6 sm:p-8 border border-border/50 transition-all duration-300 hover:shadow-3xl">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Create Account
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Build your portfolio website from your resume
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 block">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  placeholder="Enter your full name"
                  {...form.register("name")}
                  onFocus={() => handleFieldFocus("name")}
                  className={`pl-9 sm:pl-10 h-11 sm:h-12 border-2 rounded-xl transition-all duration-300 
                  ${
                    form.formState.errors.name
                      ? "border-error/50 focus:border-error focus:ring-error/20"
                      : "border-border/50 focus:border-primary focus:ring-primary/20"
                  } 
                  bg-background/50 text-foreground
                  placeholder:text-muted-foreground
                  focus:bg-background hover:border-primary/30
                  focus:shadow-lg focus:shadow-primary/10`}
                />
              </div>
              {form.formState.errors.name && (
                <p className="text-xs sm:text-sm text-error flex items-center space-x-1 animate-in slide-in-from-left-1 duration-300">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{form.formState.errors.name.message}</span>
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 block">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  placeholder="Enter your email"
                  type="email"
                  {...form.register("email")}
                  onFocus={() => handleFieldFocus("email")}
                  className={`pl-9 sm:pl-10 h-11 sm:h-12 border-2 rounded-xl transition-all duration-300 
                  ${
                    form.formState.errors.email
                      ? "border-error/50 focus:border-error focus:ring-error/20"
                      : "border-border/50 focus:border-primary focus:ring-primary/20"
                  } 
                  bg-background/50 text-foreground
                  placeholder:text-muted-foreground
                  focus:bg-background hover:border-primary/30
                  focus:shadow-lg focus:shadow-primary/10`}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-xs sm:text-sm text-error flex items-center space-x-1 animate-in slide-in-from-left-1 duration-300">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{form.formState.errors.email.message}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80 block">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <Input
                  placeholder="Create a strong password"
                  type={showPassword ? "text" : "password"}
                  {...form.register("password")}
                  onFocus={() => handleFieldFocus("password")}
                  className={`pl-9 sm:pl-10 pr-10 sm:pr-12 h-11 sm:h-12 border-2 rounded-xl transition-all duration-300 
                  ${
                    form.formState.errors.password
                      ? "border-error/50 focus:border-error focus:ring-error/20"
                      : "border-border/50 focus:border-primary focus:ring-primary/20"
                  } 
                  bg-background/50 text-foreground
                  placeholder:text-muted-foreground
                  focus:bg-background hover:border-primary/30
                  focus:shadow-lg focus:shadow-primary/10`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors duration-200 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-xs sm:text-sm text-error flex items-center space-x-1 animate-in slide-in-from-left-1 duration-300">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{form.formState.errors.password.message}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading || !form.formState.isValid}
              className="w-full h-11 sm:h-12 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary-hover 
                     text-primary-foreground font-semibold rounded-xl transition-all duration-300 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:ring-4 focus:ring-primary/25 shadow-lg hover:shadow-xl hover:shadow-primary/20
                     transform hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary-hover transition-colors duration-200 underline underline-offset-2"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
