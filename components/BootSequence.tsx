// components/BootSequence.tsx
import React, { useState, useEffect } from 'react';

const FINAL_TEXT = [
  "> SYSTEM: TACTICAL_OS_V2.4",
  "> STATUS: ONLINE",
  "> USER: YUEHAN",
  "> ACCESS: GRANTED"
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'scramble' | 'resolve' | 'flash'>('scramble');
  const [displayText, setDisplayText] = useState<string[]>(['', '', '', '']);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (phase === 'scramble') {
      interval = setInterval(() => {
        setDisplayText(FINAL_TEXT.map(line => 
          line.split('').map(char => char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
        ));
      }, 50);

      setTimeout(() => setPhase('resolve'), 1500);
    } else if (phase === 'resolve') {
      setDisplayText(FINAL_TEXT);
      setTimeout(() => setPhase('flash'), 1000); // 2.5s total
    } else if (phase === 'flash') {
      setTimeout(onComplete, 500); // 3.0s total
    }

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  if (phase === 'flash') {
    return <div className="fixed inset-0 z-[100] bg-white animate-crt-flash pointer-events-none" />;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-[#010208] flex items-center justify-center font-mono p-8">
      <div className="max-w-2xl w-full">
        {displayText.map((line, i) => (
          <div key={i} className={`text-xl md:text-2xl tracking-widest font-black mb-2 ${phase === 'scramble' ? 'text-emerald-500' : 'text-cyan-400'}`}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BootSequence;
