"use client"

import { useAppStore } from "@/store/useStore"
import Image from "next/image"
import Link from "next/link"

export default function MatchesPage() {
  const matches = useAppStore((state) => state.matches)

  return (
    <div className="pt-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="tech-heading text-4xl md:text-5xl mb-10 pb-5 border-b-2 border-white/10 text-left">
        Your Matches
      </h1>

      {matches.length === 0 ? (
        <p className="text-white/60 text-lg">
          No matches yet — head to the Match tab and start swiping right.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map((match) => (
            <div
              key={match.name}
              className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md transition-transform hover:scale-[1.02]"
            >
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
                <Image
                  src={match.img}
                  alt={match.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1 leading-tight">{match.name}</h3>
                <p className="text-sm text-white/70">{match.dept}</p>
              </div>
              <Link href={`/chat/${match.id}`}>
                <button className="px-4 py-2 rounded-full border border-accent-teal text-accent-teal font-bold text-sm transition-colors hover:bg-accent-teal hover:text-black">
                  Message
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
