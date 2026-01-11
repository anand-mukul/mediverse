import type React from "react"
/**
 * Section Header Component
 * Consistent section headers across the application
 */

import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function SectionHeader({ title, description, action, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-6", className)}>
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight text-balance">{title}</h2>
        {description && <p className="text-sm text-muted-foreground text-pretty">{description}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  )
}
