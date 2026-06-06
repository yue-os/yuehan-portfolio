import React, { useState, useEffect } from 'react';
import { Activity, Shield, Wifi, Cpu, Database } from 'lucide-react';

const SidebarHUD: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [ping, setPing] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setScrollPercent(Math.round((winScroll / height) * 100));
    };

    const interval = setInterval(() => {
      setPing(Math.floor(Math.random() * 5) + 22);
    }, 3000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-[80] hidden xl:flex flex-col gap-8 pointer-events-none">
      {/* Scroll Progress HUD */}
      <div className="flex flex-col items-center gap-4">
        <div className="h-48 w-[1px] bg-white/5 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] transition-all duration-300"
            style={{ height: `${scrollPercent}%` }}
          />
        </div>
        <div className="font-mono text-[10px] text-cyan-400 rotate-90 origin-center whitespace-nowrap tracking-[0.3em] mt-4">
          SECTOR_POS: {scrollPercent}%
        </div>
      </div>

      {/* System Status HUD */}
      <div className="space-y-6 pt-8 border-t border-white/5">
        <div className="flex flex-col items-center gap-2">
          <Activity className="w-3 h-3 text-emerald-500" />
          <span className="text-[8px] font-mono text-slate-500 uppercase">SYS_ACTIVE</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Wifi className="w-3 h-3 text-cyan-400" />
          <span className="text-[8px] font-mono text-slate-500 uppercase">{ping}MS</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Shield className="w-3 h-3 text-rose-500" />
          <span className="text-[8px] font-mono text-slate-500 uppercase">PROT_LVL_5</span>
        </div>
      </div>

      {/* Decorative Data Flow */}
      <div className="h-32 w-10 relative overflow-hidden data-flow-container mt-4">
        <div className="absolute top-0 left-0 w-full animate-[data-flow_20s_linear_infinite]">
          {Array.from({ length: 20 }).map((_, i) => (
             <div key={i} className="text-[6px] font-mono text-slate-700 leading-none mb-1 text-center">
               {Math.random().toString(16).slice(2, 8).toUpperCase()}
             </div>
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
             <div key={i+20} className="text-[6px] font-mono text-slate-700 leading-none mb-1 text-center">
               {Math.random().toString(16).slice(2, 8).toUpperCase()}
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarHUD;