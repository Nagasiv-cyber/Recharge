"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Users, Lock, Flame, Code2, FlaskConical, BookOpen, Calculator, Globe2, Cpu } from "lucide-react"

const STUDY_ROOMS = [
  {
    id: 1, title: "Late Night LeetCode", subject: "CS301", icon: Code2,
    emoji: "💻", filled: 2, total: 4,
    tags: ["DSA", "Interviews"], color: "from-purple-500/20 to-violet-600/10",
    border: "border-purple-500/30", glow: "rgba(168,85,247,0.3)",
  },
  {
    id: 2, title: "C Programming Pointers", subject: "CS201", icon: Cpu,
    emoji: "⚙️", filled: 1, total: 4,
    tags: ["C", "Embedded"], color: "from-indigo-500/20 to-purple-600/10",
    border: "border-indigo-400/30", glow: "rgba(99,102,241,0.3)",
  },
  {
    id: 3, title: "Model UN Prep", subject: "POL101", icon: Globe2,
    emoji: "🌍", filled: 3, total: 4,
    tags: ["Politics", "Debate"], color: "from-fuchsia-500/20 to-pink-600/10",
    border: "border-fuchsia-400/30", glow: "rgba(217,70,239,0.3)",
  },
  {
    id: 4, title: "ML Paper Club", subject: "AIML401", icon: FlaskConical,
    emoji: "🧠", filled: 2, total: 5,
    tags: ["PyTorch", "Research"], color: "from-violet-500/20 to-purple-600/10",
    border: "border-violet-400/30", glow: "rgba(139,92,246,0.3)",
  },
  {
    id: 5, title: "Calculus III Midterm", subject: "MATH201", icon: Calculator,
    emoji: "📐", filled: 4, total: 4,
    tags: ["Calculus", "Exam Prep"], color: "from-white/5 to-white/[0.02]",
    border: "border-white/10", glow: "rgba(255,255,255,0.05)", full: true,
  },
  {
    id: 6, title: "DSA for Placements", subject: "CS402", icon: Flame,
    emoji: "🔥", filled: 1, total: 6,
    tags: ["Trees", "Graphs", "DP"], color: "from-orange-500/10 to-rose-600/5",
    border: "border-orange-400/20", glow: "rgba(251,146,60,0.2)",
  },
]

export default function StudyHubPage() {
  const [joined, setJoined] = useState<number[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [newRoom, setNewRoom] = useState({ title: "", subject: "", seats: "4" })
  const [rooms, setRooms] = useState(STUDY_ROOMS)

  const handleJoin = (id: number) => {
    if (joined.includes(id)) return
    setJoined((prev) => [...prev, id])
    setRooms((prev) =>
      prev.map((r) => r.id === id ? { ...r, filled: Math.min(r.filled + 1, r.total) } : r)
    )
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newRoom.title || !newRoom.subject) return
    const created = {
      id: Date.now(), title: newRoom.title, subject: newRoom.subject.toUpperCase(),
      icon: BookOpen, emoji: "📚", filled: 1, total: parseInt(newRoom.seats),
      tags: ["New"], color: "from-purple-500/20 to-violet-600/10",
      border: "border-purple-400/30", glow: "rgba(168,85,247,0.3)",
    }
    setRooms((prev) => [created, ...prev])
    setJoined((prev) => [...prev, created.id])
    setNewRoom({ title: "", subject: "", seats: "4" })
    setShowCreate(false)
  }

  return (
    <div className="pt-20 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto relative z-10 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 w-fit px-4 py-2 rounded-full"
        style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(12px)' }}>
        <Link href="/" className="flex items-center gap-1.5 text-white font-bold text-sm hover:text-purple-300 transition-colors">
          <span>⚡</span> Recharge
        </Link>
        <span className="text-white/30">/</span>
        <span className="text-purple-300 text-sm font-medium">Study Hub</span>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="tech-heading text-4xl md:text-5xl mb-2 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
            Group Study Hub
          </h1>
          <p className="text-purple-300/70 text-lg">Find your tribe and ace that exam together.</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #9333ea, #7c3aed)', boxShadow: '0 4px 20px rgba(147,51,234,0.4)' }}
        >
          <Plus className="w-4 h-4" />
          Create Table
        </button>
      </div>

      {/* Create Room Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}>
          <div className="w-full max-w-md rounded-3xl p-8"
            style={{ background: 'linear-gradient(135deg, rgba(120,40,200,0.3), rgba(60,10,120,0.3))', border: '1px solid rgba(180,120,255,0.3)', backdropFilter: 'blur(24px)' }}>
            <h3 className="text-2xl font-black mb-6 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">Create a Study Table</h3>
            <form onSubmit={handleCreate} className="flex flex-col gap-4">
              <input value={newRoom.title} onChange={(e) => setNewRoom({ ...newRoom, title: e.target.value })}
                placeholder="Session name (e.g. Operating Systems Panic)" required
                className="bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:border-purple-400 transition-colors" />
              <input value={newRoom.subject} onChange={(e) => setNewRoom({ ...newRoom, subject: e.target.value })}
                placeholder="Subject code (e.g. CS304)" required
                className="bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:border-purple-400 transition-colors" />
              <select value={newRoom.seats} onChange={(e) => setNewRoom({ ...newRoom, seats: e.target.value })}
                className="bg-white/5 border border-purple-500/30 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-400 transition-colors">
                {[2,3,4,5,6,8].map(n => <option key={n} value={n} className="bg-[#1a0035]">{n} seats</option>)}
              </select>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-white/60 font-bold hover:bg-white/5 transition-colors">
                  Cancel
                </button>
                <button type="submit"
                  className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #9333ea, #7c3aed)', boxShadow: '0 4px 20px rgba(147,51,234,0.4)' }}>
                  Create & Join
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rooms.map((room) => {
          const isFull = room.filled >= room.total
          const isJoined = joined.includes(room.id)
          const fillPct = Math.round((room.filled / room.total) * 100)

          return (
            <div key={room.id}
              className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 group ${room.border} ${isFull ? 'opacity-70' : 'hover:-translate-y-1.5'}`}
              style={{
                background: `linear-gradient(135deg, ${room.color.replace('from-', '').replace(' to-', ', ')})`,
                backdropFilter: 'blur(20px)',
                boxShadow: isFull ? 'none' : `0 8px 32px ${room.glow}`,
              }}>
              {/* Glossy sheen */}
              {!isFull && (
                <div className="absolute top-0 left-0 right-0 h-px opacity-40"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)' }} />
              )}

              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{room.emoji}</div>
                  <h3 className={`text-lg font-bold leading-snug ${isFull ? 'text-white/50' : 'text-white'}`}>
                    {room.title}
                  </h3>
                </div>
                <span className="shrink-0 text-[10px] font-black tracking-wider px-2 py-1 rounded-lg"
                  style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' }}>
                  {room.subject}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {room.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-purple-300/80"
                    style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Seat bar */}
              <div className="mb-1.5">
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${fillPct}%`,
                      background: isFull
                        ? 'linear-gradient(90deg, #6b7280, #9ca3af)'
                        : 'linear-gradient(90deg, #9333ea, #c084fc)',
                    }} />
                </div>
              </div>
              <p className="text-xs mb-5 flex items-center gap-1.5" style={{ color: isFull ? 'rgba(255,255,255,0.3)' : 'rgba(192,132,252,0.8)' }}>
                <Users className="w-3.5 h-3.5" />
                {room.filled} / {room.total} Seats {isFull ? '(Full)' : 'Filled'}
              </p>

              {/* CTA */}
              {isFull ? (
                <button disabled className="w-full py-2.5 rounded-xl font-bold text-sm cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.3)' }}>
                  <Lock className="w-4 h-4" /> Table Full
                </button>
              ) : isJoined ? (
                <button className="w-full py-2.5 rounded-xl font-bold text-sm"
                  style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.4)', color: '#c084fc' }}>
                  ✓ Joined
                </button>
              ) : (
                <button onClick={() => handleJoin(room.id)}
                  className="w-full py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] hover:shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #9333ea, #7c3aed)', boxShadow: `0 4px 16px ${room.glow}`, color: 'white' }}>
                  Join Table
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
