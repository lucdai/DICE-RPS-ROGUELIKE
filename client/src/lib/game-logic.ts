import { RPSChoice, RelicType, Monster, Player, CombatLog } from '@/types/game';
import { MONSTER_STATS, MONSTER_NAMES, MONSTER_IMAGES, RPS_CHOICES, RELICS, INITIAL_PLAYER_HP, SCORE_PER_MONSTER, SCORE_PER_FLOOR, SCORE_PER_CONSECUTIVE_WIN } from './constants';
import { getClassStats } from './class-system';

// Tung xúc xắc
export function rollDice(numDice: number = 1): number {
  let total = 0;
  for (let i = 0; i < numDice; i++) {
    total += Math.floor(Math.random() * 6) + 1;
  }
  return total;
}

// Chọn RPS ngẫu nhiên cho quái vật
export function getMonsterChoice(): RPSChoice {
  return RPS_CHOICES[Math.floor(Math.random() * RPS_CHOICES.length)];
}

// Xác định kết quả RPS
export function getRPSResult(playerChoice: RPSChoice, monsterChoice: RPSChoice): 'win' | 'draw' | 'lose' {
  if (playerChoice === monsterChoice) return 'draw';
  
  if (playerChoice === 'rock' && monsterChoice === 'scissors') return 'win';
  if (playerChoice === 'paper' && monsterChoice === 'rock') return 'win';
  if (playerChoice === 'scissors' && monsterChoice === 'paper') return 'win';
  
  return 'lose';
}

// Tính sát thương dựa trên kết quả RPS + Class bonus
export function calculateDamage(
  diceRoll: number,
  rpsResult: 'win' | 'draw' | 'lose',
  relics: Record<RelicType, number>,
  playerClass: string = 'warrior'
): number {
  // Lấy class bonus attack
  const classStats = getClassStats(playerClass as any);
  const classAttackBonus = classStats.attack;
  
  // Base damage từ xúc xắc + class attack
  let baseDamage = diceRoll + classAttackBonus;
  let multiplier = 1;
  
  if (rpsResult === 'win') {
    multiplier = 2;
    if ((relics['double-strike'] || 0) > 0) {
      multiplier = 2.5;
    }
    // Critical hit
    if ((relics['critical'] || 0) > 0 && Math.random() < 0.15) {
      multiplier *= 3;
    }
  } else if (rpsResult === 'draw') {
    multiplier = 1;
    if ((relics['precision'] || 0) > 0) {
      multiplier = 1.5;
    }
  } else {
    multiplier = 0.5;
  }
  
  return Math.floor(baseDamage * multiplier);
}

// Tính sát thương quái vật gây (với class defense bonus)
export function calculateMonsterDamage(
  baseDamage: number,
  relics: Record<RelicType, number>,
  playerClass: string = 'warrior'
): number {
  let damage = baseDamage;
  
  // Lấy class defense bonus
  const classStats = getClassStats(playerClass as any);
  const classDefenseBonus = classStats.defense;
  
  // Defense giảm sát thương
  damage = Math.max(1, damage - classDefenseBonus);
  
  // Armor reduces damage
  if ((relics['armor'] || 0) > 0) {
    damage = Math.floor(damage * 0.7);
  }
  
  // Weakness debuff - quái vật gây sát thương giảm 30%
  // (Weakness là debuff cho quái vật, không phải cho người chơi)
  if ((relics['weakness'] || 0) > 0) {
    damage = Math.floor(damage * 0.7);
  }
  
  // Dodge chance
  if ((relics['dodge'] || 0) > 0 && Math.random() < 0.2) {
    damage = 0;
  }
  
  return Math.max(1, damage);
}

// Số lượng xúc xắc dựa trên relic
export function getNumDice(relics: Record<RelicType, number>): number {
  if ((relics['extra-dice'] || 0) > 0) {
    return 2;
  }
  return 1;
}

// Tạo quái vật mới
export function createMonster(floor: number): Monster {
  const stats = MONSTER_STATS[floor as keyof typeof MONSTER_STATS] || MONSTER_STATS[1];
  const nameIndex = (floor - 1) % MONSTER_NAMES.length;
  
  return {
    id: `monster-${Date.now()}`,
    name: MONSTER_NAMES[nameIndex],
    maxHp: stats.hp,
    currentHp: stats.hp,
    damage: stats.damage,
    attack: stats.damage,
    defense: 0,
    speed: 10,
    floor,
    image: MONSTER_IMAGES[nameIndex],
  };
}

// Tạo người chơi
export function createPlayer(): Player {
  const PLAYER_SPRITES = [
    '/images/player-knight.png',
    '/images/player-mage.png',
    '/images/player-archer.png',
    '/images/player-rogue.png',
  ];
  
  const randomSpriteIndex = Math.floor(Math.random() * PLAYER_SPRITES.length);
  
  const emptyRelics: Record<RelicType, number> = {
    'lucky-dice': 0,
    'double-strike': 0,
    'armor': 0,
    'regeneration': 0,
    'precision': 0,
    'reflect': 0,
    'extra-dice': 0,
    'combo': 0,
    'lifesteal': 0,
    'dodge': 0,
    'critical': 0,
    'weakness': 0,
    'poison': 0,
    'stun': 0,
  };
  
  const baseCoreStats = {
    hp: INITIAL_PLAYER_HP,
    maxHp: INITIAL_PLAYER_HP,
    attack: 10,
    defense: 5,
    speed: 10,
    critChance: 0.1,
    critDamage: 1.5,
  };
  
  return {
    maxHp: INITIAL_PLAYER_HP,
    currentHp: INITIAL_PLAYER_HP,
    relics: emptyRelics,
    score: 0,
    floor: 1,
    consecutiveWins: 0,
    sprite: PLAYER_SPRITES[randomSpriteIndex],
    coin: 0,
    level: 1,
    experience: 0,
    coreStats: baseCoreStats,
    equippedItems: {},
    inventory: [],
    playerClass: 'warrior',
    skillCooldown: 0,
  };
}

// Xử lý vòng chiến đấu
export function processCombatRound(
  playerChoice: RPSChoice,
  diceRoll: number,
  player: Player,
  monster: Monster,
  playerClass: string = 'warrior'
): { log: CombatLog; updatedPlayer: Player; updatedMonster: Monster; stunned: boolean } {
  const monsterChoice = getMonsterChoice();
  const rpsResult = getRPSResult(playerChoice, monsterChoice);
  
  // Kiểm tra stun - nếu quái vật bị stun, bỏ lượt
  let isMonsterStunned = false;
  if ((player.relics['stun'] || 0) > 0 && Math.random() < 0.1) {
    isMonsterStunned = true;
  }
  
  // Tính sát thương người chơi gây
  let playerDamage = calculateDamage(diceRoll, rpsResult, player.relics, playerClass);
  
  // Kiểm tra combo
  if (rpsResult === 'win' && player.consecutiveWins >= 1 && (player.relics['combo'] || 0) > 0) {
    playerDamage = Math.floor(playerDamage * 1.5);
  }
  
  // Tính sát thương quái vật gây (nếu không bị stun)
  let monsterDamage = 0;
  if (rpsResult !== 'win' && !isMonsterStunned) {
    monsterDamage = calculateMonsterDamage(monster.damage || 5, player.relics, playerClass);
  }
  
  // Kiểm tra reflect - nếu thua, phản đòn
  if (rpsResult === 'lose' && (player.relics['reflect'] || 0) > 0) {
    playerDamage = Math.floor(monsterDamage * 0.5);
    monsterDamage = Math.floor(monsterDamage * 0.5);
  }
  
  // Cập nhật HP quái vật
  let updatedMonster = { ...monster, currentHp: monster.currentHp - playerDamage };
  
  // Poison debuff - gây sát thương dựa trên attack của quái vật
  if ((player.relics['poison'] || 0) > 0) {
    const poisonDamage = Math.floor((monster.damage || 5) * 0.3);
    updatedMonster = { ...updatedMonster, currentHp: updatedMonster.currentHp - poisonDamage };
  }
  
  // Cập nhật HP người chơi
  let updatedPlayer = { ...player, currentHp: player.currentHp - monsterDamage };
  
  // Regeneration - hồi máu mỗi lượt
  if ((player.relics['regeneration'] || 0) > 0) {
    updatedPlayer = { ...updatedPlayer, currentHp: Math.min(player.maxHp, updatedPlayer.currentHp + 5) };
  }
  
  // Lifesteal - hồi máu khi thắng, dựa trên sát thương thực tế
  if (rpsResult === 'win' && (player.relics['lifesteal'] || 0) > 0) {
    const lifestealed = Math.floor(playerDamage * 0.3);
    updatedPlayer = { ...updatedPlayer, currentHp: Math.min(player.maxHp, updatedPlayer.currentHp + lifestealed) };
  }
  
  // Cập nhật consecutive wins
  if (rpsResult === 'win') {
    updatedPlayer.consecutiveWins += 1;
  } else {
    updatedPlayer.consecutiveWins = 0;
  }
  
  const log: CombatLog = {
    id: `log-${Date.now()}`,
    playerChoice,
    monsterChoice,
    result: rpsResult,
    playerDamage,
    monsterDamage,
    diceRoll,
    timestamp: Date.now(),
  };
  
  return { log, updatedPlayer, updatedMonster, stunned: isMonsterStunned };
}

// Chọn 3 relic ngẫu nhiên
export function selectRandomRelics(currentRelics: Record<RelicType, number>): RelicType[] {
  const availableRelics = Object.keys(RELICS).filter(
    (relic) => (currentRelics[relic as RelicType] || 0) < 3 // Max 3 của mỗi relic
  ) as RelicType[];

  const selected: RelicType[] = [];
  for (let i = 0; i < 3 && availableRelics.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableRelics.length);
    selected.push(availableRelics[randomIndex]);
    availableRelics.splice(randomIndex, 1);
  }
  return selected;
}

// Tính điểm
export function calculateScore(
  consecutiveWins: number,
  floor: number,
  floorBonus: number = 0
): number {
  return (
    SCORE_PER_MONSTER * consecutiveWins +
    SCORE_PER_FLOOR * floor +
    floorBonus
  );
}

export const MAX_FLOORS = 10;
