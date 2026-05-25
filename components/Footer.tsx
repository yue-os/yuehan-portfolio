import React from 'react';
import { SOCIAL_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="relative pb-8 pt-20">
      <div className="section-shell">
        <div className="glass-panel rounded-[2rem] border border-white/10 p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="section-kicker mb-4 w-fit">Contact</div>
              <h2 className="section-title">Let’s build something secure.</h2>
              <p className="section-copy mt-4">
                Open for commissions, audits, and focused builds that need a strong visual identity and a clean execution path.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Discord: 0xyue.dev</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Response: usually quick</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">Timezone: flexible</span>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Find me</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <a 
                        key={link.platform}
                        href={link.url}
                        className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300 transition-all hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-white"
                        aria-label={link.platform}
                      >
                        <Icon className="w-5 h-5" />
                        {link.platform}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Availability</p>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Best for work that needs a clear front-facing layout, a technical edge, and a fast iteration loop.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Yuehan. All systems operational.
            </p>
            <p className="text-sm text-slate-500">
              Built with React, Three.js, and a little too much red.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;