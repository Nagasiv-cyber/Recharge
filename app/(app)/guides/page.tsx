"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, Cpu, TrendingUp, Database, Smartphone, Shield, Layers, Clock, Star } from "lucide-react"

const GUIDES = [
  {
    id: 1,
    emoji: "🚁",
    icon: Cpu,
    title: "Building a Quad-Rotor Tail-Sitter UAV",
    description: "A complete hardware and software guide for aerospace enthusiasts. From motor controllers to flight stabilisation algorithms.",
    tags: ["Hardware", "C++", "Embedded"],
    difficulty: "Advanced",
    diffColor: "from-red-500/20 to-rose-600/10",
    diffBorder: "border-red-500/30",
    diffText: "text-red-400",
    readTime: "45 min",
    stars: 94,
    accent: "rgba(239,68,68,0.3)",
    cardGlow: "rgba(239,68,68,0.15)",
  },
  {
    id: 2,
    emoji: "📈",
    icon: TrendingUp,
    title: "Energy-Aware Algorithmic Trading Models",
    description: "Combine ML predictions with efficient execution for quant trading. Includes backtesting framework and live paper trading setup.",
    tags: ["Python", "ML", "Finance"],
    difficulty: "Intermediate",
    diffColor: "from-amber-500/20 to-yellow-600/10",
    diffBorder: "border-amber-400/30",
    diffText: "text-amber-400",
    readTime: "32 min",
    stars: 87,
    accent: "rgba(245,158,11,0.3)",
    cardGlow: "rgba(245,158,11,0.1)",
  },
  {
    id: 3,
    emoji: "🗄️",
    icon: Database,
    title: "PostgreSQL Database Integration",
    description: "The backend essential: setting up scalable relational databases. Covers indexing, query optimization, and ORM patterns.",
    tags: ["SQL", "Backend", "DevOps"],
    difficulty: "Beginner",
    diffColor: "from-green-500/20 to-emerald-600/10",
    diffBorder: "border-green-400/30",
    diffText: "text-green-400",
    readTime: "20 min",
    stars: 76,
    accent: "rgba(34,197,94,0.3)",
    cardGlow: "rgba(34,197,94,0.1)",
  },
  {
    id: 4,
    emoji: "📱",
    icon: Smartphone,
    title: "React Native Campus App from Scratch",
    description: "Build and deploy a full campus companion app. Covers navigation, auth, push notifications, and App Store submission.",
    tags: ["React Native", "Mobile", "Firebase"],
    difficulty: "Intermediate",
    diffColor: "from-amber-500/20 to-yellow-600/10",
    diffBorder: "border-amber-400/30",
    diffText: "text-amber-400",
    readTime: "55 min",
    stars: 82,
    accent: "rgba(245,158,11,0.3)",
    cardGlow: "rgba(245,158,11,0.1)",
  },
  {
    id: 5,
    emoji: "🔐",
    icon: Shield,
    title: "Ethical Hacking & Campus Network Audit",
    description: "Learn penetration testing concepts legally — recon, exploitation, and writing a proper security report for your institution.",
    tags: ["Security", "Networking", "Linux"],
    difficulty: "Advanced",
    diffColor: "from-red-500/20 to-rose-600/10",
    diffBorder: "border-red-500/30",
    diffText: "text-red-400",
    readTime: "60 min",
    stars: 91,
    accent: "rgba(239,68,68,0.3)",
    cardGlow: "rgba(239,68,68,0.1)",
  },
  {
    id: 6,
    emoji: "🧱",
    icon: Layers,
    title: "System Design Interviews: End-to-End",
    description: "From URL shorteners to distributed caches — the playbook top engineers use to clear system design rounds at big tech.",
    tags: ["Architecture", "Interviews", "Scalability"],
    difficulty: "Intermediate",
    diffColor: "from-amber-500/20 to-yellow-600/10",
    diffBorder: "border-amber-400/30",
    diffText: "text-amber-400",
    readTime: "40 min",
    stars: 98,
    accent: "rgba(245,158,11,0.3)",
    cardGlow: "rgba(245,158,11,0.1)",
  },
]

const DIFFICULTY_FILTERS = ["All", "Beginner", "Intermediate", "Advanced"]

export default function GuidesPage() {
  const [filter, setFilter] = useState("All")
  const filtered = filter === "All" ? GUIDES : GUIDES.filter((g) => g.difficulty === filter)

  return (
    <div className="pt-20 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto relative z-10 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 w-fit px-4 py-2 rounded-full"
        style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', backdropFilter: 'blur(12px)' }}>
        <Link href="/" className="flex items-center gap-1.5 text-white font-bold text-sm hover:text-purple-300 transition-colors">
          <span>⚡</span> Recharge
        </Link>
        <span className="text-white/30">/</span>
        <span className="text-purple-300 text-sm font-medium">Guides</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="tech-heading text-4xl md:text-5xl mb-2 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          Premium Blueprints
        </h1>
        <p className="text-purple-300/70 text-lg">Step-by-step builds from students who&apos;ve shipped the real thing.</p>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {DIFFICULTY_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
            style={
              filter === f
                ? { background: 'linear-gradient(135deg, #9333ea, #7c3aed)', color: 'white', boxShadow: '0 4px 16px rgba(147,51,234,0.4)' }
                : { background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', color: 'rgba(192,132,252,0.7)' }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Guide Cards */}
      <div className="flex flex-col gap-4">
        {filtered.map((guide) => (
          <div
            key={guide.id}
            className="group relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: 'linear-gradient(135deg, rgba(120,40,200,0.12), rgba(60,10,120,0.06))',
              border: '1px solid rgba(168,85,247,0.2)',
              backdropFilter: 'blur(20px)',
              boxShadow: `0 4px 24px ${guide.cardGlow}`,
            }}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
              style={{ boxShadow: `inset 0 0 40px ${guide.accent}`, border: `1px solid ${guide.accent}` }} />
            {/* Glossy top sheen */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5 relative z-10">
              <div className="flex items-start gap-5 flex-1">
                {/* Emoji icon */}
                <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                  style={{ background: `linear-gradient(135deg, ${guide.accent.replace('0.3', '0.15')}, transparent)`, border: `1px solid ${guide.accent}` }}>
                  {guide.emoji}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {/* Difficulty badge */}
                    <span className={`text-[10px] font-black tracking-wider px-2 py-0.5 rounded-lg border ${guide.diffBorder} ${guide.diffText}`}
                      style={{ background: `linear-gradient(135deg, ${guide.diffColor.split(' ')[0].replace('from-', '')}, transparent)` }}>
                      {guide.difficulty.toUpperCase()}
                    </span>
                    {/* Tags */}
                    {guide.tags.map((tag) => (
                      <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-purple-300/70"
                        style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.2)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-purple-200 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-purple-200/50 text-sm leading-relaxed">{guide.description}</p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-white/40">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {guide.readTime} read</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {guide.stars} stars</span>
                  </div>
                </div>
              </div>

              <button
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{
                  background: 'rgba(168,85,247,0.15)',
                  border: '1px solid rgba(168,85,247,0.35)',
                  color: '#c084fc',
                  boxShadow: '0 4px 12px rgba(168,85,247,0.15)',
                }}
              >
                Read Blueprint <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
