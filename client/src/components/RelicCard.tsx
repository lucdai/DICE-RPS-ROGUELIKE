import { Relic } from '@/types/game';

interface RelicCardProps {
  relic: Relic;
  onSelect: () => void;
  isSelected?: boolean;
}

export function RelicCard({ relic, onSelect, isSelected = false }: RelicCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-4 rounded-lg border-2 transition-all duration-200
        ${
          isSelected
            ? 'border-amber-500 bg-amber-500/20 shadow-lg shadow-amber-500/50'
            : 'border-amber-500/30 bg-gray-800/50 hover:border-amber-500/60 hover:bg-gray-700/50'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className="text-4xl">{relic.icon}</div>
        <div className="flex-1 text-left">
          <h3 className="font-bold text-amber-400 mb-1">{relic.name}</h3>
          <p className="text-sm text-gray-300">{relic.description}</p>
        </div>
      </div>
    </button>
  );
}
