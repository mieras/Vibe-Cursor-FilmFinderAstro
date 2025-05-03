import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      data-slot="badge"
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default" && "bg-primary text-primary-foreground border-transparent",
        variant === "secondary" && "bg-secondary text-secondary-foreground border-transparent",
        variant === "outline" && "text-foreground border-border",
        className
      )}
      {...props}
    />
  )
} 