export interface ProfileData {
  id: number
  img: string
  name: string
  dept: string
  strong: string
  weak: string
  bio: string
}

export const DEMO_PROFILES: ProfileData[] = [
  {
    id: 1,
    img: "/image_e0b039.jpg.png",
    name: "K. Visagan",
    dept: "AIML, Section D",
    strong: "Python • Machine Learning",
    weak: "Advanced UI/UX",
    bio: "Working on a quant project. Need someone who can help build a clean web interface for it.",
  },
  {
    id: 2,
    img: "/image_e0b078.jpg.png",
    name: "Anika Ramesh",
    dept: "CSE, Section B",
    strong: "React • Figma",
    weak: "Backend Architecture",
    bio: "Designing a campus events app and looking for a backend partner who doesn't hate meetings.",
  },
  {
    id: 3,
    img: "/image_e0b0d8.jpg.png",
    name: "Dev Kumar",
    dept: "ECE, Section A",
    strong: "Embedded Systems • C++",
    weak: "Frontend / React",
    bio: "Building a drone flight controller. Need someone to make the ground-station dashboard not look terrible.",
  },
  {
    id: 4,
    img: "/image_e0b0f9.jpg.png",
    name: "Priya Subramaniam",
    dept: "AIML, Section C",
    strong: "NLP • PyTorch",
    weak: "DevOps / Deployment",
    bio: "My model works great locally and dies the second I try to deploy it. Send help.",
  },
  {
    id: 5,
    img: "/image_e0b119.jpg.png",
    name: "Meera Nair",
    dept: "CSE, Section A",
    strong: "DSA • Competitive Coding",
    weak: "Public Speaking",
    bio: "Codeforces specialist trying to survive placement season. Study buddy for DSA rounds needed.",
  },
  {
    id: 6,
    img: "/image_e0b49b.jpg.png",
    name: "Divya Krishnan",
    dept: "AIML, Section B",
    strong: "Computer Vision • OpenCV",
    weak: "Cloud Deployment",
    bio: "Training a vision model for a campus hackathon. Need a teammate who actually enjoys AWS.",
  },
  {
    id: 7,
    img: "/image_e0b79c.jpg.png",
    name: "Ishita Rao",
    dept: "IT, Section D",
    strong: "UI/UX Design • Figma",
    weak: "Database Design",
    bio: "I can make anything look good. I cannot make a schema that doesn't fall apart at 3NF.",
  },
  {
    id: 8,
    img: "/image_e0b7c3.jpg.png",
    name: "Sneha Iyer",
    dept: "ECE, Section C",
    strong: "IoT • Embedded C",
    weak: "Frontend Frameworks",
    bio: "My sensors talk to each other fine. My dashboard for them looks like it's from 2004.",
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80",
    name: "Arjun Mehta",
    dept: "Mechanical, Section A",
    strong: "SolidWorks • AutoCAD",
    weak: "Python Scripting",
    bio: "I can design the chassis perfectly, but I need someone to write the code that actually makes the motors spin.",
  },
  {
    id: 10,
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    name: "Zoe Chen",
    dept: "IT, Section B",
    strong: "Cybersecurity • Penetration Testing",
    weak: "Graphic Design",
    bio: "Working on a campus network auditing tool. Looking for a designer who can make my terminal logs look like a startup product.",
  },
  {
    id: 11,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    name: "Rohan Das",
    dept: "AIML, Section E",
    strong: "TensorFlow • Data Visualization",
    weak: "Mobile Dev",
    bio: "Got the predictive model for student attendance working. Need an Android dev to wrap it into an app.",
  },
  {
    id: 12,
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    name: "Maya Patel",
    dept: "CSE, Section D",
    strong: "Next.js • TailwindCSS",
    weak: "Web3 / Blockchain",
    bio: "Trying to win the upcoming Web3 track hackathon. I can build the frontend, you bring the smart contracts.",
  },
  {
    id: 13,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    name: "Karan Singh",
    dept: "ECE, Section B",
    strong: "VLSI • Verilog",
    weak: "Technical Writing",
    bio: "My chip design works but my project report is a disaster. Need a study partner to review documentation.",
  },
  {
    id: 14,
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    name: "Aisha Khan",
    dept: "AIML, Section A",
    strong: "Generative AI • LangChain",
    weak: "Database Scaling",
    bio: "Building an AI tutor bot for juniors. It hallucinates less now, but the database crashes when 3 people use it.",
  }
]
