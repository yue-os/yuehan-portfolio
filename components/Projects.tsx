import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import RevealOnScroll from './RevealOnScroll';
import ProjectModal from './ProjectModal';
import HoloCard from './HoloCard';
import { ExternalLink, Github } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

        <div className="grid gap-8 lg:grid-cols-12">
          {PROJECTS.map((project, index) => {
            // Dynamic span logic for a cooler bento layout
            let colSpan = 'lg:col-span-4';
            let minHeight = 'min-h-[24rem]';
            let isFullWidth = false;

            if (index === 0) {
              colSpan = 'lg:col-span-12';
              minHeight = 'min-h-[30rem] lg:min-h-[40rem]';
              isFullWidth = true;
            } else if (index === 1 || index === 2) {
              colSpan = 'lg:col-span-6';
            } else if (index >= 3 && index <= 5) {
              colSpan = 'lg:col-span-4';
            } else if (index === 6 || index === 9) {
              colSpan = 'lg:col-span-8';
            } else {
              colSpan = 'lg:col-span-4';
            }

            return (
              <RevealOnScroll key={project.id} delay={index * 50} className={colSpan}>
                <HoloCard 
                  onClick={() => setSelectedProject(project)}
                  className={`${minHeight} cursor-pointer group`}
                >
                  <div className={`glass-panel relative h-full w-full overflow-hidden border border-white/5 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-[0_0_50px_rgba(34,211,238,0.1)] preserve-3d`}>
                  {/* Background Image with Parallax-like effect */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="h-full w-full object-cover opacity-50 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-80 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent" />
                  </div>

                  {/* Cyber Borders & Accents */}
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30 transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:border-cyan-400/10" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-rose-500/30 transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:border-rose-500/10" />
                  </div>

                  {/* Project Content */}
                  <div className={`relative z-20 flex h-full flex-col justify-end p-6 lg:p-10 ${isFullWidth ? 'lg:flex-row lg:items-end lg:justify-between' : ''}`}
                       style={{ transform: 'translateZ(30px)' }}>
                    <div className={isFullWidth ? 'lg:max-w-2xl' : ''}>
                      <div className="mb-4 flex items-center gap-3">
                        <span className="text-[10px] font-bold tracking-[0.3em] text-cyan-400 uppercase bg-cyan-400/10 px-3 py-1 border border-cyan-400/20">
                          {project.category}
                        </span>
                        <span className="h-[1px] w-8 bg-white/20" />
                        <span className="text-[10px] font-mono text-slate-500">ID: 0X{project.id.toUpperCase()}</span>
                      </div>

                      <h3 className={`font-bold text-white transition-all duration-500 group-hover:text-glow-cyan ${isFullWidth ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-2xl md:text-3xl'}`}>
                        {project.title}
                      </h3>
                      
                      <p className={`mt-4 text-slate-400 leading-relaxed transition-all duration-500 group-hover:text-slate-200 ${isFullWidth ? 'text-lg max-w-xl' : 'text-sm line-clamp-3'}`}>
                        {project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span key={tech} className="text-[9px] font-bold tracking-widest text-cyan-300/60 uppercase border-b border-cyan-400/0 transition-all hover:border-cyan-400/50 hover:text-cyan-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`mt-8 flex gap-6 ${isFullWidth ? 'lg:mt-0' : ''}`}
                         style={{ transform: 'translateZ(50px)' }}>
                      <div className="group/link flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white transition-all hover:text-cyan-400">
                        <ExternalLink className="w-4 h-4 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1" />
                        Details
                      </div>
                      <div className="group/link flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500 transition-all hover:text-white">
                        <Github className="w-4 h-4 transition-transform group-hover/link:-translate-y-1" />
                        Source
                      </div>
                    </div>
                  </div>

                  {/* Corner Scan Decoration */}
                  <div className="absolute top-4 right-4 z-20 font-mono text-[8px] text-slate-600 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    LAT: { (Math.random() * 90).toFixed(4) }<br/>
                    LON: { (Math.random() * 180).toFixed(4) }<br/>
                    STAT: ACTIVE
                  </div>
                  </div>
                </HoloCard>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;