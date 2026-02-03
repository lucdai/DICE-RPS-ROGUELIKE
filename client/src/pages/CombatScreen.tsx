import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import { Dice } from '@/components/Dice';
import { Monster } from '@/components/Monster';
import { PlayerStats } from '@/components/PlayerStats';
import { StatPanel } from '@/components/StatPanel';
import { Shop } from '@/components/Shop';
import { RewardPanel } from '@/components/RewardPanel';
import { Inventory } from '@/components/Inventory';
import { RPSButtons } from '@/components/RPSButtons';
import { RPSChoice } from '@/types/game';
import { getNumDice, rollDice } from '@/lib/game-logic';
import { toast } from 'sonner';

export default function CombatScreen() {
  const { gameSession, handleCombatRound, goHome, buyItem, upgradeItem, equipItem, unequipItem, mergeItemsHandler } = useGame();
  const [isRolling, setIsRolling] = useState(false);
  const [diceValue, setDiceValue] = useState(1);
  const [isWaitingForRPS, setIsWaitingForRPS] = useState(false);

  if (!gameSession) return null;

  const { player, monster, combatLogs } = gameSession;
  const lastLog = combatLogs.length > 0 ? combatLogs[combatLogs.length - 1] : null;

  const handleRollDice = () => {
    if (isRolling || isWaitingForRPS) return;

    setIsRolling(true);
    const numDice = getNumDice(player.relics);
    
    setTimeout(() => {
      const value = rollDice(numDice);
      setDiceValue(value);
      setIsRolling(false);
      setIsWaitingForRPS(true);
    }, 500);
  };

  const handleRPSSelect = (choice: RPSChoice) => {
    if (!isWaitingForRPS) return;

    const prevLogCount = combatLogs.length;
    handleCombatRound(choice);
    setIsWaitingForRPS(false);
    setDiceValue(1);

    // Show toast notification after a short delay
    setTimeout(() => {
      // Get the newly added log
      if (gameSession && gameSession.combatLogs.length > prevLogCount) {
        const newLog = gameSession.combatLogs[gameSession.combatLogs.length - 1];
        
        let resultEmoji = '';
        let resultWord = '';
        
        if (newLog.result === 'win') {
          resultEmoji = '🎉';
          resultWord = 'THẮNG';
        } else if (newLog.result === 'draw') {
          resultEmoji = '➖';
          resultWord = 'HÒA';
        } else {
          resultEmoji = '💥';
          resultWord = 'THUA';
        }
        
        const resultText = `${resultEmoji} ${resultWord} | Xúc xắc: ${newLog.diceRoll} | Sát thương: ${newLog.playerDamage} | Quái vật: -${newLog.playerDamage} HP | Bạn: -${newLog.monsterDamage} HP`;
        
        toast(resultText, {
          duration: 3000,
          position: 'top-center',
        });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-center flex-1">
          <h1 className="text-3xl md:text-4xl font-black glow-primary" style={{ fontFamily: 'Orbitron' }}>
            CHIẾN ĐẤU
          </h1>
        </div>
        <Button
          onClick={goHome}
          variant="outline"
          className="border-red-500/50 text-red-400 hover:bg-red-500/20"
        >
          Thoát
        </Button>
      </div>

      {/* Main Combat Area */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Left Panel: Player Stats + Stat Panel + Shop */}
        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="bg-gray-800/30 rounded-lg p-4 border border-amber-500/30">
            <PlayerStats player={player} />
          </div>
          <div className="bg-gray-800/30 rounded-lg p-4 border border-purple-500/30">
            <StatPanel player={player} />
          </div>
          <Shop 
            player={player} 
            onBuyItem={buyItem} 
            onUpgradeItem={upgradeItem}
          />
          <RewardPanel player={player} />
          <Inventory 
            player={player} 
            onEquipItem={equipItem} 
            onUnequipItem={unequipItem}
            onMergeItems={mergeItemsHandler}
          />
        </div>

        {/* Combat Center */}
        <div className="md:col-span-2 flex flex-col items-center justify-between gap-6">
          {/* Monster */}
          <div className="w-full">
            <Monster
              monster={monster}
              isDamaged={lastLog ? lastLog.playerDamage > 0 : false}
            />
          </div>

          {/* Dice */}
          <div className="flex flex-col items-center gap-4 w-full">
            <Dice value={diceValue} isRolling={isRolling} />
            <Button
              onClick={handleRollDice}
              disabled={isRolling || isWaitingForRPS}
              className="w-full py-3 font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-lg transition-all duration-200"
            >
              {isRolling ? 'ĐANG TUNG...' : isWaitingForRPS ? 'CHỌN KÉO BÚA BAO' : 'TUNG XÚC XẮC'}
            </Button>
          </div>

          {/* RPS Buttons */}
          {isWaitingForRPS && (
            <div className="w-full">
              <RPSButtons onSelect={handleRPSSelect} disabled={false} />
            </div>
          )}
        </div>

        {/* Right Panel: Empty for balance */}
        <div className="hidden md:block bg-gray-800/30 rounded-lg p-4 border border-gray-700/30" />
      </div>

      {/* Bottom Info */}
      <div className="text-center text-xs text-gray-500">
        <p>Tiêu diệt quái vật để tiến tới tầng tiếp theo</p>
      </div>
    </div>
  );
}
