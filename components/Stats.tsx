import React from 'react';
import { STATS } from '../constants';
import RevealOnScroll from './RevealOnScroll';

const Stats: React.FC = () => {
  return (
    <section className="py-12 bg-[#0d1117] border-y border-gray-800 relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <RevealOnScroll key={index} delay={index * 100}>
                <div className="glass-panel p-6 rounded-lg flex items-center justify-between hover:bg-white/5 transition-colors group">
                  <div>
                    <p className="text-gray-400 text-sm font-mono mb-1">{stat.label}</p>
                    <h3 className={`text-3xl font-bold ${stat.color} group-hover:text-white transition-colors`}>
                      {stat.value}
                    </h3>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-800/50 ${stat.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8" />
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