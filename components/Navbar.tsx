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
    { name: 'Tech', href: '#tech' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 px-3 pt-3 transition-all duration-300 ${
        isScrolled ? 'translate-y-0' : 'translate-y-0'
      }`}
    >
      <div className="section-shell">
        <div className={`glass-panel mx-auto flex h-16 items-center justify-between rounded-2xl px-4 shadow-[0_12px_40px_rgba(0,0,0,0.28)] transition-all ${isScrolled ? 'border-white/10' : 'border-white/5'}`}>
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
              <Terminal className="w-5 h-5 text-cyan-300 group-hover:text-white transition-colors" />
            </div>
            <span className="font-bold text-lg tracking-[0.22em] text-white brand-font group-hover:text-cyan-300 transition-colors">
              YUE<span className="text-cyan-300">HAN</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href="#contact" className="rounded-full border border-rose-400/40 bg-rose-400/10 px-4 py-2 text-sm font-bold text-rose-200 transition-all hover:bg-rose-400 hover:text-white">
              Hire Me
            </a>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="lg:hidden rounded-full border border-white/10 bg-white/5 p-2 text-slate-300"
            >
              {isMobileOpen ? <X /> : <Menu />}
            </button>
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