import * as React from 'react';
import MatrixBackground from './MatrixBackground';
import HangingID3D from './HangingID3D';
import { HERO_HEADLINE, HERO_SUB } from '../constants';
import { ArrowRight, ChevronDown, Layers3, ShieldCheck, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-24">
      <MatrixBackground />

      <div className="absolute inset-0 z-[35] pointer-events-none">
        <HangingID3D scale={window.innerWidth < 768 ? 0.65 : 0.9} />
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(225,29,72,0.12),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.15)_0%,rgba(2,6,23,0.55)_58%,rgba(2,6,23,0.92)_100%)] z-10" />

      <div className="section-shell relative z-20 grid min-h-[calc(100vh-6rem)] items-center gap-10 pb-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <div className="section-kicker mb-6 w-fit">
            SYSTEM ONLINE
          </div>

          <h1 className="max-w-4xl text-5xl font-bold leading-[0.95] text-white md:text-7xl lg:text-8xl">
            <span className="block">John Mark</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-rose-400">Calimbo</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            {HERO_SUB} {HERO_HEADLINE}
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a 
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-8 py-4 text-sm font-bold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-cyan-300"
            >
              View My Work <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a 
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-bold text-white transition-all hover:border-rose-400/40 hover:bg-rose-400/10 hover:text-rose-200"
            >
              Start a Project
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Sparkles, label: 'Build style', value: 'Fast, sharp, interactive' },
              { icon: ShieldCheck, label: 'Security', value: 'Testing, hardening, audits' },
              { icon: Layers3, label: 'Scope', value: 'Games, web, and tools' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="glass-panel rounded-2xl border border-white/10 p-4">
                  <div className="mb-3 inline-flex rounded-xl border border-cyan-400/15 bg-cyan-400/10 p-2 text-cyan-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm text-slate-200">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="glass-panel relative overflow-hidden rounded-[2rem] border border-white/10 p-6 md:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.14),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(225,29,72,0.12),transparent_30%)]" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-slate-300">Mission Panel</span>
                <span className="text-xs text-emerald-300">Ready</span>
              </div>

              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-[#020617]/70 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">Primary Focus</p>
                  <p className="mt-2 text-lg font-bold text-white">Interactive systems with strong visual identity.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#020617]/70 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-rose-300">Current Stack</p>
                  <p className="mt-2 text-sm text-slate-300">React, Three.js, Godot, Unity, Node.js, Linux tooling.</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#020617]/70 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-purple-300">Delivery Style</p>
                  <p className="mt-2 text-sm text-slate-300">Small iterations, clean systems, and visible progress.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce text-slate-500">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;