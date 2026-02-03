import { useState, useCallback } from 'react';
import { GameSession, GameState, Monster, Player, RelicType, RPSChoice, Item, PlayerClass } from '@/types/game';
import {
  createPlayer,
  createMonster,
  processCombatRound,
  selectRandomRelics,
  getNumDice,
  rollDice,
  calculateScore,
} from '@/lib/game-logic';
import { upgradeItem as upgradeItemLogic, mergeItems } from '@/lib/item-system';
import { calculateUpgradeCost, calculateMergeCost } from '@/lib/shop-system';
import { toast } from 'sonner';
import { MAX_FLOORS } from '@/lib/constants';

export function useGameState() {
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved) : 0;
  });

  const selectPlayerClass = useCallback((playerClass: PlayerClass) => {
    const player = createPlayer();
    player.playerClass = playerClass;
    const monster = createMonster(1);
    
    setGameSession({
      player,
      monster,
      gameState: 'combat',
      combatLogs: [],
      selectedRelics: [],
      highScore,
    });
  }, [highScore]);

  const startGame = useCallback(() => {
    // Chuyển đến class selection screen
    setGameSession({
      player: createPlayer(),
      monster: createMonster(1),
      gameState: 'class-selection' as any,
      combatLogs: [],
      selectedRelics: [],
      highScore,
    });
  }, [highScore]);

  const handleCombatRound = useCallback((playerChoice: RPSChoice) => {
    if (!gameSession || gameSession.gameState !== 'combat') return;

    const numDice = getNumDice(gameSession.player.relics);
    const diceRoll = rollDice(numDice);

    const { log, updatedPlayer, updatedMonster, stunned } = processCombatRound(
      playerChoice,
      diceRoll,
      gameSession.player,
      gameSession.monster,
      gameSession.player.playerClass
    );

    let newGameState: GameState = 'combat';
    let newPlayer = updatedPlayer;
    let newMonster = updatedMonster;

    if (newMonster.currentHp <= 0) {
      newPlayer.score += 10;
      
      // Cộng phần thưởng khi tiêu diệt quái vật
      const rewardCoin = 50 + (newPlayer.floor * 10);
      const rewardExp = 25 + (newPlayer.floor * 5);
      newPlayer.coin += rewardCoin;
      newPlayer.experience += rewardExp;
      newPlayer.level = Math.floor(newPlayer.experience / 100) + 1;
      
      if (newPlayer.floor >= MAX_FLOORS) {
        newGameState = 'game-over';
        newPlayer.score += 50;
      } else {
        newGameState = 'relic-selection';
      }
    } else if (newPlayer.currentHp <= 0) {
      newGameState = 'game-over';
    }

    setGameSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        player: newPlayer,
        monster: newMonster,
        gameState: newGameState,
        combatLogs: [...prev.combatLogs, log],
      };
    });
  }, [gameSession]);

  const selectRelic = useCallback((relic: RelicType) => {
    if (!gameSession || gameSession.gameState !== 'relic-selection') return;

    const newRelics = { ...gameSession.player.relics };
    newRelics[relic] = (newRelics[relic] || 0) + 1;

    const newPlayer = {
      ...gameSession.player,
      relics: newRelics,
      floor: gameSession.player.floor + 1,
    };

    const newMonster = createMonster(newPlayer.floor);

    setGameSession((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        player: newPlayer,
        monster: newMonster,
        gameState: 'combat',
        selectedRelics: [],
      };
    });
  }, [gameSession]);

  const buyItem = useCallback((item: Item, price: number) => {
    if (!gameSession) return;

    const newPlayer = { ...gameSession.player };
    
    if (newPlayer.coin < price) return;

    newPlayer.coin -= price;
    newPlayer.inventory.push(item);

    if (!newPlayer.equippedItems.weapon && item.type === 'weapon') {
      newPlayer.equippedItems.weapon = item;
    } else if (!newPlayer.equippedItems.armor && item.type === 'armor') {
      newPlayer.equippedItems.armor = item;
    } else if (!newPlayer.equippedItems.accessory && item.type === 'accessory') {
      newPlayer.equippedItems.accessory = item;
    }

    setGameSession((prev) => {
      if (!prev) return null;
      return { ...prev, player: newPlayer };
    });
  }, [gameSession]);

  const upgradeItem = useCallback((itemId: string) => {
    if (!gameSession) return;

    const newPlayer = { ...gameSession.player };
    
    let itemToUpgrade: Item | null = null;
    let itemLocation: 'weapon' | 'armor' | 'accessory' | null = null;

    if (newPlayer.equippedItems.weapon?.id === itemId) {
      itemToUpgrade = newPlayer.equippedItems.weapon;
      itemLocation = 'weapon';
    } else if (newPlayer.equippedItems.armor?.id === itemId) {
      itemToUpgrade = newPlayer.equippedItems.armor;
      itemLocation = 'armor';
    } else if (newPlayer.equippedItems.accessory?.id === itemId) {
      itemToUpgrade = newPlayer.equippedItems.accessory;
      itemLocation = 'accessory';
    }

    if (!itemToUpgrade) return;
    
    const upgradeCost = calculateUpgradeCost(itemToUpgrade.level);

    if (newPlayer.coin < upgradeCost) return;

    if (!itemLocation) return;

    const result = upgradeItemLogic(itemToUpgrade, upgradeCost);
    if (!result.success || !result.newItem) return;

    newPlayer.coin -= upgradeCost;

    if (itemLocation === 'weapon') {
      newPlayer.equippedItems.weapon = result.newItem;
    } else if (itemLocation === 'armor') {
      newPlayer.equippedItems.armor = result.newItem;
    } else if (itemLocation === 'accessory') {
      newPlayer.equippedItems.accessory = result.newItem;
    }

    setGameSession((prev) => {
      if (!prev) return null;
      return { ...prev, player: newPlayer };
    });
  }, [gameSession]);

  const claimReward = useCallback((coin: number, experience: number) => {
    if (!gameSession) return;

    const newPlayer = { ...gameSession.player };
    newPlayer.coin += coin;
    newPlayer.experience += experience;
    newPlayer.level = Math.floor(newPlayer.experience / 100) + 1;

    setGameSession((prev) => {
      if (!prev) return null;
      return { ...prev, player: newPlayer };
    });
  }, [gameSession]);

  const equipItem = useCallback((item: Item, slot: 'weapon' | 'armor' | 'accessory') => {
    if (!gameSession) return;

    const newPlayer = { ...gameSession.player };
    
    // Xoa vat pham khoi inventory
    newPlayer.inventory = newPlayer.inventory.filter((invItem) => invItem.id !== item.id);
    
    // Trang bi vat pham
    newPlayer.equippedItems[slot] = item;

    setGameSession((prev) => {
      if (!prev) return null;
      return { ...prev, player: newPlayer };
    });
  }, [gameSession]);

  const unequipItem = useCallback((slot: 'weapon' | 'armor' | 'accessory') => {
    if (!gameSession) return;

    const newPlayer = { ...gameSession.player };
    const unequippedItem = newPlayer.equippedItems[slot];

    if (unequippedItem) {
      newPlayer.equippedItems[slot] = null as any;
      newPlayer.inventory.push(unequippedItem);
    }

    setGameSession((prev) => {
      if (!prev) return null;
      return { ...prev, player: newPlayer };
    });
  }, [gameSession]);

  const mergeItemsHandler = useCallback((item1Id: string, item2Id: string) => {
    if (!gameSession) return;

    const newPlayer = { ...gameSession.player };
    const item1Index = newPlayer.inventory.findIndex((item) => item.id === item1Id);
    const item2Index = newPlayer.inventory.findIndex((item) => item.id === item2Id);

    if (item1Index === -1 || item2Index === -1) return;

    const item1 = newPlayer.inventory[item1Index];
    const item2 = newPlayer.inventory[item2Index];

    const result = mergeItems(item1, item2);
    if (!result.success || !result.newItem) return;
    const mergedItem = result.newItem;

    // Xoa 2 vat pham cu
    newPlayer.inventory.splice(Math.max(item1Index, item2Index), 1);
    newPlayer.inventory.splice(Math.min(item1Index, item2Index), 1);

    // Tru chi phi merge
    const mergeCost = calculateMergeCost(item1.level);
    newPlayer.coin -= mergeCost;

    // Them vat pham merge moi
    newPlayer.inventory.push(mergedItem);

    toast.success(`Merge thanh cong! Chi phi: ${mergeCost} coin`);

    setGameSession((prev) => {
      if (!prev) return null;
      return { ...prev, player: newPlayer };
    });
  }, [gameSession]);

  const endGame = useCallback(() => {
    if (!gameSession) return;

    const finalScore = gameSession.player.score;
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('highScore', finalScore.toString());
    }

    setGameSession(null);
  }, [gameSession, highScore]);

  const goHome = useCallback(() => {
    setGameSession(null);
  }, []);

  return {
    gameSession,
    highScore,
    startGame,
    selectPlayerClass,
    handleCombatRound,
    selectRelic,
    endGame,
    goHome,
    buyItem,
    upgradeItem,
    claimReward,
    equipItem,
    unequipItem,
    mergeItemsHandler,
  };
}
