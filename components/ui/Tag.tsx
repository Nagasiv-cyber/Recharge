import * as React from "react"
import { cn } from "@/lib/utils"

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "strong" | "weak"
}

export function Tag({ className, variant = "default", ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider",
        {
          "bg-white/10 text-white border border-white/20": variant === "default",
          "bg-[rgba(78,205,196,0.15)] text-accent-teal border border-accent-teal/50": variant === "strong",
          "bg-[rgba(255,107,107,0.15)] text-accent-coral border border-accent-coral/50": variant === "weak",
        },
        className
      )}
      {...props}
    />
  )
}
