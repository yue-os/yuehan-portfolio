import React from 'react';
import { PROJECTS } from '../constants';
import RevealOnScroll from './RevealOnScroll';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 bg-[#0d1117] relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-900/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-cyan-900/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll>
          <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white">
            Featured <span className="text-cyan-400">Arsenal</span>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 100}>
              <div className="group relative rounded-xl overflow-hidden glass-panel h-full hover:border-cyan-500/30 transition-all duration-300">
                {/* Image Overlay */}
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent z-10 opacity-80" />
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 text-xs font-mono text-cyan-300">
                    {project.category}
                  </div>
                </div>

                <div className="p-6 relative z-20 -mt-12">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm leading-relaxed h-20 overflow-hidden">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="text-xs font-mono px-2 py-1 rounded border border-gray-700 text-gray-400 bg-gray-900/50">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </button>
                    <button className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                      <Github className="w-4 h-4" /> Code
                    </button>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;