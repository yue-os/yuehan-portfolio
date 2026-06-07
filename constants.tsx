import { 
  Gamepad2, 
  ShieldAlert, 
  Code2, 
  Facebook, 
  Github, 
  FileText, 
  Gamepad, 
  Terminal,
  Cpu,
  Globe,
  Instagram,
  MessageSquare
} from 'lucide-react';
import { Project, Service, Stat, SocialLink, Experience } from './types';

export const HERO_HEADLINE = "Yuehan: Small progress, still a progress.";
export const HERO_SUB = "Full-Stack Developer | Game Dev | Cybersecurity knowledgeable with 2+ years of experience.";

export const STATS: Stat[] = [
  { label: "Experience", value: "2+ Years", icon: Terminal, color: "text-cyan-400" },
  { label: "Languages", value: "10+ Mastery", icon: Code2, color: "text-purple-400" },
  { label: "Projects", value: "25+ Shipped", icon: Cpu, color: "text-rose-400" },
];

export const SERVICES: Service[] = [
  {
    title: "Game Development",
    description: "Immersive worlds built with performance and gameplay mechanics in mind.",
    icon: Gamepad2,
    skills: ["Unity", "Godot", "Mobile Ports", "C#", "GDScript"],
    color: "cyan"
  },
  {
    title: "Cybersecurity",
    description: "Fortifying applications through rigorous testing and hardening.",
    icon: ShieldAlert,
    skills: ["Pentesting", "Vuln Assessment", "Android Hardening", "Kali Linux"],
    color: "crimson"
  },
  {
    title: "Full-Stack Dev",
    description: "Scalable web applications with modern frameworks and robust backends.",
    icon: Globe,
    skills: ["React", "Next.js", "Node.js", "Docker", "PostgreSQL"],
    color: "purple"
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: "BatangAware",
    category: "Game Dev",
    description: "A full-stack multiplayer social deduction card game designed for health education, featuring a React dashboard for administrators and a robust backend for real-time game state management.",
    techStack: ["React", "Vite", "Python", "FastAPI", "Redis", "Supabase"],
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 'p2',
    title: "CEIT CMS",
    category: "Full Stack",
    description: "A comprehensive full-stack CMS platform tailored for CEIT, providing seamless content authoring via an async backend API and a high-performance public-facing website.",
    techStack: ["Next.js", "React", "Tailwind CSS", "FastAPI", "PostgreSQL"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'p3',
    title: "LinkedIn AI Auto Applier",
    category: "Security",
    description: "Intelligent web automation bot that accelerates job applications by leveraging AI to customize resumes and answer forms dynamically while evading bot detection.",
    techStack: ["Python", "Selenium", "OpenAI API", "Flask", "PyAutoGUI"],
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'p4',
    title: "Real-Time Audit Protocol",
    category: "Security",
    description: "Decentralized financial auditing protocol that anchors normalized accounting data to an EVM blockchain for immutable, tamper-proof verification.",
    techStack: ["Node.js", "Express", "TypeScript", "PostgreSQL", "Solidity", "Ethers.js"],
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'p5',
    title: "Ghost-Apply Agent",
    category: "Security",
    description: "AI-driven job application automation agent utilizing browser automation and Google's Generative AI to streamline complex application workflows.",
    techStack: ["Node.js", "TypeScript", "Playwright", "Google Generative AI"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'p6',
    title: "Digitalize SurveySystem",
    category: "Full Stack",
    description: "Production-ready REST API for a dynamic feedback platform featuring custom form building, real-time analytics, and role-based response management.",
    techStack: ["ASP.NET Core", "C#", "PostgreSQL"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'p7',
    title: "MERN Real-Time Message App",
    category: "Full Stack",
    description: "Full-stack real-time communication platform enabling instant messaging between users via bidirectional WebSocket connections and document-based storage.",
    techStack: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
    imageUrl: "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'p8',
    title: "Discord Key Ecosystem",
    category: "Security",
    description: "Monetization and access management ecosystem consisting of a Discord bot interface and a companion web API for generating and validating software keys.",
    techStack: ["Node.js", "Express", "Discord.js", "PostgreSQL", "Nodemailer"],
    imageUrl: "https://images.unsplash.com/photo-1614064641935-4476a89b4a39?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'p9',
    title: "Bayanihan Builders",
    category: "Game Dev",
    description: "Filipino-themed cooperative game focusing on community building and resource management mechanics.",
    techStack: ["Unity", "C#"],
    imageUrl: "https://img.itch.zone/aW1nLzI0NTM1MDIwLnBuZw==/347x500/UjJiNe.png"
  },
  {
    id: 'p10',
    title: "Tondo Rift",
    category: "Game Dev",
    description: "Fast-paced tactical fighting game set in a dystopian future version of Tondo. Features complex combo systems and rollback netcode.",
    techStack: ["Unity", "C#"],
    imageUrl: "https://img.itch.zone/aW1nLzI0NDE5OTkxLnBuZw==/347x500/MTwaz1.png"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'e1',
    company: "Independent Contract Work",
    role: "Full-Stack Developer & Security Auditor",
    period: "2024 - Present",
    description: [
      "Architected and deployed full-stack educational platforms with real-time multiplayer capabilities.",
      "Conducted security audits and penetration tests for web and mobile applications.",
      "Developed advanced automation systems using AI and headless browser technology."
    ],
    skills: ["React", "FastAPI", "Blockchain", "Python", "Playwright"]
  },
  {
    id: 'e2',
    company: "Digitalize Systems",
    role: "Backend Engineer (Freelance)",
    period: "2023 - 2024",
    description: [
      "Built production-ready REST APIs with ASP.NET Core for feedback and survey management.",
      "Optimized database queries and schemas for high-concurrency data collection.",
      "Implemented role-based access control and secure authentication layers."
    ],
    skills: ["C#", "ASP.NET Core", "PostgreSQL", "REST API", "Docker"]
  }
];

export const TECH_STACK = [
  { category: "Languages", items: [
    { name: "Python", icon: "🐍" },
    { name: "C#", icon: "#️⃣" },
    { name: "TypeScript", icon: "TS" },
    { name: "JavaScript", icon: "JS" },
    { name: "Rust", icon: "🦀" },
    { name: "Solidity", icon: "📜" }
  ]},
  { category: "Frameworks", items: [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "FastAPI", icon: "🚀" },
    { name: "Node.js", icon: "🟢" },
    { name: "ASP.NET", icon: "🌐" }
  ]},
  { category: "Engines & Tools", items: [
    { name: "Unity", icon: "🎮" },
    { name: "Godot", icon: "🤖" },
    { name: "Docker", icon: "🐳" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "Supabase", icon: "⚡" },
    { name: "Redis", icon: "📦" }
  ]},
  { category: "Cybersecurity", items: [
    { name: "Kali Linux", icon: "🐉" },
    { name: "Burp Suite", icon: "🐝" },
    { name: "Metasploit", icon: "🎯" },
    { name: "Nmap", icon: "🔍" }
  ]}
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/yue-os", icon: Github },
  { platform: "Medium", url: "https://medium.com/yue-os", icon: FileText },
  { platform: "Itch.io", url: "https://itch.io/fibonacci", icon: Gamepad },
  { platform: "Facebook", url: "https://facebook.com/lazyyuehan", icon: Facebook },
  { platform: "Instagram", url: "https://instagram.com/_y.hue", icon: Instagram },
  { platform: "Discord", url: "https://discord.com/users/1377965367472951417", icon: MessageSquare },
];