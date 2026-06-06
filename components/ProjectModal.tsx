import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, Terminal, ShieldCheck, Cpu } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/90 shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300 cyber-corners">
        <div className="hud-tag">System_Dossier_0X{project.id.toUpperCase()}</div>
        {/* Top Scanline Line */}
        <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee]" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 rounded-full border border-white/10 bg-white/5 p-3 text-slate-400 transition-all hover:bg-rose-500/20 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid lg:grid-cols-[0.45fr_0.55fr] max-h-[85vh] overflow-y-auto">
          {/* Visual Side */}
          <div className="relative h-64 lg:h-auto overflow-hidden border-b lg:border-b-0 lg:border-r border-white/5">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="h-full w-full object-cover opacity-60 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-slate-900" />
            
            {/* Corner Decor */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3">
               <div className="rounded-sm border border-cyan-400/30 bg-black/60 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 backdrop-blur-md">
                {project.category}
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="flex flex-col p-8 lg:p-12">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] font-mono text-slate-500 tracking-[0.3em]">SYSTEM_RECORD_ID_0X{project.id.toUpperCase()}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h2>
              
              <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-cyan-400/20">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 mb-3" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</p>
                  <p className="text-sm font-bold text-slate-200 mt-1">Operational</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4 transition-all hover:border-rose-400/20">
                  <Cpu className="w-5 h-5 text-rose-400 mb-3" />
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Complexity</p>
                  <p className="text-sm font-bold text-slate-200 mt-1">High-Level</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Core Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span key={tech} className="rounded-sm border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <a 
                href="#" 
                className="cyber-button flex items-center justify-center gap-3 text-center"
              >
                <ExternalLink className="w-4 h-4" />
                Initialize Deployment
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center gap-3 rounded-sm border border-white/10 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 transition-all hover:bg-white/10 hover:text-white"
              >
                <Github className="w-4 h-4" />
                Access Repository
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;