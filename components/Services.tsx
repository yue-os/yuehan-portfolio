import React from 'react';
import { SERVICES } from '../constants';
import RevealOnScroll from './RevealOnScroll';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-rose-500">Triple Threat</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Bridging the gap between creative design, robust engineering, and defensive security.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            let borderColor = "";
            let shadowColor = "";
            
            if (service.color === 'cyan') {
               borderColor = "hover:border-cyan-500/50";
               shadowColor = "hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]";
            } else if (service.color === 'crimson') {
               borderColor = "hover:border-rose-500/50";
               shadowColor = "hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]";
            } else {
               borderColor = "hover:border-purple-500/50";
               shadowColor = "hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]";
            }

            return (
              <RevealOnScroll key={index} delay={index * 150} className="h-full">
                <div className={`
                  glass-panel h-full p-8 rounded-xl border border-transparent 
                  transition-all duration-300 group
                  ${borderColor} ${shadowColor}
                `}>
                  <div className="mb-6 inline-block p-4 rounded-lg bg-[#0d1117] border border-gray-800 group-hover:border-gray-600 transition-colors">
                    <Icon className={`w-8 h-8 text-${service.color === 'crimson' ? 'rose' : service.color}-400`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:translate-x-2 transition-transform">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.skills.map((skill, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-500 font-mono">
                        <span className={`w-1.5 h-1.5 rounded-full mr-2 bg-${service.color === 'crimson' ? 'rose' : service.color}-500`} />
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
    </section>
  );
};

export default Services;