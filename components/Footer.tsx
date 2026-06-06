import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative pb-8 pt-20">
      <div className="section-shell">
        <div className="glass-panel rounded-[2rem] border border-white/10 p-8 md:p-12 relative overflow-hidden">
          {/* Grid background effect */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="section-kicker mb-4 w-fit">Secure Channel</div>
              <h2 className="section-title text-glow-cyan uppercase tracking-tighter text-4xl md:text-6xl">Ready for Deployment.</h2>
              <p className="section-copy mt-6 text-lg text-slate-400 max-w-xl">
                Currently open for senior engineering roles, security audits, and complex system builds that require a tactical edge.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <div className="rounded-sm border border-cyan-400/20 bg-cyan-400/5 px-5 py-2.5 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Discord: 0xyue.dev</span>
                </div>
                <div className="rounded-sm border border-emerald-400/20 bg-emerald-400/5 px-5 py-2.5 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest">Status: Active</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-panel p-8 border border-white/5 relative group">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-6">Network_Nodes</p>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a 
                        key={link.platform}
                        href={link.url}
                        className="inline-flex items-center gap-3 rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white group/link"
                        aria-label={link.platform}
                      >
                        <Icon className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5" />
                        {link.platform}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="glass-panel p-8 border border-white/5 relative group overflow-hidden">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-4">Engagement_Parameters</p>
                <p className="text-sm leading-7 text-slate-400 group-hover:text-slate-200 transition-colors">
                  Optimized for performance-critical systems, front-facing interfaces, and security-first development environments.
                </p>
                {/* Visual scan accent */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent" />
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-6 border-t border-white/5 pt-8 md:flex-row md:items-center md:justify-between relative z-10">
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
               © {new Date().getFullYear()} <span className="text-white">YUEHAN_OS</span> // ALL_SYSTEMS_OPERATIONAL
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
              Build_v2.4.0 // STABLE_RUNTIME
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;