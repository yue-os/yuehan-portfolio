import React, { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import SkullBackground from './components/SkullBackground';
import SidebarHUD from './components/SidebarHUD';
import ViewModeSelector from './components/ViewModeSelector';
import { ViewMode } from './types';

function App() {
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('arsenal');
  const [isGlitching, setIsGlitching] = useState(false);
  const pendingScrollTarget = useRef<string | null>(null);

  const handleModeChange = (mode: ViewMode, targetId?: string) => {
    if (targetId) pendingScrollTarget.current = targetId;
    
    if (mode === viewMode) {
      // If already in the right mode, just scroll
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setIsGlitching(true);
    setTimeout(() => {
      setViewMode(mode);
      setIsGlitching(false);
    }, 300);
  };

  // Handle scroll after mode change and glitch finish
  useEffect(() => {
    if (!isGlitching && pendingScrollTarget.current) {
      const targetId = pendingScrollTarget.current;
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        pendingScrollTarget.current = null;
      }, 50);
    }
  }, [isGlitching, viewMode]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (mouseGlowRef.current) {
        // Direct DOM update for high-performance movement
        mouseGlowRef.current.style.transform = `translate3d(${e.clientX - 300}px, ${e.clientY - 300}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sidebar HUD Interface */}
      <SidebarHUD />

      {/* Tier 3: Cyber-Space Infrastructure */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#010208]">
        <SkullBackground mode={viewMode} />
        <div className="cyber-grid" />
        <div className="horizon" />
        <div 
          ref={mouseGlowRef}
          className="mouse-glow w-[600px] h-[600px] rounded-full blur-[100px] will-change-transform" 
        />
        <div className="glitch-layer" />
        <div className="scan-beam" />
        <div className="scanline" />
      </div>

      {/* Desktop only custom cursor */}
      <div className="hidden lg:block">
        <CustomCursor />
      </div>

      <Navbar onModeChange={handleModeChange} />
      
      <main className={`relative z-10 ${isGlitching ? 'glitch-active' : ''}`}>
        <Hero />
        <Stats />
        <Services />
        {viewMode === 'logs' ? <Experience /> : <Projects />}
        <TechStack />
      </main>

      <ViewModeSelector currentMode={viewMode} onModeChange={handleModeChange} />

      <Footer />
    </div>
  );
}

export default App;