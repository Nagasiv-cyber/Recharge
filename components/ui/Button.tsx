import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "glass" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-accent-teal text-black hover:bg-teal-400": variant === "default",
            "glass-card hover:bg-white/10": variant === "glass",
            "border border-white/20 bg-transparent hover:bg-white/10": variant === "outline",
            "hover:bg-white/10 hover:text-white": variant === "ghost",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
