import React from 'react';
import { EXPERIENCE } from '../constants';
import RevealOnScroll from './RevealOnScroll';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative py-20">
      <div className="section-shell">
        <div className="mb-16">
          <div className="section-kicker mb-4 w-fit">Track Record</div>
          <h2 className="section-title">Professional <span className="text-cyan-300">Progression</span></h2>
          <p className="section-copy mt-4">
            A chronological timeline of technical leadership, system architecture, and defensive security engagements.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-500/50 via-white/10 to-rose-500/50 hidden md:block" />

          <div className="space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <RevealOnScroll 
                key={exp.id} 
                delay={index * 100} 
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className={`relative flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Dot on timeline */}
                  <div className="absolute left-[-5px] md:left-1/2 md:ml-[-5px] top-0 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] z-10 hidden md:block" />

                  {/* Period Mobile */}
                  <div className="flex md:hidden items-center gap-2 text-cyan-400 font-mono text-xs mb-2">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </div>

                  <div className="w-full md:w-1/2">
                    <div className="glass-panel p-8 border border-white/5 relative overflow-hidden group hover:border-cyan-500/30 transition-all duration-500 cyber-corners">
                      <div className="hud-tag">Experience_Entry_0{index + 1}</div>
                      {/* Accent Gradient */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors uppercase tracking-wider">{exp.role}</h3>
                          <p className="text-cyan-400 font-mono text-sm mt-1">{exp.company}</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-slate-500 font-mono text-[10px] uppercase tracking-widest">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                            <ChevronRight className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill) => (
                          <span key={skill} className="px-3 py-1 rounded-sm border border-white/10 bg-white/5 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty spacer for the other side of the timeline */}
                  <div className="hidden md:block w-1/2" />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;