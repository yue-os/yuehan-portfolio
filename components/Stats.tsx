import React from 'react';
import { STATS } from '../constants';
import RevealOnScroll from './RevealOnScroll';

const Stats: React.FC = () => {
  return (
    <section className="relative py-10 md:py-14">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(34,211,238,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(34,211,238,0.03)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60" />
      
      <div className="section-shell relative z-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <div className="section-kicker mb-3 w-fit">Operational Snapshot</div>
            <h2 className="section-title">Built for momentum</h2>
          </div>
          <p className="hidden max-w-xl text-right text-sm text-slate-400 md:block">
            A quick read on experience, breadth, and throughput before the deeper sections.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <RevealOnScroll key={index} delay={index * 100}>
                <div className="glass-panel group rounded-3xl border border-white/10 p-6 transition-all hover:-translate-y-1 hover:border-white/20">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{stat.label}</p>
                      <h3 className={`mt-2 text-3xl font-bold ${stat.color} transition-colors group-hover:text-white`}>
                        {stat.value}
                      </h3>
                    </div>
                    <div className={`rounded-2xl border border-white/10 bg-white/5 p-3 ${stat.color}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                  <div className="mt-6 h-1.5 rounded-full bg-white/5">
                    <div className={`h-full rounded-full bg-gradient-to-r ${index === 0 ? 'from-cyan-400 to-cyan-200' : index === 1 ? 'from-purple-400 to-fuchsia-300' : 'from-rose-400 to-orange-300'} w-[85%]`} />
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;