import { Monster as MonsterType } from '@/types/game';

interface MonsterProps {
  monster: MonsterType;
  isAttacking?: boolean;
  isDamaged?: boolean;
}

export function Monster({ monster, isAttacking = false, isDamaged = false }: MonsterProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <h2 className="text-2xl font-bold glow-primary mb-2">{monster.name}</h2>
        <div className="text-sm text-gray-300">Tầng {monster.floor}</div>
      </div>

      {/* Monster visual */}
      <div
        className={`
          relative w-40 h-40 flex items-center justify-center
          bg-gradient-to-b from-red-900/30 to-purple-900/30 rounded-lg
          border-2 border-red-500/50 monster-shadow
          ${isAttacking ? 'animate-shake' : ''}
          ${!isAttacking ? 'animate-monster-idle' : ''}
          ${isDamaged ? 'animate-shake' : ''}
          transition-all duration-300
        `}
      >
        {typeof monster.image === 'string' && monster.image.startsWith('/') ? (
          <img
            src={monster.image}
            alt={monster.name}
            className="w-32 h-32 object-contain drop-shadow-lg pixel-art"
          />
        ) : (
          <div className="text-6xl drop-shadow-lg">
            {monster.image}
          </div>
        )}

        {/* Ornamental effects */}
        <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30" />
        </div>
      </div>

      {/* HP Bar */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-300">HP</span>
          <span className="text-sm font-bold glow-accent">
            {Math.max(0, monster.currentHp)} / {monster.maxHp}
          </span>
        </div>
        <div className="w-full h-4 bg-gray-800 rounded-full border border-red-500/50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300"
            style={{
              width: `${Math.max(0, (monster.currentHp / monster.maxHp) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Monster stats */}
      <div className="text-center text-xs text-gray-400">
        <div>Sát thương: <span className="text-red-400 font-semibold">{monster.damage}</span></div>
      </div>
    </div>
  );
}
