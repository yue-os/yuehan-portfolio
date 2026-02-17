import React, { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
  threshold?: number;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
  className?: string;
}

const RevealOnScroll: React.FC<Props> = ({ 
  children, 
  threshold = 0.1, 
  delay = 0, 
  direction = 'up',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0)';
    switch (direction) {
      case 'up': return 'translate(0, 50px)';
      case 'left': return 'translate(-50px, 0)';
      case 'right': return 'translate(50px, 0)';
      default: return 'translate(0, 50px)';
    }
  };

  return (
    <div
      ref={ref}
      className={`${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;