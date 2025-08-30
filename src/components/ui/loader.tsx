import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const loaderVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "text-primary",
        secondary: "text-secondary",
        muted: "text-muted",
      },
      size: {
        sm: "w-4 h-4",
        default: "w-6 h-6",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof loaderVariants> {
  type?: "spinner" | "dots" | "pulse" | "gradient"
}

const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  ({ className, variant, size, type = "spinner", ...props }, ref) => {
    const loaderClass = cn(loaderVariants({ variant, size, className }))

    if (type === "spinner") {
      return (
        <div ref={ref} className={loaderClass} {...props}>
          <svg
            className="animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )
    }

    if (type === "dots") {
      return (
        <div ref={ref} className={cn(loaderClass, "space-x-1")} {...props}>
          <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
        </div>
      )
    }

    if (type === "pulse") {
      return (
        <div ref={ref} className={loaderClass} {...props}>
          <div className="w-full h-full bg-current rounded-full animate-pulse" />
        </div>
      )
    }

    if (type === "gradient") {
      return (
        <div ref={ref} className={cn(loaderClass, "relative")} {...props}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin opacity-75" />
          <div className="absolute inset-1 rounded-full bg-background" />
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      )
    }

    return null
  }
)

Loader.displayName = "Loader"

// Full screen loader component for app-wide loading states
interface FullScreenLoaderProps {
  message?: string
  variant?: "default" | "secondary" | "muted"
  type?: "spinner" | "dots" | "pulse" | "gradient"
}

const FullScreenLoader = React.forwardRef<HTMLDivElement, FullScreenLoaderProps>(
  ({ message = "Loading...", variant = "default", type = "gradient" }, ref) => {
    return (
      <div 
        ref={ref}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in"
      >
        <div className="flex flex-col items-center space-y-4 p-8 bg-card rounded-xl border shadow-lg animate-scale-in">
          <Loader variant={variant} size="xl" type={type} />
          <div className="text-center">
            <p className="text-foreground font-medium">{message}</p>
            <p className="text-muted text-sm mt-1">Please wait a moment</p>
          </div>
        </div>
      </div>
    )
  }
)

FullScreenLoader.displayName = "FullScreenLoader"

// Loading skeleton component for inline loading states
interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
  width?: "full" | "3/4" | "1/2" | "1/4"
  height?: "sm" | "default" | "lg"
}

const LoadingSkeleton = React.forwardRef<HTMLDivElement, LoadingSkeletonProps>(
  ({ className, lines = 3, width = "full", height = "default", ...props }, ref) => {
    const lineHeight = {
      sm: "h-3",
      default: "h-4",
      lg: "h-6"
    }[height]

    const lineWidth = {
      full: "w-full",
      "3/4": "w-3/4",
      "1/2": "w-1/2", 
      "1/4": "w-1/4"
    }[width]

    return (
      <div ref={ref} className={cn("space-y-3 animate-fade-in", className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "bg-muted rounded animate-shimmer",
              lineHeight,
              i === lines - 1 ? "w-2/3" : lineWidth
            )}
          />
        ))}
      </div>
    )
  }
)

LoadingSkeleton.displayName = "LoadingSkeleton"

// eslint-disable-next-line react-refresh/only-export-components
export { Loader, FullScreenLoader, LoadingSkeleton, loaderVariants }
export type { LoaderProps, FullScreenLoaderProps, LoadingSkeletonProps }
