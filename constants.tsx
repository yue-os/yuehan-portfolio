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
  Discord
} from 'lucide-react';
import { Project, Service, Stat, SocialLink } from './types';

export const HERO_HEADLINE = "Yuehan: Small progress is still progress.";
export const HERO_SUB = "Full-Stack Developer | Game Dev | Cybersecurity knowledgeable with 5+ years of experience.";

export const STATS: Stat[] = [
  { label: "Experience", value: "5+ Years", icon: Terminal, color: "text-cyan-400" },
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
    description: "A multiplayer health education game designed to teach children about hygiene and disease prevention in a fun, cooperative environment.",
    techStack: ["Godot", "WebSockets", "Pixel Art"],
    imageUrl: "https://picsum.photos/600/400?random=1"
  },
  {
    id: 'p2',
    title: "Digitalize SurveySystem",
    category: "Full Stack",
    description: "Production-ready feedback platform featuring real-time analytics, custom form builders, and role-based access control.",
    techStack: ["React", "Node.js", "MongoDB", "Chart.js"],
    imageUrl: "https://picsum.photos/600/400?random=2"
  },
  {
    id: 'p3',
    title: "Bayanihan Builders",
    category: "Game Dev",
    description: "Filipino-themed cooperative game focusing on community building and resource management mechanics.",
    techStack: ["Unity", "C#", "Photon PUN"],
    imageUrl: "https://img.itch.zone/aW1nLzI0NTM1MDIwLnBuZw==/347x500/UjJiNe.png"
  },
  {
    id: 'p4',
    title: "Tondo Rift",
    category: "Game Dev",
    description: "Fast-paced tactical fighting game set in a dystopian future version of Tondo. Features complex combo systems and rollback netcode.",
    techStack: ["Unity", "C#", "GGPO"],
    imageUrl: "https://img.itch.zone/aW1nLzI0NDE5OTkxLnBuZw==/347x500/MTwaz1.png"
  }
];

export const TECH_STACK = [
  { name: "Python", icon: "🐍" },
  { name: "C#", icon: "#️⃣" },
  { name: "JavaScript", icon: "JS" },
  { name: "TypeScript", icon: "TS" },
  { name: "Unity", icon: "🎮" },
  { name: "Godot", icon: "🤖" },
  { name: "Kali Linux", icon: "🐉" },
  { name: "Docker", icon: "🐳" },
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "Rust", icon: "🦀" },
  { name: "PostgreSQL", icon: "🐘" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/yue-os", icon: Github },
  { platform: "Medium", url: "https://medium.com/yue-os", icon: FileText },
  { platform: "Itch.io", url: "https://itch.io/fibonacci", icon: Gamepad },
  { platform: "Facebook", url: "https://facebook.com/lazyyuehan", icon: Facebook },
  { platform: "Instagram", url: "https://instagram.com/_y.hue", icon: Instagram },
  { platform: "Discord", url: "https://discord.com/users/1377965367472951417", icon: Discord },
];