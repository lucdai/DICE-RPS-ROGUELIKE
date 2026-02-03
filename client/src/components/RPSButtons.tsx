import { RPSChoice } from '@/types/game';
import { RPS_EMOJIS, RPS_LABELS } from '@/lib/constants';

interface RPSButtonsProps {
  onSelect: (choice: RPSChoice) => void;
  disabled?: boolean;
}

export function RPSButtons({ onSelect, disabled = false }: RPSButtonsProps) {
  const choices: RPSChoice[] = ['rock', 'paper', 'scissors'];

  return (
    <div className="flex gap-4 justify-center flex-wrap">
      {choices.map((choice) => (
        <button
          key={choice}
          onClick={() => onSelect(choice)}
          disabled={disabled}
          className={`
            flex flex-col items-center gap-2 px-6 py-4 rounded-lg
            border-2 border-amber-500/50 bg-gray-800/50
            hover:border-amber-500 hover:bg-gray-700/50
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            ${!disabled && 'hover:shadow-lg hover:shadow-amber-500/20'}
          `}
        >
          <div className="text-4xl">{RPS_EMOJIS[choice]}</div>
          <div className="text-sm font-semibold text-gray-200">
            {RPS_LABELS[choice]}
          </div>
        </button>
      ))}
    </div>
  );
}
