import { useEffect, useState } from 'react';

interface DiceProps {
  value?: number;
  isRolling?: boolean;
  onRollComplete?: () => void;
}

export function Dice({ value = 1, isRolling = false, onRollComplete }: DiceProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (!isRolling) {
      setDisplayValue(value);
      onRollComplete?.();
    } else {
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isRolling, value, onRollComplete]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`
          relative w-24 h-24 bg-gradient-to-br from-amber-500 to-amber-700 
          rounded-lg shadow-2xl flex items-center justify-center
          ${isRolling ? 'animate-dice-spin' : 'dice-glow'}
          transition-all duration-300
        `}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="text-5xl font-bold text-white drop-shadow-lg">
          {displayValue}
        </div>
        
        {/* Ornamental corners */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-amber-300 rounded-full opacity-60" />
        <div className="absolute top-1 right-1 w-2 h-2 bg-amber-300 rounded-full opacity-60" />
        <div className="absolute bottom-1 left-1 w-2 h-2 bg-amber-300 rounded-full opacity-60" />
        <div className="absolute bottom-1 right-1 w-2 h-2 bg-amber-300 rounded-full opacity-60" />
      </div>

      {isRolling && (
        <div className="text-sm text-amber-400 animate-pulse">
          Đang tung...
        </div>
      )}
    </div>
  );
}
