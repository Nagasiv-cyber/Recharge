"use client"

import Link from "next/link"
import { MessageCircle, User } from "lucide-react"
import { useAppStore } from "@/store/useStore"
import { useEffect, useState } from "react"

export function TopBar() {
  const matches = useAppStore((state) => state.matches)
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="fixed top-5 right-5 z-[100] flex gap-3">
      <Link
        href="/matches"
        className="relative w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center text-white transition-transform hover:scale-105"
        title="Your Matches"
      >
        <MessageCircle size={22} />
        {mounted && matches.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-accent-coral text-white text-[0.65rem] font-black min-w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-[#170a29]">
            {matches.length}
          </span>
        )}
      </Link>
      
      <Link
        href="/profile"
        className="relative w-[50px] h-[50px] rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex items-center justify-center text-white transition-transform hover:scale-105"
        title="Your Profile"
      >
        <User size={22} />
      </Link>
    </div>
  )
}
