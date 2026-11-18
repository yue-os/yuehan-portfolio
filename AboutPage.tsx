import { ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness, ChevronLeft, ChevronRight, Code2, Github, GraduationCap, Linkedin, Mail, Menu, Play, ShieldCheck, Terminal, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import profilePhoto from './assets/profile_2.jpg';
import demoReel from './assets/DemoReel.mp4';
import { ojtPhotos, ojtWeeks } from './ojtJourney';

const githubUrl = 'https://github.com/yue-os';
const linkedInUrl = 'https://www.linkedin.com/in/john-mark-c-51630a300/';
const email = 'johnmarkcalimbo90@gmail.com';

const experience = [
  {
    title: 'Independent Full-Stack Developer',
    organization: 'Self-employed · Global key system',
    description: 'Designed a Node.js and Express licensing service backed by PostgreSQL, with APIs for license validation and account management. Built Discord bot workflows to support key management and user interactions.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'Discord bots'],
  },
  {
    title: 'Full-Stack Developer',
    organization: 'Pamantasan ng Lungsod ng Valenzuela · NROTC Dashboard',
    description: 'Developed role-based portal systems with separate dashboards for cadets, instructors, and officers.',
    technologies: ['Web development', 'Role-based access'],
  },
  {
    title: 'Backend Developer',
    organization: 'Pamantasan ng Lungsod ng Valenzuela · CEIT CMS',
    description: 'Built a FastAPI and Supabase backend for a multi-admin content platform, including REST endpoints for the IT, EE, and CE departments. Coordinated code integration with a frontend partner through Git branches and pull requests.',
    technologies: ['Python', 'FastAPI', 'Supabase', 'REST APIs', 'Git'],
  },
  {
    title: 'Full-Stack Developer',
    organization: 'Pamantasan ng Lungsod ng Valenzuela · Malliraya',
    description: 'Developed a survey system with an ASP.NET backend and PostgreSQL database. Added SignalR for live dashboard updates and middleware for error handling and secure proxy headers.',
    technologies: ['C#', 'ASP.NET', 'PostgreSQL', 'SignalR'],
  },
  {
    title: 'Game & Systems Developer',
    organization: 'Independent and academic projects',
    description: 'Developed BatangAware, a Godot social-deduction game that teaches health-prevention practices to students at Malinta National High School. Currently building Cosmic Companions, a Roblox pet simulator using typed Luau and parallel gameplay systems.',
    technologies: ['Godot', 'Roblox Studio', 'Luau', 'Game systems'],
  },
];

const skillGroups = [
  { name: 'Backend & APIs', icon: <Code2 size={16} />, values: ['Node.js', 'Python', 'FastAPI', 'C#', 'ASP.NET Core', 'REST APIs'] },
  { name: 'Frontend & UI', icon: <BookOpen size={16} />, values: ['React', 'TypeScript', 'HTML', 'CSS', 'Bootstrap', 'Obsidian UI'] },
  { name: 'Data & Storage', icon: <BriefcaseBusiness size={16} />, values: ['PostgreSQL', 'Supabase', 'SQL'] },
  { name: 'Languages', icon: <Code2 size={16} />, values: ['JavaScript', 'TypeScript', 'Python', 'C#', 'Luau', 'Lua', 'GDScript'] },
  { name: 'Security', icon: <ShieldCheck size={16} />, values: ['Network security', 'Web security testing', 'Wireless testing', 'OSINT', 'Reverse engineering'] },
  { name: 'Game & Systems', icon: <Terminal size={16} />, values: ['Godot', 'Unity', 'Roblox Studio', 'Memory management', 'Event-driven systems'] },
];

function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [isReelPlaying, setIsReelPlaying] = useState(false);
  const reelVideoRef = useRef<HTMLVideoElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const closePhotoButtonRef = useRef<HTMLButtonElement>(null);
  const closeMenu = () => setMenuOpen(false);
  const photosByWeek = ojtWeeks.map((week) => ({
    ...week,
    photos: ojtPhotos.filter((photo) => photo.weekNumber === week.number),
  }));
  const activePhoto = photoIndex === null ? null : ojtPhotos[photoIndex];
  const isViewerOpen = photoIndex !== null;

  useEffect(() => {
    if (!isViewerOpen) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closePhotoButtonRef.current?.focus();

    const handleViewerKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPhotoIndex(null);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setPhotoIndex((current) => current === null ? current : (current + 1) % ojtPhotos.length);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setPhotoIndex((current) => current === null ? current : (current - 1 + ojtPhotos.length) % ojtPhotos.length);
      } else if (event.key === 'Tab') {
        const controls = viewerRef.current?.querySelectorAll<HTMLElement>('button:not(:disabled)');
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleViewerKeys);
    return () => {
      window.removeEventListener('keydown', handleViewerKeys);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isViewerOpen]);

  const movePhoto = (direction: number) => {
    setPhotoIndex((current) => current === null ? current : (current + direction + ojtPhotos.length) % ojtPhotos.length);
  };

  return (
    <div className="portfolio about-site">
      <a className="skip-link" href="#about-main">Skip to about</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="/index.html#top" aria-label="Yuehan Calimbo, home">
            <span className="wordmark-icon"><Terminal size={17} strokeWidth={2.2} /></span>
            <span>yuehan<span className="wordmark-dot">.</span></span>
          </a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
            <a href="/projects.html" onClick={closeMenu}>Projects</a>
            <a href="/walkthroughs.html" onClick={closeMenu}>Walkthroughs</a>
            <a className="active-nav-link" href="/about.html" aria-current="page" onClick={closeMenu}>About</a>
            <a href="#ojt-journey" onClick={closeMenu}>OJT journey</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a className="nav-contact" href={`mailto:${email}`} onClick={closeMenu}>Get in touch <ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main id="about-main">
        <section className="about-hero section-wrap">
          <div className="about-hero-copy">
            <p className="eyebrow"><span className="status-dot" /> ABOUT ME <span className="eyebrow-divider">/</span> FULL-STACK DEVELOPER</p>
            <h1>I build systems with <span>purpose.</span></h1>
            <p>I’m John Mark Calimbo, a fourth-year Information Technology student at Pamantasan ng Lungsod ng Valenzuela, expected to graduate in 2027. I enjoy building useful web products, backend systems, and games, with a growing focus on security.</p>
            <div className="about-hero-actions">
              <a className="button button-primary" href="#experience">Explore my experience <ArrowRight size={16} /></a>
              <a className="button button-secondary" href="#demo-reel"><Play size={14} /> Watch the demo reel</a>
              <a className="button button-secondary" href={`mailto:${email}`}><Mail size={15} /> Email me</a>
            </div>
          </div>
          <aside className="about-profile-card" aria-label="Profile summary">
            <div className="about-profile-top"><span className="window-dot window-red" /><span className="window-dot window-yellow" /><span className="window-dot window-green" /><span>about.ts</span></div>
            <div className="about-profile-main">
              <img className="profile-photo" src={profilePhoto} alt="John Mark Calimbo" />
              <h2>John Mark Calimbo</h2>
              <p>Full-stack developer · IT student</p>
            </div>
            <div className="about-profile-facts">
              <div><span>EDUCATION</span><b>BS Information Technology</b></div>
              <div><span>EXPECTED GRADUATION</span><b>2027</b></div>
              <div><span>MEMBERSHIP</span><b>ISC2 Candidate</b></div>
            </div>
          </aside>
        </section>

        <section className="about-reel-section" id="demo-reel" aria-labelledby="about-reel-title">
          <div className="section-wrap about-reel-wrap">
            <div className="about-reel-heading">
              <div>
                <p className="eyebrow section-eyebrow">SELECTED WORK <span className="heading-line" /></p>
                <h2 id="about-reel-title">A glimpse into <span>what I build.</span></h2>
              </div>
              <p>A short reel of the ideas, interfaces, and systems I love bringing to life.</p>
            </div>
            <div className="about-reel-frame">
              <div className="about-reel-frame-top">
                <div className="about-reel-window-dots" aria-hidden="true"><i /><i /><i /></div>
                <span>JOHN MARK CALIMBO <i>/</i> DEMO REEL</span>
                <span className="about-reel-frame-status"><i /> FEATURED REEL</span>
              </div>
              <div className="about-reel-stage">
                <video
                  ref={reelVideoRef}
                  className="about-reel-video"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label="Demo reel by John Mark Calimbo"
                  onPlay={() => setIsReelPlaying(true)}
                  onPause={() => setIsReelPlaying(false)}
                  onEnded={() => setIsReelPlaying(false)}
                >
                  <source src={demoReel} type="video/mp4" />
                  Your browser does not support MP4 video. You can <a href={demoReel}>download the demo reel</a> instead.
                </video>
                {!isReelPlaying && (
                  <button
                    className="about-reel-play"
                    type="button"
                    aria-label="Play demo reel"
                    onClick={() => { void reelVideoRef.current?.play().catch(() => setIsReelPlaying(false)); }}
                  >
                    <span className="about-reel-play-icon"><Play size={22} fill="currentColor" /></span>
                    <span>PLAY THE REEL <i>FULL REEL · PRESS PLAY</i></span>
                  </button>
                )}
                <span className="about-reel-stage-index" aria-hidden="true">JM—01</span>
              </div>
              <div className="about-reel-caption">
                <div><span>BUILT WITH CURIOSITY</span><b>From solid foundations to polished experiences.</b></div>
                <a href="#experience">Explore the work <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="about-intro-band">
          <div className="section-wrap about-intro-grid">
            <p className="eyebrow section-eyebrow">HOW I WORK <span className="heading-line" /></p>
            <div>
              <h2>Curious about what happens <span>under the hood.</span></h2>
              <p>My interests span system architecture, databases, application development, and cybersecurity. I like understanding how a product works end to end, then making it reliable, clear to use, and easier to maintain.</p>
              <p>My academic work has included a Best in Research award, and I continue to build practical experience through software projects and security learning.</p>
            </div>
          </div>
        </section>

        <section className="about-experience section-wrap" id="experience">
          <div className="about-section-heading">
            <div><p className="eyebrow section-eyebrow">EXPERIENCE <span className="heading-line" /></p><h2>Building across <span>different systems.</span></h2></div>
            <p>Professional, university, and independent work in web development, backend systems, and games.</p>
          </div>
          <div className="about-timeline">
            {experience.map((item, index) => (
              <article className="about-timeline-item" key={item.title + item.organization}>
                <div className="about-timeline-index"><span>0{index + 1}</span><i /></div>
                <div className="about-timeline-content">
                  <p className="about-timeline-org">{item.organization}</p>
                  <h3>{item.title}</h3>
                  <p className="about-timeline-description">{item.description}</p>
                  <div className="tag-list">{item.technologies.map((technology) => <span className="tech-tag" key={technology}>{technology}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ojt-journey-section" id="ojt-journey">
          <div className="section-wrap ojt-journey-wrap">
            <div className="about-section-heading ojt-section-heading">
              <div><p className="eyebrow section-eyebrow">ON-THE-JOB TRAINING <span className="heading-line" /></p><h2>Learning through <span>hands-on work.</span></h2></div>
              <p>My OJT with the Information Technology Office at Pamantasan ng Lungsod ng Valenzuela, captured across the seven weeks documented in my progress report.</p>
            </div>
            <div className="ojt-overview" aria-label="OJT journey summary">
              <div><span>PLACEMENT</span><b>PLV Information Technology Office</b></div>
              <div><span>DOCUMENTED PERIOD</span><b>June–July 2026</b></div>
              <div><span>PROGRESS REPORT</span><b>{ojtWeeks.length} weeks <i>·</i> {ojtPhotos.length} photos</b></div>
            </div>
            <div className="ojt-week-list">
              {photosByWeek.map((week) => (
                <article className="ojt-week" key={week.number}>
                  <div className="ojt-week-marker"><span>{String(week.number).padStart(2, '0')}</span><i /></div>
                  <div className="ojt-week-content">
                    <div className="ojt-week-heading">
                      <div><p className="ojt-week-dates">{week.dates}</p><h3>{week.title}</h3></div>
                      <span className="ojt-photo-count">{String(week.photos.length).padStart(2, '0')} PHOTOS</span>
                    </div>
                    <p className="ojt-week-summary">{week.summary}</p>
                    <div className="tag-list ojt-focus-tags">{week.focus.map((item) => <span className="tech-tag" key={item}>{item}</span>)}</div>
                    <div className="ojt-photo-grid" role="group" aria-label={`Week ${week.number} photos`}>
                      {week.photos.map((photo) => (
                        <button className="ojt-photo-thumb" type="button" key={photo.src} aria-label={`Open week ${week.number}, photo ${photo.photoNumber}: ${week.title}`} onClick={() => setPhotoIndex(ojtPhotos.indexOf(photo))}>
                          <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                          <span><span>0{photo.photoNumber}</span><ArrowUpRight size={14} /></span>
                        </button>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="ojt-report-note"><span className="status-dot" /> Photo record and activity summaries compiled from the submitted weekly progress report.</p>
          </div>
        </section>

        <section className="about-education-band">
          <div className="section-wrap about-education" id="education">
            <div className="about-section-heading">
              <div><p className="eyebrow section-eyebrow">EDUCATION <span className="heading-line" /></p><h2>Learning by <span>building.</span></h2></div>
              <p>Studying information technology while applying it to projects in software, games, and security.</p>
            </div>
            <div className="education-grid">
              <article className="education-card">
                <div className="education-icon"><GraduationCap size={19} /></div>
                <p className="education-period">EXPECTED 2027</p>
                <h3>Bachelor of Science in Information Technology</h3>
                <p className="education-school">Pamantasan ng Lungsod ng Valenzuela · Valenzuela City</p>
                <div className="education-coursework"><span>RELEVANT COURSEWORK</span><p>System integration and architecture, backend development, cybersecurity, network security, and game development.</p></div>
              </article>
              <article className="education-card education-card-secondary">
                <div className="education-icon"><BookOpen size={18} /></div>
                <p className="education-period">GRADUATED 2023</p>
                <h3>High School Diploma · General Academic Strand</h3>
                <p className="education-school">Parada National High School</p>
                <div className="education-coursework"><span>ACADEMIC HONOR</span><p>Best in Research Award</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="about-skills section-wrap" id="skills">
          <div className="about-section-heading">
            <div><p className="eyebrow section-eyebrow">TOOLS &amp; TECHNOLOGIES <span className="heading-line" /></p><h2>One toolkit, <span>many layers.</span></h2></div>
            <p>Technologies and practices drawn from my coursework, projects, and development experience.</p>
          </div>
          <div className="about-skill-grid">
            {skillGroups.map((group, index) => (
              <article className="about-skill-card" key={group.name}>
                <div className="about-skill-card-top"><span>0{index + 1}</span>{group.icon}</div>
                <h3>{group.name}</h3>
                <div className="skill-values">{group.values.map((value) => <span key={value}>{value}</span>)}</div>
              </article>
            ))}
          </div>
          <div className="about-membership"><ShieldCheck size={19} /><div><span>PROFESSIONAL ACTIVITY</span><b>ISC2 Candidate Member</b><p>Engaged in ongoing learning around cybersecurity, network security, and secure coding practices.</p></div><ArrowUpRight size={15} /></div>
        </section>

        <section className="about-contact section-wrap" id="contact">
          <div className="contact-panel">
            <div className="contact-mark"><Terminal size={19} /></div>
            <p className="eyebrow">LET’S CONNECT</p>
            <h2>Have a good challenge in mind?</h2>
            <p className="contact-copy">I’m open to conversations about thoughtful products, engineering, and opportunities to learn and contribute.</p>
            <div className="contact-links">
              <a className="button button-primary" href={`mailto:${email}`}><Mail size={16} /> {email} <ArrowUpRight size={15} /></a>
              <a className="button button-secondary" href={githubUrl} target="_blank" rel="noreferrer"><Github size={16} /> GitHub <ArrowUpRight size={15} /></a>
              <a className="button button-secondary" href={linkedInUrl} target="_blank" rel="noreferrer"><Linkedin size={16} /> LinkedIn <ArrowUpRight size={15} /></a>
            </div>
          </div>
        </section>
        {activePhoto && photoIndex !== null && (
          <div className="ojt-lightbox" role="dialog" aria-modal="true" aria-label="OJT photo viewer" onClick={(event) => { if (event.target === event.currentTarget) setPhotoIndex(null); }}>
            <div className="ojt-lightbox-panel" ref={viewerRef}>
              <div className="ojt-lightbox-topline">
                <div><span>OJT JOURNEY</span><b>Week {String(activePhoto.weekNumber).padStart(2, '0')} <i>·</i> {activePhoto.weekTitle}</b></div>
                <button className="ojt-lightbox-close" type="button" ref={closePhotoButtonRef} aria-label="Close photo viewer" onClick={() => setPhotoIndex(null)}><X size={19} /></button>
              </div>
              <div className="ojt-lightbox-image-wrap">
                <button className="ojt-lightbox-control ojt-lightbox-prev" type="button" aria-label="Previous photo" onClick={() => movePhoto(-1)}><ChevronLeft size={22} /></button>
                <img src={activePhoto.src} alt={activePhoto.alt} />
                <button className="ojt-lightbox-control ojt-lightbox-next" type="button" aria-label="Next photo" onClick={() => movePhoto(1)}><ChevronRight size={22} /></button>
              </div>
              <div className="ojt-lightbox-caption"><span>{activePhoto.alt}</span><b>{String(photoIndex + 1).padStart(2, '0')} <i>/</i> {String(ojtPhotos.length).padStart(2, '0')}</b></div>
            </div>
          </div>
        )}
      </main>

      <footer className="site-footer section-wrap"><a className="wordmark" href="/index.html#top"><span className="wordmark-icon"><Terminal size={16} /></span><span>yuehan<span className="wordmark-dot">.</span></span></a><span>© {new Date().getFullYear()} John Mark Calimbo</span><a href="#about-main" className="back-to-top">Back to top ↑</a></footer>
    </div>
  );
}

export default AboutPage;
