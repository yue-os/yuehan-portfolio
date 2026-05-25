import React from 'react';
import { PROJECTS } from '../constants';
import RevealOnScroll from './RevealOnScroll';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-20">
      <div className="absolute top-0 right-0 h-full w-1/3 bg-purple-500/5 blur-[110px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-full w-1/3 bg-cyan-500/5 blur-[110px] pointer-events-none" />

      <div className="section-shell relative z-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="section-kicker mb-4 w-fit">Selected Work</div>
            <h2 className="section-title">Featured <span className="text-cyan-300">Arsenal</span></h2>
          </div>
          <p className="section-copy md:text-right">
            A curated mix of game systems, full-stack products, and experimental builds laid out as a primary case study with supporting pieces.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {PROJECTS.map((project, index) => {
            const featured = index === 0;
            return (
              <RevealOnScroll key={project.id} delay={index * 90} className={featured ? 'lg:col-span-7' : 'lg:col-span-5'}>
                <div className={`group glass-panel relative h-full overflow-hidden rounded-[2rem] border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 ${featured ? 'min-h-[32rem]' : 'min-h-[18rem]'}`}>
                  <div className={`relative ${featured ? 'h-full' : 'h-72'}`}>
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.05)_0%,rgba(2,6,23,0.58)_66%,rgba(2,6,23,0.94)_100%)]" />
                    <div className="absolute left-5 top-5 z-20 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-mono text-cyan-200 backdrop-blur">
                      {project.category}
                    </div>
                  </div>

                  <div className={`absolute inset-x-0 bottom-0 z-20 p-6 ${featured ? 'md:p-8' : ''}`}>
                    <h3 className={`font-bold text-white ${featured ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>
                      {project.title}
                    </h3>
                    <p className={`mt-3 max-w-2xl text-sm leading-7 text-slate-300 ${featured ? 'md:max-w-xl' : 'line-clamp-3'}`}>
                      {project.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-slate-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex gap-4">
                      <button className="inline-flex items-center gap-2 text-sm font-bold text-white transition-colors hover:text-cyan-300">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </button>
                      <button className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition-colors hover:text-white">
                        <Github className="w-4 h-4" /> Code
                      </button>
                    </div>
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

export default Projects;