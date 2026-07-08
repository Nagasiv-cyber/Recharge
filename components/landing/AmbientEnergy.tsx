"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function AmbientEnergy({ icons = ["🔋", "⚡", "✨", "📚"] }: { icons?: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const energyIcons = gsap.utils.toArray(".ambient-energy-icon", containerRef.current) as HTMLElement[]
    
    energyIcons.forEach((icon, i) => {
      const pulseEl = icon.querySelector(".ambient-pulse")
      const delay = i * 0.8
      const driftX = Math.random() * 60 - 30
      const duration = 6 + Math.random() * 2

      function floatLoop() {
        if (!icon) return
        gsap.fromTo(icon,
          { y: 0, x: 0 },
          {
            y: -(window.innerHeight * 1.15),
            x: driftX,
            duration: duration,
            delay: delay,
            ease: 'sine.inOut',
            onComplete: () => {
              gsap.set(icon, { y: 0, x: 0 })
              floatLoop()
            }
          }
        )
      }
      floatLoop()

      if (pulseEl) {
        gsap.to(pulseEl, {
          scale: 1.25, 
          duration: 0.9, 
          delay: delay,
          yoyo: true, 
          repeat: -1, 
          ease: 'power1.inOut'
        })
      }
    })

    return () => {
      gsap.killTweensOf(energyIcons)
      energyIcons.forEach(icon => gsap.killTweensOf(icon.querySelector(".ambient-pulse")))
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-[0.28]"
    >
      {icons.map((emoji, idx) => {
        const leftPos = [15, 75, 45, 85, 25][idx % 5]
        const size = [2.5, 3.5, 2, 2, 3][idx % 5]
        
        return (
          <div 
            key={idx} 
            className="ambient-energy-icon absolute bottom-[-10%]"
            style={{ 
              left: `${leftPos}%`,
              fontSize: `${size}rem`,
              willChange: 'transform'
            }}
          >
            <span className="ambient-pulse inline-block will-change-transform">{emoji}</span>
          </div>
        )
      })}
    </div>
  )
}
