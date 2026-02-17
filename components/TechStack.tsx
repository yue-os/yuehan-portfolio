import React from 'react';
import { TECH_STACK } from '../constants';

const TechStack: React.FC = () => {
  return (
    <section id="tech" className="py-16 bg-black border-y border-gray-800 overflow-hidden">
      <div className="relative w-full max-w-7xl mx-auto px-4 mb-8">
        <h3 className="text-xl font-mono text-gray-500 text-center">
          // TECHNOLOGIES & TOOLS
        </h3>
      </div>
      
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
          {/* Double the list for seamless loop */}
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <div 
              key={`${tech.name}-${i}`} 
              className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded border border-gray-800 bg-[#0d1117] hover:border-cyan-500/50 hover:bg-cyan-900/10 transition-colors duration-300"
            >
              <span className="text-2xl">{tech.icon}</span>
              <span className="text-lg font-bold text-gray-300 font-mono">{tech.name}</span>
            </div>
          ))}
        </div>
        
        {/* Clone for absolute continuity if needed, but the first loop with width calculation usually works. 
            Tailwind arbitrary animation: animate-[scroll_20s_linear_infinite] 
            We need to define the keyframes in the global style or tailwind config.
            Since we can't edit config, I added styles in index.html, but let's ensure it works here with a style tag.
         */}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: scroll 30s linear infinite;
        }
        /* Pause on hover */
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TechStack;