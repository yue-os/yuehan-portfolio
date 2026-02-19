import React from 'react';
import MatrixBackground from './MatrixBackground';
import { HERO_HEADLINE, HERO_SUB } from '../constants';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <MatrixBackground />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1117]/60 to-[#0d1117] z-10" />

      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-block mb-4 px-3 py-1 border border-cyan-500/30 rounded-full bg-cyan-900/10 backdrop-blur-sm">
          <span className="text-cyan-400 text-sm tracking-[0.2em] font-bold">SYSTEM ONLINE</span>
        </div>
        
        <h1 className="text-4xl md:text-7xl font-bold mb-6 text-white leading-tight">
          Yuehan: <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 text-glow">Bit</span>, <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600 text-glow-red">by bit.</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          {HERO_SUB}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#projects"
            className="group relative px-8 py-3 bg-cyan-600 text-white font-bold overflow-hidden rounded transition-all hover:bg-cyan-500 hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Arsenal <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            {/* Glitch effect overlay */}
            <div className="absolute inset-0 h-full w-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>

          <a 
            href="#contact"
            className="px-8 py-3 border border-gray-600 text-gray-300 font-bold rounded hover:border-purple-500 hover:text-purple-400 transition-all hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            Hire for Pentesting
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-gray-500">
        <ChevronDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;