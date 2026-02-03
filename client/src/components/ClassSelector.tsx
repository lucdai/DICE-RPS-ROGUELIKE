import { Button } from '@/components/ui/button';
import { PlayerClass } from '@/types/game';
import { CLASS_DEFINITIONS } from '@/lib/class-system';

interface ClassSelectorProps {
  onSelectClass: (playerClass: PlayerClass) => void;
}

export function ClassSelector({ onSelectClass }: ClassSelectorProps) {
  const classes: PlayerClass[] = ['warrior', 'mage', 'archer', 'rogue'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold glow-accent mb-2">CHỌN NGHỀ NGHIỆP</h1>
        <p className="text-purple-400 text-lg">Mỗi class có stat bonus và skill độc đáo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {classes.map((playerClass) => {
          const classDef = CLASS_DEFINITIONS[playerClass];
          const stats = classDef.stats;
          const skill = classDef.skill;

          return (
            <div
              key={playerClass}
              className="bg-gray-900/80 rounded-lg border-2 border-purple-500/50 hover:border-purple-400 transition-all p-6 cursor-pointer hover:shadow-lg hover:shadow-purple-500/30"
            >
              {/* Class Name */}
              <h2 className="text-2xl font-bold text-purple-300 mb-2">{classDef.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{classDef.description}</p>

              {/* Stats */}
              <div className="bg-gray-800/50 rounded p-4 mb-4 text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-400">HP:</span>
                  <span className="text-green-400 font-semibold">{stats.hp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Attack:</span>
                  <span className="text-red-400 font-semibold">{stats.attack}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Defense:</span>
                  <span className="text-blue-400 font-semibold">{stats.defense}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Speed:</span>
                  <span className="text-yellow-400 font-semibold">{stats.speed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Crit Chance:</span>
                  <span className="text-orange-400 font-semibold">{stats.critChance}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Crit Damage:</span>
                  <span className="text-purple-400 font-semibold">×{stats.critDamage}</span>
                </div>
              </div>

              {/* Skill */}
              <div className="bg-purple-900/30 rounded p-3 mb-4 border border-purple-500/30">
                <div className="text-purple-300 font-bold text-sm mb-1">⚡ {skill.name}</div>
                <div className="text-gray-400 text-xs">{skill.description}</div>
              </div>

              {/* Select Button */}
              <Button
                onClick={() => onSelectClass(playerClass)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 rounded"
              >
                Chọn {classDef.name}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
