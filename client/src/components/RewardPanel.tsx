import { Player } from '@/types/game';

interface RewardPanelProps {
  player: Player;
  lastReward?: {
    coin: number;
    experience: number;
    relicGained?: string;
  };
}

export function RewardPanel({ player, lastReward }: RewardPanelProps) {
  return (
    <div className="bg-gradient-to-b from-green-900/30 to-emerald-900/30 rounded-lg p-4 border border-green-500/50">
      <h3 className="text-sm font-bold glow-accent mb-3 uppercase tracking-wider">Phần Thưởng</h3>

      {lastReward ? (
        <div className="space-y-2">
          <div className="flex justify-between items-center py-2 px-3 bg-gray-800/30 rounded border border-yellow-500/30">
            <span className="text-xs font-semibold text-gray-400">Coin</span>
            <span className="text-sm font-bold text-yellow-400">+{lastReward.coin} 💰</span>
          </div>

          <div className="flex justify-between items-center py-2 px-3 bg-gray-800/30 rounded border border-blue-500/30">
            <span className="text-xs font-semibold text-gray-400">Experience</span>
            <span className="text-sm font-bold text-blue-400">+{lastReward.experience} ⭐</span>
          </div>

          {lastReward.relicGained && (
            <div className="flex justify-between items-center py-2 px-3 bg-gray-800/30 rounded border border-purple-500/30">
              <span className="text-xs font-semibold text-gray-400">Vật Phẩm</span>
              <span className="text-sm font-bold text-purple-400">{lastReward.relicGained}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="text-xs text-gray-500 italic text-center py-4">
          Chưa có phần thưởng
        </div>
      )}

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-gray-700/50 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Tổng Coin</span>
          <span className="font-bold text-yellow-400">{player.coin}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Tổng Exp</span>
          <span className="font-bold text-blue-400">{player.experience}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Level</span>
          <span className="font-bold text-green-400">{player.level}</span>
        </div>
      </div>
    </div>
  );
}
