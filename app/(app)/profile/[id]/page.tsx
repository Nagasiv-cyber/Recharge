"use client"

import { DEMO_PROFILES } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, MessageCircle } from "lucide-react"
import { use } from "react"

export default function PublicProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const matchId = parseInt(resolvedParams.id, 10)
  const profile = DEMO_PROFILES.find((p) => p.id === matchId)
  
  if (!profile) {
    notFound()
  }

  const strongTags = profile.strong.split("•").map((t) => t.trim())
  const weakTags = profile.weak.split("•").map((t) => t.trim())

  return (
    <div className="pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto pb-32">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-8 px-4">
        <Link href="/matches" className="flex items-center gap-2 text-white/70 hover:text-accent-teal transition-colors">
          <ChevronLeft className="w-6 h-6" />
          <span className="font-semibold text-sm">Back</span>
        </Link>
      </div>

      {/* Main Profile Card */}
      <div className="relative overflow-hidden bg-white/5 border border-white/10 rounded-[32px] p-8 backdrop-blur-xl shadow-2xl mx-4">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-accent-teal/20 to-transparent opacity-50 pointer-events-none" />
        
        <div className="flex flex-col items-center text-center relative z-10">
          {/* Profile Image */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[#170a29] shadow-xl mb-5">
            <Image 
              src={profile.img} 
              alt={profile.name} 
              fill 
              className="object-cover" 
              unoptimized
            />
          </div>
          
          {/* Info */}
          <h1 className="text-3xl font-black mb-1">{profile.name}</h1>
          <p className="text-white/60 mb-6 font-medium tracking-wide text-sm">{profile.dept}</p>

          <Link href={`/chat/${profile.id}`} className="w-full max-w-[200px] mb-8">
            <button className="w-full py-3.5 px-6 rounded-2xl bg-accent-teal text-black font-bold tracking-wide flex items-center justify-center gap-2 transition-all hover:bg-[#3ab5ac] hover:scale-105 shadow-lg shadow-accent-teal/20">
              <MessageCircle className="w-5 h-5" />
              Message
            </button>
          </Link>
          
          <div className="w-full h-px bg-white/10 mb-8" />
          
          {/* Bio */}
          <div className="text-left w-full mb-8">
            <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">About</h3>
            <p className="text-white/80 leading-relaxed text-[15px] italic">
              "{profile.bio}"
            </p>
          </div>

          {/* Tags */}
          <div className="text-left w-full space-y-6">
            <div>
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Strong At</h3>
              <div className="flex flex-wrap gap-2">
                {strongTags.map((tag) => (
                  <span key={tag} className="bg-accent-teal/10 text-accent-teal border border-accent-teal/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-3">Needs Help With</h3>
              <div className="flex flex-wrap gap-2">
                {weakTags.map((tag) => (
                  <span key={tag} className="bg-[#ff6b6b]/10 text-[#ff6b6b] border border-[#ff6b6b]/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
