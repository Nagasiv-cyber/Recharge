"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAppStore } from "@/store/useStore"
import { ChevronRight, ChevronLeft, Upload, CheckCircle2, Zap } from "lucide-react"
import Image from "next/image"

const SKILL_OPTIONS = [
  "Python", "Machine Learning", "React", "Next.js", "Figma", "UI/UX",
  "Backend Architecture", "DevOps", "DSA", "C++", "Embedded Systems",
  "NLP", "PyTorch", "TensorFlow", "Computer Vision", "SQL", "PostgreSQL",
  "System Design", "Mobile Dev", "Flutter", "Android", "iOS", "Cloud / AWS",
  "Cybersecurity", "Blockchain", "Web3", "Node.js", "TypeScript", "Docker",
  "Git", "Linux", "VLSI", "AutoCAD", "SolidWorks", "Technical Writing",
]

const DEPARTMENTS = [
  "CSE", "AIML", "ECE", "IT", "Mechanical", "Civil", "Chemical", "EEE",
]

const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year"]

const PURPOSES = [
  { id: "study", label: "Study Buddy", emoji: "📚" },
  { id: "project", label: "Project Partner", emoji: "🛠️" },
  { id: "hackathon", label: "Hackathon Team", emoji: "⚡" },
  { id: "mentor", label: "Find a Mentor", emoji: "🧠" },
]

function SkillChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
      style={
        selected
          ? { background: 'linear-gradient(135deg, #9333ea, #7c3aed)', color: 'white', boxShadow: '0 4px 12px rgba(147,51,234,0.4)', transform: 'scale(1.05)' }
          : { background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)', color: 'rgba(192,132,252,0.7)' }
      }
    >
      {selected && "✓ "}{label}
    </button>
  )
}

export default function OnboardPage() {
  const router = useRouter()
  const addUserToDiscovery = useAppStore((state) => state.addUserToDiscovery)
  const fileRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  // Form state
  const [name, setName] = useState("")
  const [dept, setDept] = useState("")
  const [year, setYear] = useState("")
  const [section, setSection] = useState("")
  const [bio, setBio] = useState("")
  const [purpose, setPurpose] = useState("")
  const [strongSkills, setStrongSkills] = useState<string[]>([])
  const [weakSkills, setWeakSkills] = useState<string[]>([])
  const [photoPreview, setPhotoPreview] = useState<string>("")

  const toggleStrong = (s: string) => setStrongSkills((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s])
  const toggleWeak = (s: string) => setWeakSkills((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s])

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoPreview(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    const profile = {
      id: Date.now(),
      img: photoPreview || `https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=400&q=80`,
      name,
      dept: `${dept}, Section ${section}`,
      strong: strongSkills.join(" • ") || "Eager Learner",
      weak: weakSkills.join(" • ") || "Open to anything",
      bio: bio || `${year} ${dept} student looking for ${PURPOSES.find(p => p.id === purpose)?.label || "study partners"}.`,
    }
    addUserToDiscovery(profile)
    setSubmitted(true)
  }

  const isStep1Valid = name.trim() && dept && year && section.trim()
  const isStep2Valid = strongSkills.length > 0 || weakSkills.length > 0
  const isStep3Valid = true

  const inputStyle = {
    background: 'rgba(168,85,247,0.06)',
    border: '1px solid rgba(168,85,247,0.25)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: 'white',
    fontSize: '14px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex flex-col items-center justify-center text-center max-w-md mx-auto relative z-10">
        <div className="w-24 h-24 rounded-3xl flex items-center justify-center mb-6 text-5xl"
          style={{ background: 'linear-gradient(135deg, rgba(147,51,234,0.3), rgba(124,58,237,0.2))', border: '1px solid rgba(168,85,247,0.4)', boxShadow: '0 0 40px rgba(147,51,234,0.3)' }}>
          ⚡
        </div>
        <CheckCircle2 className="w-10 h-10 text-green-400 mb-4" />
        <h2 className="text-3xl font-black mb-3 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
          You&apos;re Live!
        </h2>
        <p className="text-purple-300/70 text-lg mb-8">
          Your profile is now in the discovery deck. Start swiping to find your match!
        </p>
        {photoPreview && (
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500/40 mb-6 shadow-lg">
            <Image src={photoPreview} alt="Your photo" fill className="object-cover" />
          </div>
        )}
        <p className="text-white/80 font-bold text-xl mb-1">{name}</p>
        <p className="text-purple-300/60 text-sm mb-8">{dept}, {year}</p>
        <button
          onClick={() => router.push("/match")}
          className="px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-2 transition-all hover:scale-105"
          style={{ background: 'linear-gradient(135deg, #9333ea, #7c3aed)', boxShadow: '0 8px 30px rgba(147,51,234,0.5)' }}
        >
          <Zap className="w-5 h-5" /> Start Discovering
        </button>
      </div>
    )
  }

  return (
    <div className="pt-20 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto relative z-10 pb-20">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
          style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' }}>
          Step {step} of 4
        </div>
        <h1 className="tech-heading text-4xl mb-2 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          {step === 1 && "Who are you?"}
          {step === 2 && "Your Tech Stack"}
          {step === 3 && "Tell your story"}
          {step === 4 && "Final touches"}
        </h1>
        <p className="text-purple-300/60">
          {step === 1 && "Let's get the basics down."}
          {step === 2 && "What do you bring to the table?"}
          {step === 3 && "Give people a reason to swipe right."}
          {step === 4 && "Almost there — add a photo and submit!"}
        </p>
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full mb-10 overflow-hidden" style={{ background: 'rgba(168,85,247,0.15)' }}>
        <div className="h-full rounded-full transition-all duration-500"
          style={{ width: `${(step / 4) * 100}%`, background: 'linear-gradient(90deg, #9333ea, #c084fc)' }} />
      </div>

      {/* Card */}
      <div className="rounded-3xl p-8"
        style={{
          background: 'linear-gradient(135deg, rgba(120,40,200,0.15), rgba(60,10,120,0.08))',
          border: '1px solid rgba(168,85,247,0.25)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 20px 60px rgba(80,0,160,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
        }}>

        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-purple-300/70 mb-2 uppercase tracking-widest">Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)}
                placeholder="e.g. K. Visagan" style={inputStyle}
                className="placeholder-white/20 focus:border-purple-400" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-purple-300/70 mb-2 uppercase tracking-widest">Department</label>
                <select value={dept} onChange={(e) => setDept(e.target.value)} style={inputStyle}
                  className="focus:border-purple-400 appearance-none cursor-pointer">
                  <option value="" className="bg-[#1a0035]">Select...</option>
                  {DEPARTMENTS.map((d) => <option key={d} value={d} className="bg-[#1a0035]">{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-purple-300/70 mb-2 uppercase tracking-widest">Year</label>
                <select value={year} onChange={(e) => setYear(e.target.value)} style={inputStyle}
                  className="focus:border-purple-400 appearance-none cursor-pointer">
                  <option value="" className="bg-[#1a0035]">Select...</option>
                  {YEARS.map((y) => <option key={y} value={y} className="bg-[#1a0035]">{y}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-purple-300/70 mb-2 uppercase tracking-widest">Section</label>
              <input value={section} onChange={(e) => setSection(e.target.value)}
                placeholder="e.g. A, B, C, D..." style={inputStyle}
                className="placeholder-white/20 focus:border-purple-400" />
            </div>
            <div>
              <label className="block text-xs font-bold text-purple-300/70 mb-2 uppercase tracking-widest">Looking for</label>
              <div className="grid grid-cols-2 gap-2">
                {PURPOSES.map((p) => (
                  <button type="button" key={p.id} onClick={() => setPurpose(p.id)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={
                      purpose === p.id
                        ? { background: 'linear-gradient(135deg, rgba(147,51,234,0.4), rgba(124,58,237,0.3))', border: '1px solid rgba(168,85,247,0.6)', color: '#e9d5ff', boxShadow: '0 4px 12px rgba(147,51,234,0.3)' }
                        : { background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)', color: 'rgba(192,132,252,0.6)' }
                    }>
                    <span>{p.emoji}</span> {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Skills */}
        {step === 2 && (
          <div className="flex flex-col gap-7">
            <div>
              <label className="block text-sm font-black text-white mb-1">💪 You&apos;re Strong At</label>
              <p className="text-xs text-purple-300/50 mb-3">Pick up to 5 skills</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((s) => (
                  <SkillChip key={s} label={s} selected={strongSkills.includes(s)}
                    onClick={() => { if (strongSkills.includes(s) || strongSkills.length < 5) toggleStrong(s) }} />
                ))}
              </div>
            </div>
            <div className="h-px" style={{ background: 'rgba(168,85,247,0.15)' }} />
            <div>
              <label className="block text-sm font-black text-white mb-1">🤔 You Need Help With</label>
              <p className="text-xs text-purple-300/50 mb-3">Pick up to 3 skills</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map((s) => (
                  <SkillChip key={s} label={s} selected={weakSkills.includes(s)}
                    onClick={() => { if (weakSkills.includes(s) || weakSkills.length < 3) toggleWeak(s) }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Bio */}
        {step === 3 && (
          <div>
            <label className="block text-xs font-bold text-purple-300/70 mb-2 uppercase tracking-widest">Your Bio</label>
            <p className="text-xs text-purple-300/40 mb-4">Make it real. What are you working on? What do you actually need?</p>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. Working on a quant project. Need someone who can help build a clean web interface for it."
              rows={5}
              style={{ ...inputStyle, resize: 'vertical' }}
              className="placeholder-white/20 focus:border-purple-400"
            />
            <p className="text-right text-xs text-white/25 mt-2">{bio.length} / 200</p>
          </div>
        )}

        {/* STEP 4: Photo upload */}
        {step === 4 && (
          <div className="flex flex-col items-center gap-6">
            <div
              onClick={() => fileRef.current?.click()}
              className="relative w-36 h-36 rounded-full overflow-hidden cursor-pointer group flex items-center justify-center transition-all hover:scale-105"
              style={{
                background: photoPreview ? 'transparent' : 'rgba(168,85,247,0.1)',
                border: photoPreview ? '3px solid rgba(168,85,247,0.6)' : '2px dashed rgba(168,85,247,0.4)',
                boxShadow: photoPreview ? '0 0 30px rgba(147,51,234,0.4)' : 'none',
              }}
            >
              {photoPreview ? (
                <Image src={photoPreview} alt="Preview" fill className="object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-purple-300/60">
                  <Upload className="w-8 h-8" />
                  <span className="text-xs font-semibold">Upload Photo</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="w-6 h-6 text-white" />
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
            <p className="text-purple-300/40 text-sm text-center">Optional — we&apos;ll use a placeholder if you skip</p>

            {/* Profile preview */}
            <div className="w-full rounded-2xl p-5 text-center"
              style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}>
              <p className="text-xs text-purple-300/50 uppercase tracking-widest mb-3">Your profile card preview</p>
              <p className="text-xl font-black text-white">{name || "Your Name"}</p>
              <p className="text-sm text-purple-300/60">{dept ? `${dept}, Section ${section}` : "Dept, Section"}</p>
              {strongSkills.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mt-3">
                  {strongSkills.slice(0, 3).map((s) => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'rgba(168,85,247,0.2)', border: '1px solid rgba(168,85,247,0.3)', color: '#c084fc' }}>
                      {s}
                    </span>
                  ))}
                  {strongSkills.length > 3 && <span className="text-[10px] text-white/30">+{strongSkills.length - 3} more</span>}
                </div>
              )}
              {bio && <p className="text-xs text-white/40 mt-3 italic line-clamp-2">&quot;{bio}&quot;</p>}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        {step > 1 ? (
          <button onClick={() => setStep(s => s - 1)}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-purple-300/70 hover:text-white transition-colors"
            style={{ background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.2)' }}>
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        ) : <div />}

        {step < 4 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={step === 1 ? !isStep1Valid : step === 2 ? !isStep2Valid : !isStep3Valid}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: 'linear-gradient(135deg, #9333ea, #7c3aed)', boxShadow: '0 4px 20px rgba(147,51,234,0.4)' }}>
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-black transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #9333ea, #7c3aed)', boxShadow: '0 4px 20px rgba(147,51,234,0.5)' }}>
            <Zap className="w-4 h-4" /> Join Discovery!
          </button>
        )}
      </div>
    </div>
  )
}
