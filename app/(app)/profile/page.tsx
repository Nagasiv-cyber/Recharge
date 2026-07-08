"use client"

import { useAppStore } from "@/store/useStore"
import { useState } from "react"
import { Check } from "lucide-react"

export default function ProfilePage() {
  const profile = useAppStore((state) => state.userProfile)
  const updateProfile = useAppStore((state) => state.updateUserProfile)
  
  const [showSaved, setShowSaved] = useState(false)
  const [formData, setFormData] = useState({
    name: profile.name,
    dept: profile.dept,
    bio: profile.bio,
    purpose: profile.purpose,
  })

  const avatarInitials = formData.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(formData)
    setShowSaved(true)
    setTimeout(() => setShowSaved(false), 2000)
  }

  return (
    <div className="pt-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="tech-heading text-4xl md:text-5xl mb-10 pb-5 border-b-2 border-white/10 text-left">
        Your Profile
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="bg-white/5 border border-white/10 rounded-[24px] p-10 text-center backdrop-blur-md w-full md:w-[280px] shrink-0 h-fit">
          <div className="w-[100px] h-[100px] rounded-full mx-auto mb-5 bg-gradient-to-br from-[#9c2e79] to-accent-teal flex items-center justify-center font-black text-3xl text-white shadow-lg">
            {avatarInitials || "?"}
          </div>
          <h2 className="text-2xl font-bold mb-1">{formData.name || "Anonymous"}</h2>
          <p className="text-white/60 mb-5">{formData.dept}</p>
          
          <div className="flex flex-col gap-2 items-center">
            <span className="px-3 py-1 bg-accent-teal/20 text-accent-teal border border-accent-teal/50 rounded-full text-xs font-bold uppercase tracking-wide">
              ↑ Product Building
            </span>
            <span className="px-3 py-1 bg-accent-teal/20 text-accent-teal border border-accent-teal/50 rounded-full text-xs font-bold uppercase tracking-wide">
              ↑ Fintech
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-5 max-w-xl">
          <label className="flex flex-col gap-2 text-sm text-white/80">
            Full Name
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-accent-teal transition-colors"
            />
          </label>
          
          <label className="flex flex-col gap-2 text-sm text-white/80">
            Department / Section
            <input
              type="text"
              required
              value={formData.dept}
              onChange={(e) => setFormData({ ...formData, dept: e.target.value })}
              className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-accent-teal transition-colors"
            />
          </label>
          
          <label className="flex flex-col gap-2 text-sm text-white/80">
            Bio
            <textarea
              rows={3}
              required
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-accent-teal transition-colors resize-y"
            />
          </label>
          
          <label className="flex flex-col gap-2 text-sm text-white/80">
            Looking For
            <select
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="bg-[#1a1423] border border-white/15 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-accent-teal transition-colors appearance-none"
            >
              <option value="Study Partner">Study Partner</option>
              <option value="Project Team">Project Team</option>
              <option value="Friendship">Friendship</option>
              <option value="Dating">Dating</option>
            </select>
          </label>

          <div className="flex items-center gap-4 mt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-accent-teal text-black font-bold rounded-xl transition-transform hover:scale-105"
            >
              Save Changes
            </button>
            <span
              className={`text-accent-teal font-bold flex items-center gap-1 transition-opacity duration-300 ${
                showSaved ? "opacity-100" : "opacity-0"
              }`}
            >
              <Check size={18} /> Saved
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}
