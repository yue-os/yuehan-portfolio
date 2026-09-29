import { ArrowDown, ArrowLeft, ArrowUpRight, Check, Download, Github, Menu, Search, Terminal, X } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

type Challenge = {
  slug: string;
  filename: string;
  title: string;
  image: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
};

const challenges: Challenge[] = [
  { slug: 'anonforce', filename: 'Anonforce.md', title: 'Anonforce', image: 'Anonforce.jpeg', category: 'Boot2Root · Linux', difficulty: 'Easy' },
  { slug: 'biohazard', filename: 'Biohazard.md', title: 'Biohazard', image: 'Biohazard.png', category: 'Web · Recon', difficulty: 'Medium' },
  { slug: 'develpy', filename: 'Develpy.md', title: 'Develpy', image: 'Develpy.png', category: 'Scripting · PrivEsc', difficulty: 'Medium' },
  { slug: 'plant-photographer', filename: 'PlantPhotographer.md', title: 'Plant Photographer', image: 'plant.png', category: 'Boot2Root · Web', difficulty: 'Hard' },
  { slug: 'rabbit-store', filename: 'RabbitStore.md', title: 'Rabbit Store', image: 'RabbitStore.png', category: 'Web · SSRF · SSTI', difficulty: 'Medium' },
  { slug: 'smol', filename: 'Smol.md', title: 'Smol', image: 'Smol.png', category: 'WordPress · PrivEsc', difficulty: 'Medium' },
  { slug: 'thompson', filename: 'Thompson.md', title: 'Thompson', image: 'Thompson.png', category: 'Boot2Root · Web', difficulty: 'Easy' },
  { slug: 'wonderland', filename: 'Wonderland.md', title: 'Wonderland', image: 'Wonderland.jpeg', category: 'Boot2Root · PrivEsc', difficulty: 'Medium' },
  { slug: 'year-of-the-rabbit', filename: 'YearOfTheRabbit.md', title: 'Year of the Rabbit', image: 'YearOfTheRabbit.jpeg', category: 'Steganography · PrivEsc', difficulty: 'Easy' },
];

const githubWalkthroughs = 'https://github.com/yue-os/Walkthroughs';

function localMarkdownUrl(path: string) {
  return `/walkthroughs/${path.replace(/^(\.\/)+/, '')}`;
}

function isSafeLink(url: string) {
  return /^(https?:|mailto:|#|\/(?!\/)|\.\/)/i.test(url.trim());
}

function renderInline(value: string, keyPrefix: string): ReactNode[] {
  const tokenPattern = /!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*(.+?)\*\*|__(.+?)__|~~(.+?)~~|\*(.+?)\*/g;
  const result: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;
  let part = 0;

  while ((match = tokenPattern.exec(value)) !== null) {
    if (match.index > cursor) result.push(value.slice(cursor, match.index));
    const key = `${keyPrefix}-${part++}`;

    if (match[1] !== undefined) {
      const src = isSafeLink(match[2]) ? (match[2].startsWith('./') ? localMarkdownUrl(match[2]) : match[2]) : '#';
      result.push(<img className="md-inline-image" key={key} src={src} alt={match[1]} loading="lazy" />);
    } else if (match[3] !== undefined) {
      const href = isSafeLink(match[4]) ? (match[4].startsWith('./') ? localMarkdownUrl(match[4]) : match[4]) : '#';
      const external = /^https?:/i.test(href);
      result.push(<a href={href} key={key} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{renderInline(match[3], key)}</a>);
    } else if (match[5] !== undefined) result.push(<code key={key}>{match[5]}</code>);
    else if (match[6] !== undefined || match[7] !== undefined) result.push(<strong key={key}>{renderInline(match[6] ?? match[7] ?? '', key)}</strong>);
    else if (match[8] !== undefined) result.push(<del key={key}>{renderInline(match[8], key)}</del>);
    else if (match[9] !== undefined) result.push(<em key={key}>{renderInline(match[9], key)}</em>);

    cursor = tokenPattern.lastIndex;
  }

  if (cursor < value.length) result.push(value.slice(cursor));
  return result;
}

function parseCells(line: string) {
  return line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
}

function isTableSeparator(line: string) {
  return line.includes('|') && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function isBlockStart(lines: string[], index: number) {
  const line = lines[index] ?? '';
  return /^\s{0,3}(?:#{1,6}\s|>|```|~~~|(?:[-*_]\s*){3,}|(?:[-*+]\s+)|(?:\d+[.)]\s+))/.test(line)
    || (line.includes('|') && isTableSeparator(lines[index + 1] ?? ''));
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="md-code-wrap">
      <div className="md-code-top"><span>{language || 'terminal'}</span><button type="button" onClick={copyCode} aria-label="Copy code block">{copied ? <><Check size={13} /> Copied</> : 'Copy'}</button></div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

function MarkdownDocument({ markdown }: { markdown: string }) {
  const blocks: ReactNode[] = [];
  const lines = markdown.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split('\n');
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim() || /^\s*<!--/.test(line)) { index += 1; continue; }

    const fence = line.match(/^\s*(```+|~~~+)(.*)$/);
    if (fence) {
      const fenceToken = fence[1][0];
      const language = fence[2].trim().split(/\s+/)[0] ?? '';
      index += 1;
      const code: string[] = [];
      while (index < lines.length && !new RegExp(`^\\s*${fenceToken}{3,}`).test(lines[index])) code.push(lines[index++]);
      if (index < lines.length) index += 1;
      blocks.push(<CodeBlock code={code.join('\n')} language={language} key={`code-${index}`} />);
      continue;
    }

    const heading = line.match(/^\s{0,3}(#{1,6})\s+(.*?)(?:\s+#+)?\s*$/);
    if (heading) {
      const Heading = `h${heading[1].length}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      blocks.push(<Heading key={`heading-${index}`}>{renderInline(heading[2], `heading-${index}`)}</Heading>);
      index += 1;
      continue;
    }

    if (/^\s*(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push(<hr key={`rule-${index}`} />);
      index += 1;
      continue;
    }

    if (/^\s*>/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^\s*>/.test(lines[index])) quote.push(lines[index++].replace(/^\s*>\s?/, ''));
      blocks.push(<blockquote key={`quote-${index}`}>{quote.map((item, itemIndex) => <p key={itemIndex}>{renderInline(item, `quote-${index}-${itemIndex}`)}</p>)}</blockquote>);
      continue;
    }

    if (line.includes('|') && isTableSeparator(lines[index + 1] ?? '')) {
      const head = parseCells(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].includes('|') && lines[index].trim()) rows.push(parseCells(lines[index++]));
      blocks.push(<div className="md-table-wrap" key={`table-${index}`}><table><thead><tr>{head.map((cell, cellIndex) => <th key={cellIndex}>{renderInline(cell, `th-${index}-${cellIndex}`)}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{renderInline(cell, `td-${index}-${rowIndex}-${cellIndex}`)}</td>)}</tr>)}</tbody></table></div>);
      continue;
    }

    const listMatch = line.match(/^\s{0,8}([-*+]|\d+[.)])\s+(.*)$/);
    if (listMatch) {
      const ordered = /^\d/.test(listMatch[1]);
      const items: string[] = [];
      while (index < lines.length) {
        const itemMatch = lines[index].match(/^\s{0,8}([-*+]|\d+[.)])\s+(.*)$/);
        if (!itemMatch || /^\d/.test(itemMatch[1]) !== ordered) break;
        items.push(itemMatch[2]);
        index += 1;
      }
      const List = ordered ? 'ol' : 'ul';
      blocks.push(<List key={`list-${index}`}>{items.map((item, itemIndex) => <li key={itemIndex}>{renderInline(item, `list-${index}-${itemIndex}`)}</li>)}</List>);
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() && !isBlockStart(lines, index)) paragraph.push(lines[index++]);
    blocks.push(<p key={`paragraph-${index}`}>{paragraph.map((part, partIndex) => <span key={partIndex}>{partIndex > 0 && <br />}{renderInline(part, `paragraph-${index}-${partIndex}`)}</span>)}</p>);
  }

  return <div className="md-content">{blocks}</div>;
}

function usePageReveal(activeSlug: string) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.walkthrough-site [data-reveal]');
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
    }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [activeSlug]);
}

function WalkthroughsPage() {
  const initialSlug = new URLSearchParams(window.location.search).get('challenge');
  const [activeSlug, setActiveSlug] = useState(challenges.some((challenge) => challenge.slug === initialSlug) ? initialSlug! : challenges[0].slug);
  const [search, setSearch] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeChallenge = challenges.find((challenge) => challenge.slug === activeSlug) ?? challenges[0];
  const filteredChallenges = useMemo(() => {
    const needle = search.trim().toLocaleLowerCase();
    return challenges.filter((challenge) => `${challenge.title} ${challenge.category} ${challenge.difficulty}`.toLocaleLowerCase().includes(needle));
  }, [search]);

  usePageReveal(activeSlug);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setLoadFailed(false);
    setMarkdown('');
    fetch(localMarkdownUrl(activeChallenge.filename), { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Could not load this walkthrough.');
        return response.text();
      })
      .then((text) => setMarkdown(text))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setLoadFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [activeChallenge.filename]);

  useEffect(() => {
    document.title = `${activeChallenge.title} Walkthrough — John Mark Calimbo`;
  }, [activeChallenge.title]);

  const selectChallenge = (slug: string) => {
    setActiveSlug(slug);
    const url = new URL(window.location.href);
    url.searchParams.set('challenge', slug);
    window.history.replaceState({}, '', url);
    setMenuOpen(false);
  };

  return (
    <div className="portfolio walkthrough-site">
      <a className="skip-link" href="#walkthrough-content">Skip to walkthrough</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="wordmark" href="/index.html#top" aria-label="John Mark Calimbo, home"><span className="wordmark-icon"><Terminal size={17} strokeWidth={2.2} /></span><span>yuehan<span className="wordmark-dot">.</span></span></a>
          <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
            <a href="/index.html#work" onClick={() => setMenuOpen(false)}>Projects</a>
            <a className="active-nav-link" href="/walkthroughs.html" aria-current="page" onClick={() => setMenuOpen(false)}>Walkthroughs</a>
            <a href="/index.html#about" onClick={() => setMenuOpen(false)}>About</a>
            <a className="nav-contact" href="https://www.linkedin.com/in/john-mark-c-51630a300/" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>LinkedIn <ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="walkthrough-hero section-wrap" data-reveal="up">
          <div className="walkthrough-hero-copy">
            <p className="eyebrow"><span className="status-dot" /> SECURITY LAB NOTES <span className="eyebrow-divider">/</span> CTF WALKTHROUGHS</p>
            <h1>Read the room.<br /><span>Trace the foothold.</span></h1>
            <p>Field notes from hands-on security challenges: the clues, commands, wrong turns, and privilege escalation paths behind each solve.</p>
            <div className="walkthrough-hero-actions"><a className="button button-primary" href="#challenge-browser">Browse all 9 writeups <ArrowDown size={16} /></a><a className="button button-secondary" href={githubWalkthroughs} target="_blank" rel="noreferrer"><Github size={16} /> GitHub source <ArrowUpRight size={15} /></a></div>
          </div>
          <div className="walkthrough-terminal" aria-hidden="true">
            <div className="identity-card-top"><span><span className="window-dot window-red" /><span className="window-dot window-yellow" /><span className="window-dot window-green" /></span><span className="identity-label">lab-notes.log</span><Terminal size={15} /></div>
            <div className="walkthrough-terminal-body"><span className="code-muted">$</span> enumerate --services<br /><span className="code-green">[+]</span> map the attack surface<br /><span className="code-muted">$</span> trace --foothold<br /><span className="code-green">[+]</span> verify every assumption<br /><span className="code-muted">$</span> document --lessons<span className="code-cursor">_</span></div>
            <div className="walkthrough-terminal-footer"><span>9 CHALLENGES</span><span>FIELD NOTES v1.0</span></div>
          </div>
        </section>

        <section className="walkthrough-browser section-wrap" id="challenge-browser">
          <aside className="walkthrough-index" data-reveal="left" aria-label="Walkthrough library">
            <div className="walkthrough-index-heading"><div><p className="eyebrow section-eyebrow">THE LIBRARY <span className="heading-line" /></p><h2>Choose a challenge<span>.</span></h2></div><span className="index-count">{filteredChallenges.length.toString().padStart(2, '0')} / 09</span></div>
            <label className="walkthrough-search"><Search size={15} /><span className="visually-hidden">Filter walkthroughs</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Filter by name or topic" /></label>
            <div className="walkthrough-list">
              {filteredChallenges.map((challenge, index) => (
                <button className={`walkthrough-list-item${activeSlug === challenge.slug ? ' is-active' : ''}`} key={challenge.slug} type="button" aria-pressed={activeSlug === challenge.slug} onClick={() => selectChallenge(challenge.slug)}>
                  <span className="walkthrough-list-mark" aria-hidden="true"><Terminal size={14} /></span>
                  <span className="walkthrough-list-copy"><span className="walkthrough-list-title">{challenge.title}</span><span className="walkthrough-list-category">{challenge.category}</span></span>
                  <span className={`difficulty-dot difficulty-${challenge.difficulty.toLowerCase()}`} aria-label={`${challenge.difficulty} difficulty`} />
                  <span className="walkthrough-list-number">{String(challenges.indexOf(challenge) + 1).padStart(2, '0')}</span>
                </button>
              ))}
              {filteredChallenges.length === 0 && <p className="walkthrough-empty">No matches. Try a different topic.</p>}
            </div>
            <a className="walkthrough-repo-link" href={githubWalkthroughs} target="_blank" rel="noreferrer"><Github size={14} /> View the source repository <ArrowUpRight size={13} /></a>
          </aside>

          <article className="walkthrough-article" id="walkthrough-content" key={activeChallenge.slug} data-reveal="right">
            <div className="walkthrough-article-head">
              <div className="walkthrough-article-cover"><img src={localMarkdownUrl(`thumbnails/${activeChallenge.image}`)} alt={`${activeChallenge.title} challenge thumbnail`} fetchPriority="high" /></div>
              <div className="walkthrough-article-info">
                <div className="article-kicker"><span className="project-number">{String(challenges.indexOf(activeChallenge) + 1).padStart(2, '0')}</span><span className="meta-divider" /> TRYHACKME WALKTHROUGH</div>
                <h2>{activeChallenge.title}</h2>
                <p>{activeChallenge.category}</p>
                <span className={`difficulty-pill difficulty-${activeChallenge.difficulty.toLowerCase()}`}><span className="difficulty-dot" /> {activeChallenge.difficulty} difficulty</span>
                <div className="walkthrough-article-actions"><a className="article-action" href={localMarkdownUrl(activeChallenge.filename)} download={activeChallenge.filename}><Download size={14} /> Download .md</a><a className="article-action" href={githubWalkthroughs} target="_blank" rel="noreferrer"><Github size={14} /> Source repo <ArrowUpRight size={12} /></a></div>
              </div>
            </div>
            <div className="walkthrough-article-body">
              {loading && <div className="walkthrough-loading"><span className="status-dot" /> Loading field notes<span className="loading-ellipsis">...</span></div>}
              {loadFailed && <div className="walkthrough-error"><p>The local Markdown file could not be opened.</p><a className="repo-link" href={githubWalkthroughs} target="_blank" rel="noreferrer">Open the walkthrough repository <ArrowUpRight size={13} /></a></div>}
              {!loading && !loadFailed && <MarkdownDocument markdown={markdown} />}
              {!loading && !loadFailed && <p className="walkthrough-article-end"><span className="status-dot" /> END OF WALKTHROUGH <a href="#challenge-browser"><ArrowLeft size={13} /> Back to challenge index</a></p>}
            </div>
          </article>
        </section>
      </main>

      <footer className="site-footer section-wrap"><a className="wordmark" href="/index.html#top"><span className="wordmark-icon"><Terminal size={16} /></span><span>yuehan<span className="wordmark-dot">.</span></span></a><span>© {new Date().getFullYear()} John Mark Calimbo</span><a href={githubWalkthroughs} className="back-to-top" target="_blank" rel="noreferrer">Walkthrough source ↗</a></footer>
    </div>
  );
}

export default WalkthroughsPage;
