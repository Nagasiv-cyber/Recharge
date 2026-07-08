import * as React from "react"
import { cn } from "@/lib/utils"

export interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string
}

export function Avatar({ className, alt, fallback, ...props }: AvatarProps) {
  const [hasError, setHasError] = React.useState(false)

  if (hasError || !props.src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full bg-white/20 font-bold uppercase text-white",
          className
        )}
      >
        {fallback || alt?.charAt(0) || "?"}
      </div>
    )
  }

  return (
    <img
      className={cn("rounded-full object-cover", className)}
      alt={alt}
      onError={() => setHasError(true)}
      {...props}
    />
  )
}
