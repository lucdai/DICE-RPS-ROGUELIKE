import { Relic, RelicType } from '@/types/game';

export const INITIAL_PLAYER_HP = 100;
export const MAX_FLOORS = 10;
export const BOSS_FLOOR = 10;

export const RELICS: Record<RelicType, Relic> = {
  'lucky-dice': {
    id: 'lucky-dice',
    name: 'Lucky Dice',
    description: 'Được tái tung xúc xắc 1 lần mỗi vòng',
    icon: '🎲',
  },
  'double-strike': {
    id: 'double-strike',
    name: 'Double Strike',
    description: 'Sát thương thắng × 2.5 thay vì × 2',
    icon: '⚡',
  },
  'armor': {
    id: 'armor',
    name: 'Armor',
    description: 'Giảm sát thương nhận được 30%',
    icon: '🛡️',
  },
  'regeneration': {
    id: 'regeneration',
    name: 'Regeneration',
    description: 'Hồi 5 HP mỗi lượt chiến đấu',
    icon: '💚',
  },
  'precision': {
    id: 'precision',
    name: 'Precision',
    description: 'Sát thương hòa × 1.5 thay vì × 1',
    icon: '🎯',
  },
  'reflect': {
    id: 'reflect',
    name: 'Reflect',
    description: 'Phản xạ 50% sát thương nhận được',
    icon: '🔄',
  },
  'extra-dice': {
    id: 'extra-dice',
    name: 'Extra Dice',
    description: 'Tung 2 xúc xắc thay vì 1 (cộng kết quả)',
    icon: '🎲🎲',
  },
  'combo': {
    id: 'combo',
    name: 'Combo',
    description: 'Nếu thắng 2 lần liên tiếp, sát thương × 1.5',
    icon: '🔥',
  },
  'lifesteal': {
    id: 'lifesteal',
    name: 'Lifesteal',
    description: 'Hồi 30% sát thương gây ra khi thắng',
    icon: '🩸',
  },
  'dodge': {
    id: 'dodge',
    name: 'Dodge',
    description: '20% cơ hội né tránh sát thương',
    icon: '💨',
  },
  'critical': {
    id: 'critical',
    name: 'Critical',
    description: '15% cơ hội gây sát thương × 3',
    icon: '⚔️',
  },
  'weakness': {
    id: 'weakness',
    name: 'Weakness',
    description: 'Quái vật gây sát thương -2 (debuff)',
    icon: '📉',
  },
  'poison': {
    id: 'poison',
    name: 'Poison',
    description: 'Quái vật bị 3 sát thương mỗi lượt (debuff)',
    icon: '☠️',
  },
  'stun': {
    id: 'stun',
    name: 'Stun',
    description: '10% cơ hội quái vật bỏ lượt (debuff)',
    icon: '⭐',
  },
};

export const MONSTER_STATS = {
  1: { hp: 15, damage: 5 },
  2: { hp: 18, damage: 6 },
  3: { hp: 20, damage: 7 },
  4: { hp: 25, damage: 10 },
  5: { hp: 30, damage: 11 },
  6: { hp: 35, damage: 12 },
  7: { hp: 40, damage: 15 },
  8: { hp: 45, damage: 17 },
  9: { hp: 50, damage: 20 },
  10: { hp: 100, damage: 25 }, // Boss
};

export const MONSTER_NAMES = [
  'Goblin',
  'Orc',
  'Skeleton',
  'Zombie',
  'Troll',
  'Wraith',
  'Demon',
  'Dragon',
  'Shadow Beast',
  'Ancient Evil',
];

export const MONSTER_IMAGES = [
  '/images/monster-goblin.png',
  '/images/monster-orc.png',
  '/images/monster-skeleton.png',
  '/images/monster-goblin.png',
  '/images/monster-dragon.png',
  '/images/monster-demon.png',
  '/images/monster-orc.png',
  '/images/monster-skeleton.png',
  '/images/monster-demon.png',
  '/images/monster-dragon.png',
];

export const RPS_CHOICES = ['rock', 'paper', 'scissors'] as const;

export const RPS_EMOJIS = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
};

export const RPS_LABELS = {
  rock: 'Đá',
  paper: 'Giấy',
  scissors: 'Kéo',
};

// Scoring
export const SCORE_PER_MONSTER = 10;
export const SCORE_PER_FLOOR = 50;
export const SCORE_PER_CONSECUTIVE_WIN = 5;
