import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ProfileData } from '@/lib/data'

export interface ChatMessage {
  id: string
  senderId: number | 'me'
  text: string
  timestamp: number
}

export interface UserProfile {
  name: string
  dept: string
  bio: string
  purpose: string
}

interface AppState {
  matches: ProfileData[]
  addMatch: (profile: ProfileData) => void
  
  messages: Record<number, ChatMessage[]>
  sendMessage: (matchId: number, text: string, senderId?: number | 'me') => void

  discoveryProfiles: ProfileData[]
  addUserToDiscovery: (profile: ProfileData) => void

  userProfile: UserProfile
  updateUserProfile: (profile: Partial<UserProfile>) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      matches: [],
      messages: {},
      discoveryProfiles: [],
      addUserToDiscovery: (profile) =>
        set((state) => ({
          discoveryProfiles: [profile, ...state.discoveryProfiles]
        })),
      addMatch: (profile) =>
        set((state) => {
          if (state.matches.some((m) => m.id === profile.id)) return state
          
          // Seed a fake initial message from the match
          const initialMessage: ChatMessage = {
            id: Date.now().toString(),
            senderId: profile.id,
            text: `Hey! Looks like we're both into ${profile.strong.split('•')[0].trim()}. Want to team up?`,
            timestamp: Date.now()
          }

          return { 
            matches: [...state.matches, profile],
            messages: {
              ...state.messages,
              [profile.id]: [initialMessage]
            }
          }
        }),

      sendMessage: (matchId, text, senderId = 'me') => 
        set((state) => {
          const newMessage: ChatMessage = {
            id: Date.now().toString() + Math.random(),
            senderId,
            text,
            timestamp: Date.now()
          }
          const existingMessages = state.messages[matchId] || []
          return {
            messages: {
              ...state.messages,
              [matchId]: [...existingMessages, newMessage]
            }
          }
        }),
      
      userProfile: {
        name: 'K. Visagan',
        dept: 'AIML, Section D',
        bio: 'Building Recharge — always down to talk product, fintech, or your next hackathon idea.',
        purpose: 'Friendship',
      },
      updateUserProfile: (updates) =>
        set((state) => ({ userProfile: { ...state.userProfile, ...updates } })),
    }),
    {
      name: 'recharge-storage',
    }
  )
)
