import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Arsenal', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Tech', href: '#tech' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-3 pt-3 transition-all duration-300 ${
        isScrolled ? 'translate-y-0 opacity-100' : 'translate-y-0 opacity-90'
      }`}
    >
      <div className="section-shell">
        <div className={`glass-panel mx-auto flex h-16 items-center justify-between px-6 transition-all duration-500 ${isScrolled ? 'border-cyan-400/30' : 'border-white/5'} rounded-none`} style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)' }}>
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center border border-cyan-400/30 bg-cyan-400/5 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <Terminal className="w-4 h-4 text-cyan-300 group-hover:text-white transition-colors" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-[0.4em] text-white brand-font group-hover:text-glow-cyan transition-all">
                YUE<span className="text-cyan-300">HAN</span>
              </span>
              <span className="text-[7px] font-mono text-cyan-500/60 tracking-[0.2em] -mt-1 uppercase">Tactical_OS_v2.4</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-1 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 transition-all hover:text-cyan-300 relative group/nav"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-cyan-400 transition-all group-hover/nav:w-full opacity-0 group-hover/nav:opacity-100" />
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex flex-col items-end mr-2">
               <span className="text-[7px] font-mono text-slate-500 uppercase tracking-widest">Auth_Status</span>
               <span className="text-[8px] font-mono text-emerald-500 uppercase font-bold">Authorized</span>
            </div>
            <a 
              href="#contact" 
              className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/50 text-[9px] font-black uppercase tracking-[0.3em] text-cyan-100 hover:bg-cyan-500/20 transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              Secure_Comm
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300"
            >
              {isMobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden px-3 pt-3">
          <div className="glass-panel rounded-2xl border border-white/10 p-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.name}
              </a>
            ))}
            <a href="#contact" className="mt-2 block rounded-xl bg-cyan-400 px-4 py-3 text-sm font-bold text-slate-950">
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;