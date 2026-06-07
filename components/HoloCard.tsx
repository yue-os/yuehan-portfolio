import React, { useRef, useState, MouseEvent } from 'react';

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const HoloCard: React.FC<HoloCardProps> = ({ children, className = '', onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates: -0.5 to 0.5
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;
    
    // Max rotation 15 degrees
    setRotation({
      x: normY * -30, // Invert Y for correct tilt
      y: normX * 30
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div 
      className={`relative perspective-[1000px] ${className}`}
      onClick={onClick}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full relative preserve-3d"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovered ? 'none' : 'transform 0.5s ease-out'
        }}
      >
        {/* Glare Layer */}
        <div 
          className="absolute inset-0 pointer-events-none rounded-sm z-50 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${((rotation.y / 30) + 0.5) * 100}% ${((rotation.x / -30) + 0.5) * 100}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
            transform: 'translateZ(1px)' // Sit slightly above background
          }}
        {/* Content Layer */}
        <div 
          className="w-full h-full preserve-3d"
          style={{ transform: 'translateZ(0px)' }}
        >
          {children}
        </div>
        </div>
        </div>
  );
};

export default HoloCard;