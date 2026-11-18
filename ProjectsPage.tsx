import { ArrowUpRight, Code2, Gamepad2, Github, Menu, Search, ShieldCheck, Terminal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { projects, type WorkCategory } from './projects';

const filters: ('All' | WorkCategory)[] = ['All', 'Games', 'Web', 'Security'];
const githubUrl = 'https://github.com/yue-os';

function categoryIcon(category: WorkCategory) {
  if (category === 'Games') return <Gamepad2 size={20} strokeWidth={1.6} />;
  if (category === 'Security') return <ShieldCheck size={20} strokeWidth={1.6} />;
  return <Code2 size={20} strokeWidth={1.6} />;
}

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('All');
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleProjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = activeFilter === 'All' || project.categoryKey === activeFilter;
      const searchable = [project.name, project.category, project.description, ...project.stack].join(' ').toLowerCase();
      return matchesCategory && (!query || searchable.includes(query));
    });
  }, [activeFilter, search]);

  return (
    <div className="portfolio projects-site">
      <a className="skip-link" href="#projects-main">Skip to projects</a>
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
            <a className="active-nav-link" href="/projects.html" aria-current="page" onClick={() => setMenuOpen(false)}>Projects</a>
            <a href="/walkthroughs.html" onClick={() => setMenuOpen(false)}>Walkthroughs</a>
            <a href="/about.html" onClick={() => setMenuOpen(false)}>About</a>
            <a href="/about.html#skills" onClick={() => setMenuOpen(false)}>Skills</a>
            <a className="nav-contact" href="/index.html#contact" onClick={() => setMenuOpen(false)}>Get in touch <ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main id="projects-main">
        <section className="projects-hero section-wrap">
          <div className="projects-hero-copy">
            <p className="eyebrow"><span className="status-dot" /> THE PROJECT ARCHIVE</p>
            <h1>Things I’ve <span>built.</span></h1>
            <p>A growing collection of games, web products, and security work. Browse everything in one place.</p>
            <a className="projects-github-link" href={githubUrl} target="_blank" rel="noreferrer"><Github size={15} /> More on GitHub <ArrowUpRight size={13} /></a>
          </div>
          <div className="projects-hero-count" aria-label={`${projects.length} projects in the archive`}>
            <span className="projects-count-value">{String(projects.length).padStart(2, '0')}</span>
            <span className="projects-count-label">PROJECTS<br />AND COUNTING</span>
            <span className="projects-count-rule" />
            <span className="projects-count-note">Updated as new work ships</span>
          </div>
        </section>

        <section className="projects-browser section-wrap" aria-label="Project archive">
          <div className="projects-browser-top">
            <div>
              <p className="eyebrow section-eyebrow">ALL PROJECTS <span className="heading-line" /></p>
              <h2>Explore the archive<span>.</span></h2>
            </div>
            <p className="projects-results" aria-live="polite">Showing <b>{visibleProjects.length}</b> of {projects.length}</p>
          </div>

          <div className="projects-toolbar">
            <div className="project-filters" role="group" aria-label="Filter projects by category">
              {filters.map((filter) => (
                <button className={activeFilter === filter ? 'project-filter is-active' : 'project-filter'} type="button" key={filter} aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)}>
                  {filter}
                  {filter === 'All' && <span>{projects.length}</span>}
                  {filter !== 'All' && <span>{projects.filter((project) => project.categoryKey === filter).length}</span>}
                </button>
              ))}
            </div>
            <div className="projects-search">
              <Search size={15} aria-hidden="true" />
              <label className="visually-hidden" htmlFor="project-search">Search projects and technologies</label>
              <input id="project-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects or tools" />
              {search && <button type="button" onClick={() => setSearch('')} aria-label="Clear search"><X size={14} /></button>}
            </div>
          </div>

          {visibleProjects.length > 0 ? (
            <div className="projects-archive-grid">
              {visibleProjects.map((project) => (
                <article className={`archive-card accent-${project.accent}`} key={project.id}>
                  <div className="archive-artwork">
                    {project.image ? <img src={project.image} alt="" loading="lazy" /> : <div className="archive-artwork-mark" aria-hidden="true">{categoryIcon(project.categoryKey)}</div>}
                    <span className="archive-project-number">{project.number}</span>
                    <span className="archive-artwork-caption">{project.categoryKey.toUpperCase()}</span>
                  </div>
                  <div className="archive-card-copy">
                    <p className="archive-card-category">{project.category}</p>
                    <h3>{project.name}</h3>
                    <p className="archive-card-description">{project.description}</p>
                    {project.role && <div className="archive-role"><span>MY ROLE</span><b>{project.role}</b></div>}
                    <div className="tag-list archive-tags">{project.stack.map((item) => <span className="tech-tag" key={item}>{item}</span>)}</div>
                    {project.details && <details className="case-notes archive-notes"><summary>Case notes <span aria-hidden="true">＋</span></summary><p>{project.details}</p></details>}
                    {project.repositories.length > 0 && (
                      <div className="archive-repositories" aria-label={`${project.name} source repositories`}>
                        {project.repositories.map((repository) => <a className="repo-link" href={repository.url} key={repository.url} target="_blank" rel="noreferrer"><Github size={13} /> {repository.label} <ArrowUpRight size={12} /></a>)}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="projects-empty"><Search size={19} /><h3>No matching projects</h3><p>Try another name, technology, or category.</p><button type="button" className="button button-secondary" onClick={() => { setSearch(''); setActiveFilter('All'); }}>Clear filters</button></div>
          )}
        </section>

        <section className="projects-footer-cta section-wrap">
          <div><p className="eyebrow">HAVE SOMETHING IN MIND?</p><h2>Let’s make the next one.</h2></div>
          <a className="button button-primary" href="/index.html#contact">Get in touch <ArrowUpRight size={15} /></a>
        </section>
      </main>

      <footer className="site-footer section-wrap"><a className="wordmark" href="/index.html#top"><span className="wordmark-icon"><Terminal size={16} /></span><span>yuehan<span className="wordmark-dot">.</span></span></a><span>© {new Date().getFullYear()} John Mark Calimbo</span><a href="#projects-main" className="back-to-top">Back to top ↑</a></footer>
    </div>
  );
}

export default ProjectsPage;
