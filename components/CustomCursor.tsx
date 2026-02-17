import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div className={`
          relative -top-1.5 -left-1.5 rounded-full bg-cyan-400 transition-all duration-150 ease-out
          ${isPointer ? 'w-8 h-8 opacity-50' : 'w-3 h-3'}
        `} />
      </div>
      
      {/* Trailing Ring */}
      <div 
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
         <div className={`
          relative -top-4 -left-4 border border-cyan-500/50 rounded-full
          ${isPointer ? 'w-12 h-12 scale-150 border-purple-500' : 'w-8 h-8 scale-100'}
        `} />
      </div>
    </>
  );
};

export default CustomCursor;