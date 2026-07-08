"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PrototypeDemo } from "@/components/landing/PrototypeDemo"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function MarketingPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)
  
  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // Transition 1: Deep Dark Purple to Rich Violet
      gsap.to(document.body, {
        backgroundColor: "#3a1152",
        scrollTrigger: {
          trigger: "#sec-2",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      })

      // Transition 2: Rich Violet to Vibrant Magenta-Purple
      gsap.to(document.body, {
        backgroundColor: "#9c2e79",
        scrollTrigger: {
          trigger: "#sec-4",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      })

      // Transition 3: Vibrant Magenta to Soft Light Pink for Prototype
      gsap.to(document.body, {
        backgroundColor: "#ffd9ec",
        color: "#3d0f30",
        scrollTrigger: {
          trigger: "#sec-5",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      })

      // Standard Fade in text elements
      const textElements = gsap.utils.toArray(".reveal-text") as HTMLElement[]
      textElements.forEach((text) => {
        gsap.to(text, {
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        })
      })

      // Special Image Reveal
      gsap.to("#hero-image", {
        scrollTrigger: {
          trigger: "#sec-2",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "expo.out",
      })

      // Fade in floating energy
      gsap.to("#energy-container", {
        scrollTrigger: {
          trigger: "#sec-4",
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        duration: 1,
      })

      // Animate Energy Icons directly via GSAP
      const energyIcons = gsap.utils.toArray(".energy-icon") as HTMLElement[]
      energyIcons.forEach((icon, i) => {
        const drift = 30 + Math.random() * 40
        const riseDuration = 10 + Math.random() * 10
        const randomDelay = -Math.random() * riseDuration // Negative delay spreads them out immediately

        // Vertical rise
        gsap.fromTo(
          icon,
          { top: "110%" },
          {
            top: "-10%",
            duration: riseDuration,
            repeat: -1,
            ease: "none",
            delay: randomDelay,
          }
        )

        // Horizontal sway
        gsap.fromTo(
          icon,
          { x: -drift },
          {
            x: drift,
            duration: 2 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: -Math.random() * 5,
          }
        )

        const pulseEl = icon.querySelector(".pulse")
        if (pulseEl) {
          gsap.to(pulseEl, {
            scale: 1.3,
            duration: 0.7 + Math.random() * 0.4,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: i * 0.25,
          })
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="block pb-[100px]">
      <div id="sec-1" className="min-h-screen flex flex-col justify-center items-center text-center p-10 relative">
        <h1 className="reveal-text tech-heading text-6xl opacity-0 translate-y-[50px] z-10">
          Recharge your<br />academic life.
        </h1>
      </div>

      <div id="sec-1-5" className="min-h-screen flex flex-col justify-center items-center text-center p-10 relative max-w-3xl mx-auto">
        <div className="reveal-text w-20 h-20 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center shadow-2xl relative overflow-hidden mb-8 opacity-0 translate-y-[50px] z-10">
          <Image src="/logo.jpg" alt="Recharge Logo" fill className="object-cover mix-blend-screen" unoptimized />
        </div>
        <h2 className="reveal-text tech-heading text-4xl md:text-5xl mb-6 opacity-0 translate-y-[50px] z-10">
          Campus matchmaking for study partners and project collaborators.
        </h2>
        <p className="reveal-text text-xl md:text-2xl mt-5 opacity-0 translate-y-[30px] z-10 text-white/70">
          Not here for small talk. Match by tech stack, find your table in the study hub, or swipe right on your next co-founder.
        </p>
      </div>

      <div id="sec-2" className="min-h-screen flex flex-col justify-center items-center text-center p-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-12">
          <div className="flex-1 text-left">
            <h1 className="reveal-text tech-heading text-5xl md:text-6xl leading-[1.1] mb-5 opacity-0 translate-y-[50px] z-10">
              Makes a strong<br />case for itself.
            </h1>
            <p className="reveal-text text-xl md:text-2xl mt-5 opacity-0 translate-y-[30px] max-w-2xl z-10 text-white/70">
              Stop struggling alone in the library. Our algorithm pairs your academic weaknesses with someone else&apos;s strengths, creating the ultimate hackathon teams and study sessions.
            </p>
          </div>
          <div
            id="hero-image"
            className="flex-1 rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] opacity-0 scale-90"
          >
            <div className="w-full aspect-[4/3] bg-white/10 flex items-center justify-center text-white/50 backdrop-blur-md border border-white/20 relative">
              <Image src="/image_e0b3fd.png.png" alt="Students collaborating" fill className="object-cover" unoptimized />
            </div>
          </div>
        </div>
      </div>

      <div id="sec-3" className="min-h-screen flex flex-col justify-center items-center text-center p-10 relative">
        <h1 className="reveal-text tech-heading text-6xl md:text-[5rem] leading-none opacity-0 translate-y-[50px] z-10">
          Match by Tech Stack.<br />
          <span className="text-accent-teal">Connect by Vibe.</span>
        </h1>
      </div>

      <div id="sec-4" className="min-h-screen flex flex-col justify-center items-center text-center p-10 relative overflow-hidden">
        <div
          id="energy-container"
          className="absolute inset-0 pointer-events-none z-0 opacity-0 overflow-hidden"
        >
          <div className="energy-icon absolute text-[2.5rem] opacity-90 left-[15%]">
            <span className="pulse inline-block">❤️</span>
          </div>
          <div className="energy-icon absolute text-[3.5rem] opacity-90 left-[75%]">
            <span className="pulse inline-block">⚡</span>
          </div>
          <div className="energy-icon absolute text-[2rem] opacity-90 left-[45%]">
            <span className="pulse inline-block">🔋</span>
          </div>
          <div className="energy-icon absolute text-[2rem] opacity-90 left-[85%]">
            <span className="pulse inline-block">🤝</span>
          </div>
          <div className="energy-icon absolute text-[3rem] opacity-90 left-[25%]">
            <span className="pulse inline-block">✨</span>
          </div>
          <div className="energy-icon absolute text-[2.5rem] opacity-90 left-[10%]">
            <span className="pulse inline-block">💻</span>
          </div>
          <div className="energy-icon absolute text-[3rem] opacity-90 left-[90%]">
            <span className="pulse inline-block">🚀</span>
          </div>
          <div className="energy-icon absolute text-[2rem] opacity-90 left-[35%]">
            <span className="pulse inline-block">🔥</span>
          </div>
          <div className="energy-icon absolute text-[2.5rem] opacity-90 left-[60%]">
            <span className="pulse inline-block">💡</span>
          </div>
          <div className="energy-icon absolute text-[2rem] opacity-90 left-[55%]">
            <span className="pulse inline-block">🧠</span>
          </div>
          <div className="energy-icon absolute text-[2.5rem] opacity-90 left-[5%]">
            <span className="pulse inline-block">🎯</span>
          </div>
          <div className="energy-icon absolute text-[2rem] opacity-90 left-[80%]">
            <span className="pulse inline-block">☕</span>
          </div>
        </div>

        <h1 className="reveal-text editorial-heading text-5xl md:text-7xl opacity-0 translate-y-[50px] z-10">
          Study Together.<br />Grow Together.
        </h1>
        <p className="reveal-text text-xl md:text-2xl mt-5 opacity-0 translate-y-[30px] max-w-2xl z-10 text-white/85 font-sans">
          Because sometimes, finding the perfect partner for your project is just the beginning of the story.
        </p>
      </div>

      <div id="sec-5" className="min-h-screen flex flex-col justify-center items-center text-center p-10 relative">
        <h2 className="tech-heading text-3xl md:text-4xl mb-10">Live Prototype</h2>
        
        {!isUnlocked ? (
          <div className="w-full max-w-sm bg-white/10 border border-white/20 backdrop-blur-xl rounded-[26px] p-10 shadow-2xl relative z-10 text-left">
            <h3 className="text-2xl font-bold mb-2 text-center">Unlock Demo</h3>
            <p className="text-white/70 text-sm mb-6 text-center">Enter any email & password to continue.</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              if (formData.get('email') && formData.get('password')) {
                setIsUnlocked(true);
              }
            }} className="flex flex-col gap-4">
              <input name="email" type="email" placeholder="student@university.edu" required className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-teal focus:bg-white/10 transition-all font-sans text-sm" />
              <input name="password" type="password" placeholder="Password" required className="bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:border-accent-teal focus:bg-white/10 transition-all font-sans text-sm" />
              
              <button type="submit" className="bg-accent-teal text-black font-bold py-3 rounded-xl hover:bg-[#3ab5ac] transition-all mt-2 cursor-pointer shadow-lg">
                Log In
              </button>
            </form>
            
            <div className="mt-6 text-sm text-white/60 text-center">
              New here? <Link href="/profile" className="text-accent-teal font-semibold hover:underline">Create a profile</Link>
            </div>
          </div>
        ) : (
          <PrototypeDemo />
        )}
      </div>
    </div>
  )
}
