"use client"

import { useAppStore } from "@/store/useStore"
import { DEMO_PROFILES } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useState, useRef, useEffect, use } from "react"
import { ChevronLeft, Info, Send } from "lucide-react"

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const matchId = parseInt(resolvedParams.id, 10)
  const match = DEMO_PROFILES.find((p) => p.id === matchId)
  
  if (!match) {
    notFound()
  }

  const [text, setText] = useState("")
  const messages = useAppStore((state) => state.messages[matchId]) || []
  const sendMessage = useAppStore((state) => state.sendMessage)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    sendMessage(matchId, text)
    setText("")
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-3xl mx-auto bg-black/20 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md animate-in fade-in zoom-in-95 duration-300 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-4">
          <Link href="/matches" className="text-white/70 hover:text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          
          <Link href={`/profile/${match.id}`} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-transparent group-hover:border-accent-teal transition-colors">
              <Image src={match.img} alt={match.name} fill className="object-cover" unoptimized />
            </div>
            <div>
              <h2 className="font-bold text-sm leading-tight group-hover:text-accent-teal transition-colors">{match.name}</h2>
              <p className="text-xs text-white/50">{match.dept}</p>
            </div>
          </Link>
        </div>
        <Link href={`/profile/${match.id}`} className="text-white/70 hover:text-white p-2">
          <Info className="w-5 h-5" />
        </Link>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 flex flex-col gap-4"
      >
        <div className="flex flex-col items-center justify-center my-6 opacity-70">
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-3">
            <Image src={match.img} alt={match.name} fill className="object-cover" unoptimized />
          </div>
          <h3 className="font-bold text-lg">{match.name}</h3>
          <p className="text-sm text-white/50">Recharge Match</p>
        </div>

        {messages.map((msg) => {
          const isMe = msg.senderId === 'me'
          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                  isMe 
                    ? 'bg-accent-teal text-black rounded-br-sm' 
                    : 'bg-white/10 text-white rounded-bl-sm border border-white/10'
                }`}
              >
                {msg.text}
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="p-4 bg-white/5 border-t border-white/10">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input 
            type="text" 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Message..." 
            className="w-full bg-white/5 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white outline-none focus:border-accent-teal focus:bg-white/10 transition-colors"
          />
          <button 
            type="submit" 
            disabled={!text.trim()}
            className="absolute right-2 p-2 text-accent-teal disabled:text-white/20 disabled:cursor-not-allowed hover:scale-110 transition-transform"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}
