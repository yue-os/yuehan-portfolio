import React, { useEffect, useRef } from 'react';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      const target = e.target;
      if (target instanceof Element && ringRef.current) {
        const isPointer = window.getComputedStyle(target).cursor === 'pointer';
        if (isPointer) {
           ringRef.current.classList.add('scale-150', 'border-cyan-400');
        } else {
           ringRef.current.classList.remove('scale-150', 'border-cyan-400');
        }
      }
    };

    const animate = () => {
      // Direct interpolation for smoothness
      // Dot follows instantly
      dotPos.current.x = mousePos.current.x;
      dotPos.current.y = mousePos.current.y;
      
      // Ring follows with slight lag/smoothing
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* Main Cursor Dot */}
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      >
        <div className="relative -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
      </div>
      
      {/* Trailing Ring */}
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] transition-transform duration-75 ease-out will-change-transform"
      >
         <div className="relative -top-4 -left-4 w-8 h-8 border border-cyan-500/30 rounded-full transition-all duration-300" />
      </div>
    </>
  );
};

export default CustomCursor;