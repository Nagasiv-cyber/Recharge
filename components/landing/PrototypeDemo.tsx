"use client"

import { useState } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion"
import { Tag } from "../ui/Tag"
import Image from "next/image"
import { useAppStore } from "@/store/useStore"
import { DEMO_PROFILES, type ProfileData } from "@/lib/data"

export function PrototypeDemo() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMatchModal, setShowMatchModal] = useState(false)
  const [matchName, setMatchName] = useState("")
  
  const addMatch = useAppStore((state) => state.addMatch)
  const discoveryProfiles = useAppStore((state) => state.discoveryProfiles)

  // User-submitted profiles appear first in the deck
  const ALL_PROFILES = [...discoveryProfiles, ...DEMO_PROFILES]

  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-10, 10])
  const opacityLike = useTransform(x, [0, 100], [0, 1])
  const opacityNope = useTransform(x, [0, -100], [0, 1])
  const controls = useAnimation()

  const profile = ALL_PROFILES[currentIndex % ALL_PROFILES.length]

  const advanceDeck = () => {
    setCurrentIndex((prev) => (prev + 1) % ALL_PROFILES.length)
  }

  const handleSwipe = async (direction: 'left' | 'right') => {
    const isConnect = direction === 'right'
    const flyX = isConnect ? 600 : -600
    const rotation = isConnect ? 25 : -25
    
    // Animate the card flying off
    await controls.start({
      x: flyX,
      rotate: rotation,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" }
    })
    
    // Setup for next card
    x.set(0)
    controls.set({ x: 0, rotate: 0, opacity: 1 })
    
    const currentName = profile.name
    const currentProfile = profile
    advanceDeck()
    
    if (isConnect && Math.random() > 0.4) {
      addMatch(currentProfile)
      setMatchName(currentName)
      setShowMatchModal(true)
    }
  }

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      handleSwipe('right')
    } else if (info.offset.x < -100) {
      handleSwipe('left')
    } else {
      controls.start({ x: 0, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 20 } })
    }
  }

  return (
    <>
      <div className="relative w-[380px] h-[750px] bg-[#111] rounded-[30px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col border-[8px] border-[#f5f5f7] mb-5">
        <motion.div
          key={profile.id}
          className="relative w-full h-[85%] cursor-grab active:cursor-grabbing touch-pan-y select-none"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ x, rotate }}
          animate={controls}
        >
          {/* Stamps */}
          <motion.div 
            style={{ opacity: opacityLike }}
            className="absolute top-10 left-6 z-10 font-black text-2xl px-4 py-2 rounded-xl tracking-[2px] border-4 text-accent-teal border-accent-teal -rotate-[20deg] pointer-events-none"
          >
            CONNECT
          </motion.div>
          <motion.div 
            style={{ opacity: opacityNope }}
            className="absolute top-10 right-6 z-10 font-black text-2xl px-4 py-2 rounded-xl tracking-[2px] border-4 text-accent-coral border-accent-coral rotate-[20deg] pointer-events-none"
          >
            PASS
          </motion.div>

          <Image 
            src={profile.img} 
            alt="Profile" 
            fill
            className="object-cover pointer-events-none"
            unoptimized
          />
          
          <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-black/95 via-black/60 to-transparent flex flex-col justify-end p-5 text-left text-white pointer-events-none">
            <div className="text-[2.2rem] font-[900] leading-none mb-1">{profile.name}</div>
            <div className="text-[1rem] text-[#bbb] mb-3">{profile.dept}</div>
            
            <div className="flex gap-2 mb-2 flex-wrap">
              <Tag variant="strong">↑ {profile.strong}</Tag>
            </div>
            <div className="flex gap-2 mb-2 flex-wrap">
              <Tag variant="weak">↓ {profile.weak}</Tag>
            </div>
            
            <div className="text-[0.95rem] text-[#ddd] italic mt-3 leading-[1.4]">
              &quot;{profile.bio}&quot;
            </div>
          </div>
        </motion.div>

        <div className="h-[15%] bg-black flex justify-evenly items-center">
          <button
            onClick={() => handleSwipe('left')}
            className="w-[65px] h-[65px] rounded-full border-2 border-accent-coral text-accent-coral text-2xl flex justify-center items-center transition-all duration-200 hover:bg-[rgba(255,107,107,0.1)] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,107,107,0.4)]"
          >
            ✕
          </button>
          <button
            onClick={() => handleSwipe('right')}
            className="w-[65px] h-[65px] rounded-full border-2 border-accent-teal text-accent-teal text-2xl flex justify-center items-center transition-all duration-200 hover:bg-[rgba(78,205,196,0.1)] hover:scale-110 hover:shadow-[0_0_20px_rgba(78,205,196,0.4)]"
          >
            ♥
          </button>
        </div>
      </div>
      
      <p className="text-[0.9rem] opacity-60 text-center">
        {currentIndex + 1} of {DEMO_PROFILES.length} — drag the card, or use the buttons
      </p>

      {/* Match Modal Overlay */}
      <AnimatePresence>
        {showMatchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0a0514]/60 backdrop-blur-md flex items-center justify-center z-[200]"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white/10 backdrop-blur-2xl border border-white/25 rounded-[30px] p-12 max-w-[400px] text-center shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              <div className="text-[2.5rem] mb-2">✨🤝✨</div>
              <h2 className="text-[2.5rem] mb-4 text-white font-serif italic">It&apos;s a Match!</h2>
              <p className="text-white/80 mb-6 leading-[1.4]">
                You and <span className="font-bold text-white">{matchName}</span> both connected. Say hi and start planning your next study session.
              </p>
              <button 
                onClick={() => setShowMatchModal(false)}
                className="px-8 py-3 rounded-full border-none bg-accent-teal text-black font-bold cursor-pointer transition-transform hover:scale-105"
              >
                Keep Swiping
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
