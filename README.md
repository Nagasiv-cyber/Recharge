<div align="center">

# ⚡ Recharge

### Campus Matchmaking for Study Partners and Project Collaborators

*Not here for small talk. Match by tech stack, find your table in the study hub, or swipe right on your next co-founder.*

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-ff0055?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## 🎯 What is Recharge?

**Recharge** is a campus-first academic matchmaking platform designed to connect university students based on technical skills, study goals, and project needs — not random chance. Think of it as a Tinder for your academic life, built specifically for the engineering college experience.

Whether you're stuck on a DSA problem at 2 AM, need a backend partner for your next hackathon, or just want to find someone who understands your niche research area — Recharge finds the people who complement *exactly* what you're working on.

> **Study Together. Grow Together.**
> Because sometimes, finding the perfect partner for your project is just the beginning of the story.

---

## ✨ Features

### 🃏 Swipe-Based Match Discovery
A beautiful Tinder-style card deck built with Framer Motion physics. Drag cards left to pass, right to connect. The algorithm surfaces profiles based on complementary skills — your weaknesses matched to someone else's strengths.

### 💬 Instagram-Style Direct Messaging
Matched with someone? Jump into a real-time DM. The chat interface features:
- Tap on a profile photo to jump to their full public profile (like Instagram)
- Seeded icebreaker messages from your new match
- Persistent message history across navigation

### 🧑‍💻 Public Profile Pages
Every student gets a beautiful, glassmorphic profile card showing:
- Their department, year, and section
- **Skills they bring to the table** (green tags)
- **Areas they need help with** (red tags)
- A personal bio describing what they're actually working on

### 📚 Group Study Hub
Find or create virtual study tables for any subject. Features include:
- Live seat tracking with animated fill bars
- Topic tags (DSA, Research, Exam Prep, etc.)
- One-click "Join Table" — creates a session with your existing matches
- "Create Table" modal — host your own study room instantly

### 🧭 Premium Blueprints
A curated guide library of real student projects:
- Filter by difficulty: **Beginner / Intermediate / Advanced**
- Read time and star rating on each guide
- Topics ranging from UAV firmware to quant trading algorithms

### 🧑‍💼 Onboarding Portal
A stunning 4-step onboarding flow for new users:
1. **Basic Info** — Name, department, year, section, and what you're looking for
2. **Skill Stack** — Tap chips to declare what you're strong at and where you need help
3. **Your Pitch** — Write a bio that actually tells people what you're building
4. **Photo + Submit** — Upload a photo, preview your card, and go live in the discovery deck instantly

### 🌐 Marketing Landing Page
A scroll-driven marketing page with GSAP-powered animations, a swipe demo protected behind a login gate, and floating emoji particles across sections.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 + custom CSS utilities |
| **Animations** | GSAP (ScrollTrigger) + Framer Motion |
| **State Management** | Zustand with persistence middleware |
| **UI Components** | Lucide Icons, custom Glass UI system |
| **Image Optimization** | Next.js Image + Unsplash integration |
| **Font Loading** | Google Fonts (Inter + Playfair Display) |

---

## 🎨 Design System

Recharge uses a **deep purple glassmorphism** design language:

- **Primary Palette**: `#0d0020` → `#1a0035` gradient background
- **Accent**: Purple `#9333ea` / `#c084fc` for interactive elements
- **Glass Cards**: `backdrop-filter: blur(20px)` with purple-tinted rgba backgrounds
- **Glow Effects**: Radial gradient ambient light + `box-shadow` neon borders
- **Typography**: Inter (900 weight tech headings) + Playfair Display (editorial italics)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Nagasiv-cyber/Recharge.git
cd Recharge

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure

```
Recharge/
├── app/
│   ├── (app)/              # Authenticated app routes
│   │   ├── match/          # Swipe deck (Discovery)
│   │   ├── matches/        # Your connections list
│   │   ├── chat/[id]/      # Direct messaging
│   │   ├── profile/[id]/   # Public profile view
│   │   ├── study-hub/      # Group study rooms
│   │   ├── guides/         # Project blueprints
│   │   └── onboard/        # 4-step onboarding portal
│   ├── (marketing)/        # Public landing page
│   └── globals.css         # Global theme & utilities
├── components/
│   ├── landing/            # Marketing page components
│   └── ui/                 # Reusable UI primitives
├── lib/
│   └── data.ts             # Demo profile data
├── store/
│   └── useStore.ts         # Zustand global state
└── public/                 # Static assets & profile photos
```

---

## 📱 App Pages

| Route | Description |
|---|---|
| `/` | Marketing landing page with scroll animations |
| `/match` | Swipe-based discovery deck |
| `/matches` | List of your connections |
| `/chat/[id]` | DM with a specific match |
| `/profile/[id]` | Public profile of any matched student |
| `/study-hub` | Browse and join group study rooms |
| `/guides` | Curated project blueprint library |
| `/onboard` | Profile creation portal |

---

## 🌟 Roadmap

- [ ] Real authentication (Supabase Auth)
- [ ] Live database (Supabase PostgreSQL) for persistent profiles and messages
- [ ] WebSocket-based real-time chat
- [ ] AI-powered compatibility scoring
- [ ] Campus event feed integration
- [ ] Mobile app (React Native)
- [ ] Pomodoro-style shared study timers
- [ ] Push notifications for new matches

---

## 👨‍💻 Built By

**K. Visagan** — AIML, Section D

> Working on a quant project. Need someone who can help build a clean web interface for it.

---


---

<div align="center">

**⚡ Recharge** — *Campus matchmaking for the people who actually build things.*

[Report Bug](https://github.com/Nagasiv-cyber/Recharge/issues) · [Request Feature](https://github.com/Nagasiv-cyber/Recharge/issues)

</div>
