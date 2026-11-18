import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';

const ambientParticles = [
  { x: '7%', y: '24%', dx: '34px', dy: '-46px', delay: '-1.4s', duration: '8s' },
  { x: '13%', y: '71%', dx: '-26px', dy: '-58px', delay: '-5.8s', duration: '10s' },
  { x: '19%', y: '43%', dx: '48px', dy: '34px', delay: '-3.1s', duration: '7s' },
  { x: '27%', y: '16%', dx: '-36px', dy: '62px', delay: '-6.6s', duration: '11s' },
  { x: '34%', y: '82%', dx: '25px', dy: '-51px', delay: '-2.2s', duration: '9s' },
  { x: '41%', y: '30%', dx: '-40px', dy: '-31px', delay: '-7.3s', duration: '12s' },
  { x: '57%', y: '14%', dx: '42px', dy: '51px', delay: '-4.4s', duration: '9s' },
  { x: '64%', y: '78%', dx: '-31px', dy: '-45px', delay: '-1.9s', duration: '8s' },
  { x: '71%', y: '39%', dx: '38px', dy: '47px', delay: '-6.1s', duration: '10s' },
  { x: '78%', y: '21%', dx: '-47px', dy: '38px', delay: '-3.7s', duration: '11s' },
  { x: '84%', y: '67%', dx: '29px', dy: '-62px', delay: '-8s', duration: '12s' },
  { x: '93%', y: '34%', dx: '-36px', dy: '48px', delay: '-2.8s', duration: '9s' },
  { x: '4%', y: '53%', dx: '51px', dy: '24px', delay: '-4.9s', duration: '10s' },
  { x: '96%', y: '85%', dx: '-42px', dy: '-30px', delay: '-7.1s', duration: '8s' },
];

function shouldPlayIntro() {
  if (typeof window === 'undefined') return false;
  if (document.body.classList.contains('page-transition-in')) return false;
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
  return true;
}

function LandingIntro() {
  const [phase, setPhase] = useState<'playing' | 'exiting' | 'done'>(() => shouldPlayIntro() ? 'playing' : 'done');
  const skipButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (phase === 'done') return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPhase('done');
      if (event.key === 'Tab') {
        event.preventDefault();
        skipButton.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    skipButton.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [phase === 'done']);

  useEffect(() => {
    if (phase === 'playing') {
      const timer = window.setTimeout(() => setPhase('exiting'), 2750);
      return () => window.clearTimeout(timer);
    }

    if (phase === 'exiting') {
      const timer = window.setTimeout(() => setPhase('done'), 1100);
      return () => window.clearTimeout(timer);
    }
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={`landing-intro${phase === 'exiting' ? ' is-exiting' : ''}`} role="dialog" aria-modal="true" aria-label="Portfolio introduction">
      <div className="intro-atmosphere" aria-hidden="true" />
      <div className="intro-aurora intro-aurora-one" aria-hidden="true" />
      <div className="intro-aurora intro-aurora-two" aria-hidden="true" />
      <div className="intro-motion-layer" aria-hidden="true">
        <span className="intro-backdrop-orbit intro-backdrop-orbit-one" />
        <span className="intro-backdrop-orbit intro-backdrop-orbit-two" />
        <span className="intro-backdrop-orbit intro-backdrop-orbit-three" />
        <span className="intro-scan-beam" />
        <span className="intro-light-streak intro-light-streak-one" />
        <span className="intro-light-streak intro-light-streak-two" />
        <span className="intro-light-streak intro-light-streak-three" />
        <span className="intro-edge-rail intro-edge-rail-left" />
        <span className="intro-edge-rail intro-edge-rail-right" />
        {ambientParticles.map((particle, index) => (
          <span
            className="intro-particle"
            key={index}
            style={{
              left: particle.x,
              top: particle.y,
              '--particle-dx': particle.dx,
              '--particle-dy': particle.dy,
              '--particle-delay': particle.delay,
              '--particle-duration': particle.duration,
            } as CSSProperties}
          />
        ))}
      </div>

      <header className="intro-header">
        <a className="intro-wordmark" href="#main" tabIndex={-1} aria-hidden="true"><span>y.</span> YUEHAN</a>
        <span className="intro-index">INDEPENDENT DEVELOPER <i /> PORTFOLIO {new Date().getFullYear()}</span>
      </header>

      <div className="intro-center">
        <div className="intro-emblem" aria-hidden="true">
          <span className="intro-orbit intro-orbit-one"><i /></span>
          <span className="intro-orbit intro-orbit-two"><i /></span>
          <span className="intro-orbit intro-orbit-three"><i /></span>
          <span className="intro-orbit-node intro-node-one" />
          <span className="intro-orbit-node intro-node-two" />
          <span className="intro-orbit-node intro-node-three" />
          <span className="intro-crosshair intro-crosshair-x" />
          <span className="intro-crosshair intro-crosshair-y" />
          <span className="intro-core-halo" />
          <span className="intro-core"><span>Y</span><i /></span>
        </div>

        <div className="intro-title-lockup">
          <p className="intro-kicker"><span /> A PORTFOLIO BY JOHN MARK CALIMBO <span /></p>
          <h1>YUEHAN<span>.</span></h1>
          <p className="intro-specialties">GAMES <i /> WEB <i /> SECURITY</p>
        </div>

        <div className="intro-progress" aria-hidden="true"><span /></div>
        <p className="intro-loading"><span>MAKING IDEAS REAL</span><span>WELCOME IN <ArrowUpRight size={12} /></span></p>
      </div>

      <footer className="intro-footer">
        <span>BUILT WITH CURIOSITY <b>·</b> BUILT TO SHIP</span>
        <button className="intro-skip" type="button" onClick={() => setPhase('done')} ref={skipButton}>Skip intro <ArrowUpRight size={13} /></button>
      </footer>
    </div>
  );
}

export default LandingIntro;
