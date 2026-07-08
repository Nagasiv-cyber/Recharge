import { GlassCard } from "@/components/ui/GlassCard"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-teal/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magenta-pulse/20 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="text-3xl font-black tech-heading hover:text-accent-teal transition-colors">
            Recharge
          </Link>
        </div>
        
        <GlassCard className="p-8">
          {children}
        </GlassCard>
      </div>
    </div>
  )
}
