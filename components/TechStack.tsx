import React from 'react';
import { TECH_STACK } from '../constants';

const TechStack: React.FC = () => {
  return (
    <section id="tech" className="relative py-24 overflow-hidden">
      <div className="section-shell">
        <div className="mb-16">
          <div className="section-kicker mb-4 w-fit">Arsenal</div>
          <h2 className="section-title text-center md:text-left">Technical <span className="text-cyan-300">Inventory</span></h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TECH_STACK.map((category, idx) => (
            <div key={category.category} className="glass-panel p-8 border border-white/5 relative overflow-hidden group cyber-corners">
              <div className="hud-tag">Tech_Inventory_0{idx + 1}</div>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-1 w-1 bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400 group-hover:text-cyan-300 transition-colors">
                  {category.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.items.map((tech) => (
                  <div 
                    key={tech.name} 
                    className="inline-flex items-center gap-2 rounded-sm border border-white/5 bg-white/5 px-3 py-2 transition-all hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/5 group/tech"
                  >
                    <span className="text-lg grayscale group-hover/tech:grayscale-0 transition-all">{tech.icon}</span>
                    <span className="text-[10px] font-bold text-slate-400 group-hover/tech:text-white font-mono uppercase tracking-wider">{tech.name}</span>
                  </div>
                ))}
              </div>

              {/* Background ID decor */}
              <div className="absolute -bottom-2 -right-2 font-mono text-[40px] font-black text-white/5 select-none pointer-events-none uppercase">
                0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;