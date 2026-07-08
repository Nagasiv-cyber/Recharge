"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { GlassCard } from "./GlassCard"
import { cn } from "@/lib/utils"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, children, className }: ModalProps) {
  // Close on Escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="z-10 w-full max-w-lg"
          >
            <GlassCard className={cn("relative p-6", className)}>
              <button
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              {children}
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
