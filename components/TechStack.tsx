import React, { Suspense } from 'react';
import { TECH_STACK } from '../constants';
import TechWeb from './TechWeb';

const TechStack: React.FC = () => {
  return (
    <section id="tech" className="relative py-24 overflow-hidden">
      <div className="section-shell">
        <div className="mb-16">
          <div className="section-kicker mb-4 w-fit">Arsenal</div>
          <h2 className="section-title text-center md:text-left">Technical <span className="text-cyan-300">Inventory</span></h2>
        </div>

        <div className="relative glass-panel border border-white/5 cyber-corners min-h-[600px] flex items-center justify-center">
          <div className="hud-tag">Neural_Tech_Web_v1.0</div>
          
          <Suspense fallback={
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
              <div className="font-mono text-xs text-cyan-400 animate-pulse">INITIALIZING NEURAL WEB...</div>
            </div>
          }>
            <TechWeb />
          </Suspense>

          {/* Legend / Info HUD Overlay */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-2 pointer-events-none">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Languages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Frameworks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Engines & Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-600" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cybersecurity</span>
            </div>
          </div>

          <div className="absolute top-6 right-6 text-right pointer-events-none">
            <div className="text-[10px] font-bold text-cyan-400/50 font-mono uppercase tracking-[0.2em]">
              Interactions Enabled:<br />
              [Drag to Rotate]<br />
              [Hover for Details]
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;