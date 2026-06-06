import React from 'react';
import { SERVICES } from '../constants';
import RevealOnScroll from './RevealOnScroll';

const Services: React.FC = () => {
  return (
    <section id="services" className="relative py-20 overflow-hidden">
      <div className="section-shell">
        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <RevealOnScroll>
            <div>
              <div className="section-kicker mb-4 w-fit">Services</div>
              <h2 className="section-title">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-rose-300">Triple Threat</span>
              </h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <p className="section-copy lg:ml-auto lg:text-right">
              Bridging creative design, robust engineering, and defensive security through a system that feels more like a command console than a résumé.
            </p>
          </RevealOnScroll>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <RevealOnScroll className="h-full">
            <div className="glass-panel h-full border border-white/5 p-8 lg:p-12 relative overflow-hidden cyber-corners">
              <div className="hud-tag">Execution_Core</div>
              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-400 mb-6">Execution_Strategy</p>
                <h3 className="text-4xl font-bold text-white leading-tight">Fast loops. High-fidelity output.</h3>
                <p className="mt-6 text-slate-400 leading-relaxed">
                  Each build follows a rigorous cycle: prototype deployment, rapid refinement, and security-hardened delivery. No overhead, just pure performance.
                </p>
                
                <div className="mt-12 space-y-4">
                  {[
                    { label: 'Phase 01', title: 'Prototype Logic' },
                    { label: 'Phase 02', title: 'Stress Testing' },
                    { label: 'Phase 03', title: 'Stable Deployment' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4">
                      <div>
                        <p className="text-[8px] font-mono text-slate-600 tracking-widest uppercase">{item.label}</p>
                        <p className="text-sm font-bold text-slate-200 mt-1">{item.title}</p>
                      </div>
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            let themeColor = "";
            let glowColor = "";
            
            if (service.color === 'cyan') {
              themeColor = "text-cyan-400";
              glowColor = "shadow-[0_0_20px_rgba(34,211,238,0.1)] hover:border-cyan-500/40";
            } else if (service.color === 'crimson') {
              themeColor = "text-rose-500";
              glowColor = "shadow-[0_0_20px_rgba(244,63,94,0.1)] hover:border-rose-500/40";
            } else {
              themeColor = "text-purple-500";
              glowColor = "shadow-[0_0_20px_rgba(168,85,247,0.1)] hover:border-purple-500/40";
            }

            return (
              <RevealOnScroll key={index} delay={index * 150} className="h-full">
                <div className={`
                  glass-panel h-full border border-white/5 p-8
                  transition-all duration-500 group relative cyber-corners
                  ${glowColor}
                `}>
                  <div className="hud-tag">Eng_Module_0{index + 1}</div>
                  <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                    <div className="flex-shrink-0">
                      <div className="rounded-sm border border-white/10 bg-white/5 p-5 relative overflow-hidden">
                        <Icon className={`w-8 h-8 ${themeColor} relative z-10 transition-transform duration-500 group-hover:scale-110`} />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-white uppercase tracking-wider">
                          {service.title}
                        </h3>
                        <span className="h-[1px] flex-grow bg-white/5" />
                      </div>
                      
                      <p className="mb-8 leading-relaxed text-slate-400 text-sm max-w-xl group-hover:text-slate-200 transition-colors">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-x-6 gap-y-3">
                        {service.skills.map((skill, i) => (
                          <div key={i} className="flex items-center gap-2 group/skill">
                            <span className={`w-1 h-3 ${service.color === 'cyan' ? 'bg-cyan-500' : service.color === 'crimson' ? 'bg-rose-500' : 'bg-purple-500'} opacity-30 group-hover/skill:opacity-100 transition-opacity`} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 group-hover/skill:text-white transition-colors">
                              {skill}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Corner Label */}
                  <div className="absolute bottom-4 right-6 font-mono text-[8px] text-slate-700">
                    MODULE_{service.title.replace(' ', '_').toUpperCase()} // STABLE
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;