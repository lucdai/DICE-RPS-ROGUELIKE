import { Player, CoreStats, DerivedStats } from '@/types/game';
import { calculateEquippedStats, calculateFinalCoreStats, calculateDerivedStats } from '@/lib/item-system';
import { getClassStats } from '@/lib/class-system';

interface StatPanelProps {
  player: Player;
}

export function StatPanel({ player }: StatPanelProps) {
  // Lấy class bonus
  const classStats = getClassStats(player.playerClass as any);
  
  // Tính stats cuối cùng
  const equippedStats = calculateEquippedStats(player.equippedItems);
  const finalCoreStats = calculateFinalCoreStats(player.coreStats, equippedStats);
  const derivedStats = calculateDerivedStats(finalCoreStats);
  
  // Thêm class bonus vào attack
  const totalAttack = finalCoreStats.attack + classStats.attack;

  const StatRow = ({ label, value, color = 'text-gray-300' }: { label: string; value: string | number; color?: string }) => (
    <div className="flex justify-between items-center py-2 px-3 bg-gray-800/30 rounded border border-gray-700/50 hover:border-blue-500/50 transition-colors">
      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
      <span className={`text-sm font-bold ${color}`}>{value}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold glow-primary mb-1">Chỉ Số</h3>
        <div className="text-xs text-gray-400">Level {player.level} • Exp {player.experience}</div>
      </div>

      {/* Coin */}
      <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 rounded-lg p-3 border border-amber-500/50">
        <div className="text-xs text-gray-400 mb-1">COIN</div>
        <div className="text-2xl font-bold text-amber-400">{player.coin}</div>
      </div>

      {/* Core Stats */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Core Stats</div>
        <StatRow label="HP" value={`${Math.max(0, player.currentHp)} / ${finalCoreStats.maxHp}`} color="text-green-400" />
        <StatRow label="Attack" value={`${finalCoreStats.attack} + ${classStats.attack} = ${totalAttack}`} color="text-red-400" />
        <StatRow label="Defense" value={finalCoreStats.defense} color="text-blue-400" />
        <StatRow label="Speed" value={finalCoreStats.speed} color="text-purple-400" />
        <StatRow label="Crit Chance" value={`${(finalCoreStats.critChance * 100).toFixed(1)}%`} color="text-yellow-400" />
        <StatRow label="Crit Damage" value={`${(finalCoreStats.critDamage * 100).toFixed(0)}%`} color="text-orange-400" />
      </div>

      {/* Derived Stats */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Derived Stats</div>
        <StatRow label="DPS" value={derivedStats.dps.toFixed(1)} color="text-red-500" />
        <StatRow label="Damage Reduction" value={`${(derivedStats.damageReduction * 100).toFixed(1)}%`} color="text-blue-500" />
        <StatRow label="Dodge Rate" value={`${(derivedStats.dodgeRate * 100).toFixed(1)}%`} color="text-green-500" />
        <StatRow label="Cooldown Reduction" value={`${(derivedStats.cooldownReduction * 100).toFixed(1)}%`} color="text-purple-500" />
      </div>

      {/* Equipped Items */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">Trang Bị</div>
        {player.equippedItems.weapon ? (
          <div className="bg-gray-800/50 rounded p-2 border border-red-500/30">
            <div className="text-xs font-semibold text-red-400">{player.equippedItems.weapon.name}</div>
            <div className="text-xs text-gray-500">⚔️ Weapon Lv.{player.equippedItems.weapon.level}</div>
          </div>
        ) : (
          <div className="bg-gray-800/30 rounded p-2 border border-gray-700/50 text-xs text-gray-500 italic">Không có vũ khí</div>
        )}
        {player.equippedItems.armor ? (
          <div className="bg-gray-800/50 rounded p-2 border border-blue-500/30">
            <div className="text-xs font-semibold text-blue-400">{player.equippedItems.armor.name}</div>
            <div className="text-xs text-gray-500">🛡️ Armor Lv.{player.equippedItems.armor.level}</div>
          </div>
        ) : (
          <div className="bg-gray-800/30 rounded p-2 border border-gray-700/50 text-xs text-gray-500 italic">Không có áo giáp</div>
        )}
        {player.equippedItems.accessory ? (
          <div className="bg-gray-800/50 rounded p-2 border border-purple-500/30">
            <div className="text-xs font-semibold text-purple-400">{player.equippedItems.accessory.name}</div>
            <div className="text-xs text-gray-500">💍 Accessory Lv.{player.equippedItems.accessory.level}</div>
          </div>
        ) : (
          <div className="bg-gray-800/30 rounded p-2 border border-gray-700/50 text-xs text-gray-500 italic">Không có phụ kiện</div>
        )}
      </div>
    </div>
  );
}
