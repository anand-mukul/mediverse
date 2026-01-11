import type React from "react"
/**
 * Medical Card Component
 * Enhanced card component with medical-grade styling
 */

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

interface MedicalCardProps {
  title?: string
  description?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  elevated?: boolean
  interactive?: boolean
}

export function MedicalCard({
  title,
  description,
  children,
  footer,
  className,
  elevated = false,
  interactive = false,
}: MedicalCardProps) {
  return (
    <Card
      className={cn(
        "border-border/50",
        elevated && "card-elevated",
        interactive && "card-interactive cursor-pointer",
        className,
      )}
    >
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle className="text-xl font-semibold text-balance">{title}</CardTitle>}
          {description && <CardDescription className="text-muted-foreground">{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter className="border-t border-border/50 bg-muted/30">{footer}</CardFooter>}
    </Card>
  )
}
