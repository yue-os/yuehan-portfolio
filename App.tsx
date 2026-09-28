import { ArrowDown, ArrowRight, ArrowUpRight, Braces, Github, Linkedin, Menu, Terminal, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import batangAwareImage from './assets/batangaware.png';
import profilePhoto from './assets/profile_2.jpg';

type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  role: string;
  details: string;
  stack: string[];
  repositories: { label: string; url: string }[];
  accent: 'lime' | 'violet' | 'blue' | 'orange';
};

const projects: Project[] = [
  {
    number: '01',
    name: 'BatangAware',
    category: 'Game development · Multiplayer',
    description: 'A multiplayer social-deduction game that makes health education interactive, with an admin dashboard for teachers and parents.',
    role: 'Full-stack developer',
    details: 'Built the React dashboard and the backend responsible for real-time game state, user management, analytics, and role-based access for admins, teachers, and parents.',
    stack: ['React', 'Vite', 'Python', 'FastAPI', 'Redis', 'Supabase', 'Godot', 'Docker'],
    repositories: [
      { label: 'Teacher dashboard', url: 'https://github.com/yue-os/admin-teacher-dashboard' },
      { label: 'Game backend', url: 'https://github.com/yue-os/multiplayer-game-backend' },
    ],
    accent: 'lime',
  },
  {
    number: '02',
    name: 'CEIT Content Management System',
    category: 'Web development · Content platform',
    description: 'A publishing platform and public website for the College of Engineering and Information Technology.',
    role: 'Full-stack developer',
    details: 'Developed the asynchronous API and connected it to a responsive public site and content-authoring workflow backed by PostgreSQL.',
    stack: ['Next.js', 'React', 'FastAPI', 'PostgreSQL', 'Tailwind CSS'],
    repositories: [
      { label: 'Frontend', url: 'https://github.com/yue-os/ceit-cms-frontend' },
      { label: 'Backend', url: 'https://github.com/yue-os/ceit-cms-backend' },
    ],
    accent: 'violet',
  },
  {
    number: '03',
    name: 'Damn Vulnerable RESTaurant API Game',
    category: 'Cybersecurity · API security lab',
    description: 'A fork of an intentionally vulnerable REST API lab for exploring security testing and remediation in a controlled environment.',
    role: 'Security lab · fork',
    details: 'This repository is a fork of a deliberately vulnerable API training project. The upstream lab offers both a developer workflow for identifying and fixing flaws and a security-testing workflow for finding them locally.',
    stack: ['Python', 'FastAPI', 'Docker', 'API security'],
    repositories: [
      { label: 'Repository', url: 'https://github.com/yue-os/Damn-Vulnerable-RESTaurant-API-Game' },
    ],
    accent: 'blue',
  },
  {
    number: '04',
    name: 'MERN Real-Time Message App',
    category: 'Web development · Real-time',
    description: 'A messaging app with user authentication, persistent conversations, and instant delivery between chat rooms.',
    role: 'Full-stack developer',
    details: 'Built the React client and Node.js service, wiring Socket.io events to MongoDB-backed users and conversations.',
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
    repositories: [
      { label: 'Repository', url: 'https://github.com/yue-os/messageApp' },
    ],
    accent: 'orange',
  },
];

const skills = [
  { group: 'Game development', values: ['Unity', 'Godot', 'C#', 'GDScript', 'Multiplayer games'] },
  { group: 'Web development', values: ['React', 'Next.js', 'TypeScript', 'Python', 'FastAPI', 'Node.js', 'PostgreSQL'] },
  { group: 'Cybersecurity', values: ['Kali Linux', 'Burp Suite', 'Nmap', 'Metasploit', 'Pen testing', 'Vulnerability assessment'] },
];

const githubUrl = 'https://github.com/yue-os';
const linkedInUrl = 'https://www.linkedin.com/in/john-mark-c-51630a300/';

function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function App() {
  useScrollReveal();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Yuehan Calimbo, home">
            <span className="wordmark-icon"><Terminal size={17} strokeWidth={2.2} /></span>
            <span>yuehan<span className="wordmark-dot">.</span></span>
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
            <a href="#work" onClick={closeMenu}>Work</a>
            <a href="/walkthroughs.html" onClick={closeMenu}>Walkthroughs</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a className="nav-contact" href="#contact" onClick={closeMenu}>Get in touch <ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="top">
          <div className="hero-copy" data-reveal="left">
            <p className="eyebrow"><span className="status-dot" /> GAME DEV <span className="eyebrow-divider">/</span> WEB DEV <span className="eyebrow-divider">/</span> CYBERSECURITY</p>
            <h1>Games, web apps, <span>and secure systems.</span></h1>
            <p className="hero-intro">I’m John Mark Calimbo. I build multiplayer experiences and full-stack web products, and explore how to test and harden the systems behind them.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">Explore my work <ArrowRight size={17} /></a>
              <a className="button button-secondary" href={githubUrl} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={16} /></a>
              {linkedInUrl && <a className="button button-secondary" href={linkedInUrl} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={16} /></a>}
            </div>
            <a className="scroll-cue" href="#work"><span>Scroll to explore</span><ArrowDown size={14} /></a>
          </div>

          <aside className="identity-card" data-reveal="right" aria-label="Developer profile">
            <div className="identity-card-top"><span><span className="window-dot window-red" /><span className="window-dot window-yellow" /><span className="window-dot window-green" /></span><span className="identity-label">profile.ts</span><Braces size={15} /></div>
            <div className="identity-card-content">
              <img className="profile-photo" src={profilePhoto} alt="John Mark Calimbo" />
              <div className="profile-name">John Mark Calimbo</div>
              <div className="profile-role">Full-stack developer</div>
              <div className="code-snippet" aria-label="A few things I work on">
                <span className="code-muted">const</span> <span className="code-green">focus</span> = [<br />
                <span className="code-indent"><span className="code-yellow">'game development'</span>,</span><br />
                <span className="code-indent"><span className="code-yellow">'web applications'</span>,</span><br />
                <span className="code-indent"><span className="code-yellow">'cybersecurity'</span></span><br />
                ];<span className="code-cursor" aria-hidden="true">_</span>
              </div>
            </div>
            <div className="identity-card-footer"><span>GAMES · WEB · SECURITY</span><span>BUILDING SINCE 2023</span></div>
          </aside>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading">
            <div data-reveal="up"><p className="eyebrow section-eyebrow">SELECTED WORK <span className="heading-line" /></p><h2>Projects with <span>purpose.</span></h2></div>
            <p className="section-description">A multiplayer game, web products, and an API security lab, with the work and decisions behind each one.</p>
          </div>

          <article className="featured-project" data-reveal="up">
            <div className="featured-copy">
              <div className="project-meta"><span className="project-number">01</span><span className="meta-divider" /><span>GAME DEVELOPMENT · EDUCATION</span></div>
              <h3>BatangAware</h3>
              <p className="featured-summary">A multiplayer learning game that brings health education to life, supported by a dashboard for teachers and parents.</p>
              <div className="role-line"><span>MY ROLE</span><b>Full-stack developer</b></div>
              <div className="tag-list">{projects[0].stack.map((item) => <span className="tech-tag" key={item}>{item}</span>)}</div>
              <details className="case-notes">
                <summary>Read the case notes <ArrowRight size={15} /></summary>
                <p>{projects[0].details}</p>
              </details>
              <div className="repo-links" aria-label="BatangAware source repositories">
                {projects[0].repositories.map((repository) => <a className="repo-link" href={repository.url} key={repository.url} target="_blank" rel="noreferrer"><Github size={13} /> {repository.label} <ArrowUpRight size={12} /></a>)}
              </div>
            </div>
            <div className="featured-visual"><img className="featured-image" src={batangAwareImage} alt="BatangAware landing page promoting its multiplayer health-awareness game" loading="lazy" /><span className="visual-caption"><span className="visual-caption-dot" /> BATANGAWARE · GAME PAGE</span></div>
          </article>

          <div className="project-grid">
            {projects.slice(1).map((project) => (
              <article className={`project-card accent-${project.accent}`} data-reveal="up" key={project.number}>
                <div className="project-card-top"><span className="project-number">{project.number}</span><span className="card-label">PROJECT NOTES</span></div>
                <p className="card-category">{project.category}</p>
                <h3>{project.name}</h3>
                <p className="card-description">{project.description}</p>
                <div className="role-line"><span>MY ROLE</span><b>{project.role}</b></div>
                <div className="tag-list">{project.stack.map((item) => <span className="tech-tag" key={item}>{item}</span>)}</div>
                <details className="case-notes"><summary>Read the case notes <ArrowRight size={15} /></summary><p>{project.details}</p></details>
                <div className="repo-links" aria-label={`${project.name} source repositories`}>
                  {project.repositories.map((repository) => <a className="repo-link" href={repository.url} key={repository.url} target="_blank" rel="noreferrer"><Github size={13} /> {repository.label} <ArrowUpRight size={12} /></a>)}
                </div>
              </article>
            ))}
          </div>
          <div className="walkthroughs-card" data-reveal="up">
            <div className="walkthroughs-copy"><p className="eyebrow">GUIDES &amp; TECHNICAL NOTES</p><h3>Walkthroughs</h3><p>Step-by-step security notes with complete Markdown and a challenge image for every room.</p></div>
            <a className="button button-secondary" href="/walkthroughs.html"><Terminal size={17} /> Open the walkthrough library <ArrowUpRight size={15} /></a>
          </div>
          <div className="work-more"><span>More experiments and source code</span><a href={githubUrl} target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={15} /></a></div>
        </section>

        <section className="about-section" id="about">
          <div className="section-wrap about-inner">
            <div className="about-copy" data-reveal="left"><p className="eyebrow section-eyebrow">A LITTLE ABOUT ME <span className="heading-line" /></p><h2>Build it.<br /><span>Understand it. Secure it.</span></h2><p>I work across game development and web development, from multiplayer experiences and frontend interfaces to backend APIs. I also practice application security through audits and hands-on labs.</p><p>I like understanding how a system behaves, finding its weak spots, and making the product clearer and more resilient.</p></div>
            <div className="experience-list" data-reveal="right" aria-label="Experience">
              <div className="experience-item" data-reveal="up"><span className="experience-period">2024 — NOW</span><div><h3>Independent contract work</h3><p>Full-stack development &amp; security auditing</p><span className="experience-detail">Web platforms · APIs · automation</span></div></div>
              <div className="experience-item" data-reveal="up"><span className="experience-period">2023 — 2024</span><div><h3>Digitalize Systems</h3><p>Backend engineer · Freelance</p><span className="experience-detail">REST APIs · PostgreSQL · ASP.NET Core</span></div></div>
            </div>
          </div>
        </section>

        <section className="skills-section section-wrap" id="skills">
          <div className="section-heading skills-heading" data-reveal="up"><div><p className="eyebrow section-eyebrow">TOOLS OF THE TRADE <span className="heading-line" /></p><h2>Three areas. <span>One toolkit.</span></h2></div><p className="section-description">Tools and experience across games, the web, and application security.</p></div>
          <div className="skills-grid">{skills.map((group, index) => <div className="skill-group" data-reveal="up" key={group.group}><span className="skill-index">0{index + 1}</span><h3>{group.group}</h3><div className="skill-values">{group.values.map((value) => <span key={value}>{value}</span>)}</div></div>)}</div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-panel" data-reveal="up"><div className="contact-mark"><Terminal size={19} /></div><p className="eyebrow">LET’S BUILD SOMETHING GOOD</p><h2>Have a project in mind?</h2><p className="contact-copy">I’m always glad to talk about thoughtful products, engineering challenges, and opportunities to work together.</p><div className="contact-links"><a className="button button-primary" href={githubUrl} target="_blank" rel="noreferrer"><Github size={17} /> Find me on GitHub <ArrowUpRight size={15} /></a>{linkedInUrl && <a className="button button-secondary" href={linkedInUrl} target="_blank" rel="noreferrer"><Linkedin size={17} /> Connect on LinkedIn <ArrowUpRight size={15} /></a>}</div></div>
        </section>
      </main>

      <footer className="site-footer section-wrap"><a className="wordmark" href="#top"><span className="wordmark-icon"><Terminal size={16} /></span><span>yuehan<span className="wordmark-dot">.</span></span></a><span>© {new Date().getFullYear()} John Mark Calimbo</span><a href="#top" className="back-to-top">Back to top ↑</a></footer>
    </div>
  );
}

export default App;
