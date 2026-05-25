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

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <RevealOnScroll className="h-full">
            <div className="glass-panel h-full rounded-3xl border border-white/10 p-8">
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Working mode</p>
              <h3 className="mt-4 text-3xl font-bold text-white">Sharp output, small loops, visible results.</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                Each engagement gets a distinct lane: game systems, security assurance, or full-stack execution. The layout reflects that priority instead of hiding it in equal cards.
              </p>
              <div className="mt-8 grid gap-3">
                {['Prototype first', 'Refine fast', 'Ship clean'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            let borderColor = "";
            let shadowColor = "";
            let iconTextColor = "";
            let bulletBgColor = "";
            
            if (service.color === 'cyan') {
               borderColor = "hover:border-cyan-500/50";
               shadowColor = "hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]";
               iconTextColor = "text-cyan-400";
               bulletBgColor = "bg-cyan-500";
            } else if (service.color === 'crimson') {
               borderColor = "hover:border-rose-500/50";
               shadowColor = "hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]";
               iconTextColor = "text-rose-400";
               bulletBgColor = "bg-rose-500";
            } else {
               borderColor = "hover:border-purple-500/50";
               shadowColor = "hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]";
               iconTextColor = "text-purple-400";
               bulletBgColor = "bg-purple-500";
            }

            return (
              <RevealOnScroll key={index} delay={index * 150} className="h-full">
                <div className={`
                  glass-panel h-full rounded-3xl border border-white/10 p-7
                  transition-all duration-300 group
                  ${borderColor} ${shadowColor}
                `}>
                  <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Icon className={`w-7 h-7 ${iconTextColor}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 transition-transform group-hover:translate-x-1">
                    {service.title}
                  </h3>
                  
                  <p className="mb-6 leading-relaxed text-slate-300">
                    {service.description}
                  </p>

                  <ul className="grid gap-2 sm:grid-cols-2">
                    {service.skills.map((skill, i) => (
                      <li key={i} className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-slate-400 font-mono">
                        <span className={`w-2 h-2 rounded-full ${bulletBgColor}`} />
                        {skill}
                      </li>
                    ))}
                  </ul>
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