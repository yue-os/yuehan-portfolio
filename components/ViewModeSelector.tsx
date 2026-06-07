import React from 'react';
import { ViewMode } from '../types';
import { Package, Terminal } from 'lucide-react';

interface ViewModeSelectorProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const ViewModeSelector: React.FC<ViewModeSelectorProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4">
      <div className="glass-panel rounded-full p-1.5 flex items-center gap-2 border-white/10 backdrop-blur-xl shadow-2xl">
        <button
          onClick={() => onModeChange('arsenal')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 group ${
            currentMode === 'arsenal'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Package className={`w-4 h-4 transition-transform duration-300 ${currentMode === 'arsenal' ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">Arsenal</span>
        </button>

        <div className="w-[1px] h-4 bg-white/10" />

        <button
          onClick={() => onModeChange('logs')}
          className={`flex items-center gap-2 px-6 py-2 rounded-full transition-all duration-300 group ${
            currentMode === 'logs'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Terminal className={`w-4 h-4 transition-transform duration-300 ${currentMode === 'logs' ? 'scale-110' : 'group-hover:scale-110'}`} />
          <span className="text-[10px] font-black tracking-[0.2em] uppercase">Logs</span>
        </button>
      </div>
      
      {/* Decorative HUD labels */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center gap-12 whitespace-nowrap opacity-50">
        <span className="text-[7px] font-mono text-cyan-500/60 uppercase tracking-[0.3em]">View_Selector</span>
      </div>
    </div>
  );
};

export default ViewModeSelector;