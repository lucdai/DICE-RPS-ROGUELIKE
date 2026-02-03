// Game Types and Interfaces

export type RPSChoice = 'rock' | 'paper' | 'scissors';
export type GameState = 'home' | 'combat' | 'relic-selection' | 'game-over';
export type RelicType = 
  | 'lucky-dice' 
  | 'double-strike' 
  | 'armor' 
  | 'regeneration' 
  | 'precision' 
  | 'reflect' 
  | 'extra-dice' 
  | 'combo'
  | 'lifesteal'
  | 'dodge'
  | 'critical'
  | 'weakness'
  | 'poison'
  | 'stun';

export interface Relic {
  id: RelicType;
  name: string;
  description: string;
  icon: string;
}

export interface Monster {
  id: string;
  name: string;
  maxHp: number;
  currentHp: number;
  damage: number;
  floor: number;
  image: string;
}

export type ItemType = 'weapon' | 'armor' | 'accessory' | 'relic' | 'consumable' | 'support';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface ItemStats {
  attack?: number;
  defense?: number;
  speed?: number;
  critChance?: number;
  critDamage?: number;
  hp?: number;
}

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  rarity: Rarity;
  level: number;
  maxLevel: number;
  baseStats: ItemStats;
  effects?: string[];
}

export interface CoreStats {
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  critChance: number;
  critDamage: number;
}

export interface DerivedStats {
  dps: number;
  damageReduction: number;
  dodgeRate: number;
  cooldownReduction: number;
}

export interface Player {
  maxHp: number;
  currentHp: number;
  relics: Record<RelicType, number>;
  score: number;
  floor: number;
  consecutiveWins: number;
  sprite?: string;
  coin: number;
  level: number;
  experience: number;
  coreStats: CoreStats;
  equippedItems: {
    weapon?: Item;
    armor?: Item;
    accessory?: Item;
  };
  inventory: Item[];
}

export interface CombatLog {
  id: string;
  playerChoice: RPSChoice;
  monsterChoice: RPSChoice;
  result: 'win' | 'draw' | 'lose';
  playerDamage: number;
  monsterDamage: number;
  diceRoll: number;
  timestamp: number;
}

export interface GameSession {
  player: Player;
  monster: Monster;
  gameState: GameState;
  combatLogs: CombatLog[];
  selectedRelics: RelicType[];
  highScore: number;
}
