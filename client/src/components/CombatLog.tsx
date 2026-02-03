import { CombatLog as CombatLogType } from '@/types/game';
import { RPS_EMOJIS, RPS_LABELS } from '@/lib/constants';

interface CombatLogProps {
  logs: CombatLogType[];
}

export function CombatLog({ logs }: CombatLogProps) {
  if (logs.length === 0) {
    return (
      <div className="text-center text-gray-500 text-sm">
        Chưa có hành động nào
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-64 overflow-y-auto">
      {[...logs].reverse().map((log, index) => (
        <div
          key={log.id}
          className={`
            p-3 rounded-lg border border-gray-700/50 text-xs
            ${
              log.result === 'win'
                ? 'bg-green-900/20 border-green-500/30'
                : log.result === 'lose'
                  ? 'bg-red-900/20 border-red-500/30'
                  : 'bg-gray-800/20 border-gray-500/30'
            }
          `}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">
              {log.result === 'win' ? '✓ Thắng' : log.result === 'lose' ? '✗ Thua' : '= Hòa'}
            </span>
            <span className="text-gray-400">Lượt {logs.length - index}</span>
          </div>
          <div className="text-gray-300 space-y-1">
            <div>
              Bạn: {RPS_EMOJIS[log.playerChoice]} {RPS_LABELS[log.playerChoice]} (Xúc xắc: {log.diceRoll})
            </div>
            <div>
              Quái: {RPS_EMOJIS[log.monsterChoice]} {RPS_LABELS[log.monsterChoice]}
            </div>
            <div className="flex gap-4 text-xs">
              <span className="text-green-400">Gây: {log.playerDamage}</span>
              {log.monsterDamage > 0 && (
                <span className="text-red-400">Nhận: {log.monsterDamage}</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
