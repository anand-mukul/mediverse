/**
 * Medical-grade loading spinner component
 * Accessible with proper ARIA labels
 */

import { cn } from "@/lib/utils"



interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  label?: string
}

export function LoadingSpinner({ size = "md", className, label = "Loading..." }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
    xl: "h-16 w-16 border-4",
  }

  return (
    <div className={cn("flex items-center justify-center", className)} role="status" aria-label={label}>
      <div className={cn("animate-spin rounded-full border-primary border-t-transparent", sizeClasses[size])} />
      <span className="sr-only">{label}</span>
    </div>
  )
}
