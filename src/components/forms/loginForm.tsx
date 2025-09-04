import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/auth.schema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoginFormData } from "@/types/types";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { loginUserThunk } from "@/store/thunks/authThunk";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Mail, Lock, AlertCircle, LogIn } from "lucide-react";

const LoginForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loadingType = useSelector((state: RootState) => state.auth.loadingType);
  const isLoading = loadingType === "login"; // ✅ rely only on redux
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onInvalidSubmit = () => {
    const errors = form.formState.errors;
    if (errors.email) {
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

  const onSubmit = async (data: LoginFormData) => {
    // show loading toast first
    const loadingToast = toast.loading("Signing you in...", {
      description: "Please wait while we authenticate your account.",
    });

    try {
      await dispatch(loginUserThunk(data)).unwrap();

      toast.dismiss(loadingToast);
      toast.success("Welcome back!", {
        description: "You've been successfully signed in.",
        duration: 3000,
        action: {
          label: "Continue",
          onClick: () => {
            const redirectTo = location.state?.from?.pathname || "/dashboard";
            navigate(redirectTo);
          },
        },
      });

      // Redirect to intended route or dashboard
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo);
    } catch (error: unknown) {
      console.error(error);
      toast.dismiss(loadingToast);

      // Handle Appwrite specific errors
      const err = error as { code?: number; message?: string };
      if (
        err?.code === 401 ||
        err?.message?.includes("Invalid credentials") ||
        err?.message?.includes("unauthorized") ||
        err?.message?.includes("AppwriteException: Invalid credentials")
      ) {
        toast.error("Invalid credentials", {
          description:
            "The email or password you entered is incorrect. Please check your credentials and try again.",
          duration: 6000,
        });
      } else if (
        err?.code === 404 || 
        err?.message?.includes("not found") ||
        err?.message?.includes("User not found")
      ) {
        toast.error("Account not found", {
          description:
            "No account found with this email address. Please check your email or create a new account.",
          duration: 6000,
        });
      } else if (
        err?.code === 400 &&
        (err?.message?.includes("email") || err?.message?.includes("Email"))
      ) {
        toast.error("Invalid email format", {
          description: "Please enter a valid email address.",
          duration: 5000,
        });
      } else if (
        err?.code === 400 &&
        (err?.message?.includes("password") || err?.message?.includes("Password"))
      ) {
        toast.error("Password issue", {
          description: "Please check your password and try again.",
          duration: 5000,
        });
      } else if (
        err?.message?.includes("network") ||
        err?.message?.includes("connection") ||
        err?.message?.includes("fetch") ||
        err?.code === 500
      ) {
        toast.error("Connection failed", {
          description: "Please check your internet connection and try again.",
          duration: 6000,
        });
      } else if (err?.code === 429) {
        toast.error("Too many login attempts", {
          description: "Please wait a moment before trying to sign in again.",
          duration: 7000,
        });
      } else if (err?.message?.includes("AppwriteException")) {
        // Generic Appwrite error handling
        const cleanMessage = err.message.replace("AppwriteException:", "").trim();
        toast.error("Login failed", {
          description: cleanMessage || "An error occurred while signing in. Please try again.",
          duration: 6000,
        });
      } else {
        toast.error("Sign in failed", {
          description:
            err?.message ||
            "Something went wrong during sign in. Please try again in a moment.",
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
              <LogIn className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Sign in to access your portfolio dashboard
            </p>
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalidSubmit)}
            className="space-y-4 sm:space-y-6"
          >
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
                  placeholder="Enter your password"
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
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-primary hover:text-primary-hover transition-colors duration-200 underline underline-offset-2"
              >
                Create one here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
