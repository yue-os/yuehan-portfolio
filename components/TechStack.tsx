import React from 'react';
import { TECH_STACK } from '../constants';

const TechStack: React.FC = () => {
  return (
    <section id="tech" className="relative py-20 overflow-hidden">
      <div className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <div className="section-kicker mb-4 w-fit">Stack</div>
            <h2 className="section-title">Tools that keep the build moving.</h2>
            <p className="section-copy mt-4">
              A working set of languages, engines, and deployment tools arranged as a living tool shelf instead of a flat ticker.
            </p>
          </div>

          <div className="glass-panel rounded-[2rem] border border-white/10 p-6 md:p-8">
            <div className="flex flex-wrap gap-3">
              {TECH_STACK.map((tech) => (
                <div 
                  key={tech.name} 
                  className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/10"
                >
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="text-sm font-bold text-slate-200 font-mono">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;