import * as React from "react"
import { cn } from "@/lib/utils"

export function GlassCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("glass-card overflow-hidden", className)} {...props}>
      {children}
    </div>
  )
}
