import batangAwareImage from './assets/batangaware.png';

export type WorkCategory = 'Games' | 'Web' | 'Security';

export type Project = {
  id: string;
  number: string;
  name: string;
  category: string;
  categoryKey: WorkCategory;
  description: string;
  role?: string;
  details?: string;
  stack: string[];
  repositories: { label: string; url: string }[];
  accent: 'lime' | 'violet' | 'blue' | 'orange';
  image?: string;
  featured?: boolean;
};

// Add new work here. The homepage highlights a small selection; the project
// archive automatically includes every entry in this list.
export const projects: Project[] = [
  {
    id: 'batangaware', number: '01', name: 'BatangAware',
    category: 'Game development · Multiplayer', categoryKey: 'Games',
    description: 'A multiplayer social-deduction game that makes health education interactive, with an admin dashboard for teachers and parents.',
    role: 'Full-stack developer',
    details: 'Built the React dashboard and the backend responsible for real-time game state, user management, analytics, and role-based access for admins, teachers, and parents.',
    stack: ['React', 'Vite', 'Python', 'FastAPI', 'Redis', 'Supabase', 'Godot', 'Docker'],
    repositories: [
      { label: 'Teacher dashboard', url: 'https://github.com/yue-os/admin-teacher-dashboard' },
      { label: 'Game backend', url: 'https://github.com/yue-os/multiplayer-game-backend' },
    ],
    accent: 'lime', image: batangAwareImage, featured: true,
  },
  {
    id: 'ceit-cms', number: '02', name: 'CEIT Content Management System',
    category: 'Web development · Content platform', categoryKey: 'Web',
    description: 'A publishing platform and public website for the College of Engineering and Information Technology.',
    role: 'Full-stack developer',
    details: 'Developed the asynchronous API and connected it to a responsive public site and content-authoring workflow backed by PostgreSQL.',
    stack: ['Next.js', 'React', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    repositories: [
      { label: 'Frontend', url: 'https://github.com/yue-os/ceit-cms-frontend' },
      { label: 'Backend', url: 'https://github.com/yue-os/ceit-cms-backend' },
    ],
    accent: 'violet', featured: true,
  },
  {
    id: 'restaurant-api-game', number: '03', name: 'Damn Vulnerable RESTaurant API Game',
    category: 'Cybersecurity · API security lab', categoryKey: 'Security',
    description: 'An intentionally vulnerable REST API lab for exploring security testing and remediation in a controlled environment.',
    role: 'Security lab · fork',
    details: 'A fork of a deliberately vulnerable API training project. The upstream lab offers developer and security-testing workflows for finding and fixing flaws locally.',
    stack: ['Python', 'FastAPI', 'Docker', 'API security'],
    repositories: [{ label: 'Repository', url: 'https://github.com/yue-os/Damn-Vulnerable-RESTaurant-API-Game' }],
    accent: 'blue', featured: true,
  },
  {
    id: 'mern-message-app', number: '04', name: 'MERN Real-Time Message App',
    category: 'Web development · Real-time', categoryKey: 'Web',
    description: 'A messaging app with user authentication, persistent conversations, and instant delivery between chat rooms.',
    role: 'Full-stack developer',
    details: 'Built the React client and Node.js service, wiring Socket.io events to MongoDB-backed users and conversations.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
    repositories: [{ label: 'Repository', url: 'https://github.com/yue-os/messageApp' }],
    accent: 'orange', featured: true,
  },
  {
    id: 'linkedin-ai-auto-applier', number: '05', name: 'LinkedIn AI Auto Applier',
    category: 'Web development · Automation', categoryKey: 'Web',
    description: 'A browser automation tool that uses AI to tailor application materials and complete job application forms.',
    stack: ['Python', 'Selenium', 'OpenAI API', 'Flask', 'PyAutoGUI'],
    repositories: [], accent: 'violet',
  },
  {
    id: 'real-time-audit-protocol', number: '06', name: 'Real-Time Audit Protocol',
    category: 'Web development · Blockchain', categoryKey: 'Web',
    description: 'A financial auditing protocol that anchors normalized accounting data to an EVM blockchain for tamper-evident verification.',
    stack: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Solidity', 'Ethers.js'],
    repositories: [], accent: 'blue',
  },
  {
    id: 'ghost-apply-agent', number: '07', name: 'Ghost-Apply Agent',
    category: 'Web development · Automation', categoryKey: 'Web',
    description: 'An AI-driven job application agent that automates browser workflows with Google Generative AI.',
    stack: ['Node.js', 'TypeScript', 'Playwright', 'Google Generative AI'],
    repositories: [], accent: 'lime',
  },
  {
    id: 'digitalize-survey-system', number: '08', name: 'Digitalize SurveySystem',
    category: 'Web development · Platform', categoryKey: 'Web',
    description: 'A REST API for a feedback platform with custom form building, analytics, and role-based response management.',
    stack: ['ASP.NET Core', 'C#', 'PostgreSQL'],
    repositories: [], accent: 'orange',
  },
  {
    id: 'discord-key-ecosystem', number: '09', name: 'Discord Key Ecosystem',
    category: 'Web development · Access management', categoryKey: 'Web',
    description: 'A Discord bot and companion API for generating and validating software keys.',
    stack: ['Node.js', 'Express', 'Discord.js', 'PostgreSQL', 'Nodemailer'],
    repositories: [], accent: 'violet',
  },
  {
    id: 'bayanihan-builders', number: '10', name: 'Bayanihan Builders',
    category: 'Game development · Cooperative', categoryKey: 'Games',
    description: 'A Filipino-themed cooperative game focused on community building and resource management.',
    stack: ['Unity', 'C#'],
    repositories: [], accent: 'lime',
  },
  {
    id: 'tondo-rift', number: '11', name: 'Tondo Rift',
    category: 'Game development · Fighting game', categoryKey: 'Games',
    description: 'A tactical fighting game set in a dystopian future Tondo, featuring combo systems and rollback netcode.',
    stack: ['Unity', 'C#'],
    repositories: [], accent: 'orange',
  },
];
