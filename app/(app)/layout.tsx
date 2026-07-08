"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Zap, BookOpen, Compass, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/match", icon: Zap, label: "Match" },
  { href: "/study-hub", icon: BookOpen, label: "Study Hub" },
  { href: "/guides", icon: Compass, label: "Guides" },
  { href: "/onboard", icon: UserPlus, label: "Join" },
]

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen pb-[100px] relative" style={{ background: 'linear-gradient(135deg, #0d0020 0%, #1a0035 40%, #0f001a 100%)' }}>
      {/* Ambient purple glows */}
      <div className="fixed top-0 left-0 w-[50vw] h-[50vh] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, rgba(140,60,220,0.12) 0%, transparent 70%)' }} />
      <div className="fixed bottom-0 right-0 w-[40vw] h-[40vh] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse, rgba(80,20,180,0.1) 0%, transparent 70%)' }} />

      <main className="max-w-6xl mx-auto p-4 md:p-8 relative z-10">
        {children}
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <nav className="glass-nav flex items-center px-5 py-3 gap-1 sm:gap-4">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center min-w-[56px] p-2 rounded-xl transition-all duration-200",
                  isActive
                    ? "text-purple-300 bg-purple-500/20"
                    : "text-white/50 hover:text-white hover:bg-white/10"
                )}
              >
                <item.icon className={cn("w-5 h-5 mb-1 transition-transform", isActive && "scale-110")} />
                <span className="text-[10px] font-medium tracking-wide font-sans">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
