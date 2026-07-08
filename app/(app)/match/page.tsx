"use client"

import { PrototypeDemo } from "@/components/landing/PrototypeDemo"

export default function MatchPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="tech-heading text-4xl mb-8">Discovery</h1>
      {/* Reusing the PrototypeDemo for now as the actual swipe deck. In a real app this would map to a SwipeDeck component fetching actual users. */}
      <PrototypeDemo />
    </div>
  )
}
