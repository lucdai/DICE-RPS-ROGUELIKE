import { createContext, useContext, ReactNode } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { GameSession, RelicType, RPSChoice, Item, PlayerClass } from '@/types/game';

interface GameContextType {
  gameSession: GameSession | null;
  highScore: number;
  startGame: () => void;
  selectPlayerClass: (playerClass: PlayerClass) => void;
  handleCombatRound: (playerChoice: RPSChoice) => void;
  selectRelic: (relic: RelicType) => void;
  endGame: () => void;
  goHome: () => void;
  buyItem: (item: Item, price: number) => void;
  upgradeItem: (itemId: string) => void;
  claimReward: (coin: number, experience: number) => void;
  equipItem: (item: Item, slot: 'weapon' | 'armor' | 'accessory') => void;
  unequipItem: (slot: 'weapon' | 'armor' | 'accessory') => void;
  mergeItemsHandler: (item1Id: string, item2Id: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const gameState = useGameState();

  return (
    <GameContext.Provider value={gameState}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
