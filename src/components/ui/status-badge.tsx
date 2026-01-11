import type React from "react"
/**
 * Status Badge Component
 * Used for appointment status, device status, etc.
 */

import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "success" | "warning" | "error" | "info" | "neutral"
  children: React.ReactNode
  className?: string
  showDot?: boolean
}

export function StatusBadge({ status, children, className, showDot = true }: StatusBadgeProps) {
  const statusStyles = {
    success: "bg-success/10 text-success border-success/20 dark:bg-success/20 dark:text-success",
    warning: "bg-warning/10 text-warning-foreground border-warning/20 dark:bg-warning/20 dark:text-warning",
    error: "bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:text-destructive",
    info: "bg-info/10 text-info border-info/20 dark:bg-info/20 dark:text-info",
    neutral: "bg-muted text-muted-foreground border-border dark:bg-muted dark:text-muted-foreground",
  }

  const dotStyles = {
    success: "bg-success dark:bg-success",
    warning: "bg-warning dark:bg-warning",
    error: "bg-destructive dark:bg-destructive",
    info: "bg-info dark:bg-info",
    neutral: "bg-muted-foreground dark:bg-muted-foreground",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        statusStyles[status],
        className,
      )}
    >
      {showDot && <span className={cn("h-1.5 w-1.5 rounded-full", dotStyles[status])} />}
      {children}
    </span>
  )
}
