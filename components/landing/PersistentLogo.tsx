"use client"

import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

export function PersistentLogo() {
  const pathname = usePathname()
  const router = useRouter()

  const goHome = () => {
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      router.push("/")
    }
  }

  return (
    <div 
      onClick={goHome}
      className="fixed top-5 left-5 z-[150] w-12 h-12 rounded-2xl overflow-hidden cursor-pointer shadow-lg border border-white/20 transition-all duration-200 hover:scale-110 hover:shadow-2xl bg-white/10 flex items-center justify-center group"
    >
      <Image src="/logo.jpg" alt="Recharge Logo" fill className="object-cover mix-blend-screen group-hover:scale-110 transition-transform duration-300" unoptimized />
    </div>
  )
}
