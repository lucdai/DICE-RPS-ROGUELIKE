import { Player } from '@/types/game';
import { RELICS } from '@/lib/constants';

interface PlayerStatsProps {
  player: Player;
}

export function PlayerStats({ player }: PlayerStatsProps) {
  const relicEntries = Object.entries(player.relics).filter(([_, count]) => count > 0);
  
  return (
    <div className="flex flex-col gap-6">
      {/* Player Sprite */}
      {player.sprite && (
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-b from-blue-900/30 to-purple-900/30 rounded-lg border-2 border-blue-500/50 flex items-center justify-center">
            <img
              src={player.sprite}
              alt="Player"
              className="w-28 h-28 object-contain drop-shadow-lg pixel-art"
            />
          </div>
        </div>
      )}

      {/* Floor and Score */}
      <div className="text-center">
        <h2 className="text-2xl font-bold glow-primary mb-2">Người Chơi</h2>
        <div className="text-sm text-gray-300">Tầng {player.floor}</div>
      </div>

      {/* HP Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-300">HP</span>
          <span className="text-sm font-bold glow-accent">
            {Math.max(0, player.currentHp)} / {player.maxHp}
          </span>
        </div>
        <div className="w-full h-6 bg-gray-800 rounded-full border border-green-500/50 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300"
            style={{
              width: `${Math.max(0, (player.currentHp / player.maxHp) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Score */}
      <div className="bg-gray-800/50 rounded-lg p-3 border border-amber-500/30">
        <div className="text-xs text-gray-400 mb-1">Điểm</div>
        <div className="text-2xl font-bold glow-accent">{player.score}</div>
      </div>

      {/* Relics */}
      <div>
        <div className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
          Vật Phẩm ({relicEntries.length})
        </div>
        <div className="space-y-2">
          {relicEntries.length === 0 ? (
            <div className="text-xs text-gray-500 italic">Chưa có vật phẩm</div>
          ) : (
            relicEntries.map(([relicId, count]) => {
              const relic = RELICS[relicId as keyof typeof RELICS];
              return (
                <div
                  key={relicId}
                  className="bg-gray-800/50 rounded p-2 border border-amber-500/30 hover:border-amber-500/60 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{relic.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="text-xs font-semibold text-amber-400">{relic.name}</div>
                        {count > 1 && <span className="text-xs font-bold text-amber-300">×{count}</span>}
                      </div>
                      <div className="text-xs text-gray-400 line-clamp-2">
                        {relic.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Consecutive Wins */}
      {player.consecutiveWins > 0 && (
        <div className="bg-red-900/30 rounded-lg p-3 border border-red-500/50">
          <div className="text-xs text-gray-400 mb-1">Thắng Liên Tiếp</div>
          <div className="text-2xl font-bold text-red-400">{player.consecutiveWins}</div>
        </div>
      )}
    </div>
  );
}
