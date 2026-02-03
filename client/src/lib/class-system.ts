import { nanoid } from 'nanoid';

export type PlayerClass = 'warrior' | 'mage' | 'archer' | 'rogue';

export interface ClassStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
  critChance: number;
  critDamage: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  cooldown: number; // số lượt
  effect: (damage: number) => number;
}

export const CLASS_DEFINITIONS: Record<PlayerClass, { name: string; description: string; stats: ClassStats; skill: Skill }> = {
  warrior: {
    name: 'Chiến Binh',
    description: 'Sức mạnh và bảo vệ',
    stats: {
      hp: 150,
      attack: 12,
      defense: 8,
      speed: 8,
      critChance: 5,
      critDamage: 1.2,
    },
    skill: {
      id: nanoid(),
      name: 'Đòn Chí Mạng',
      description: 'Gây 2x sát thương, cooldown 3 lượt',
      cooldown: 3,
      effect: (damage: number) => damage * 2,
    },
  },
  mage: {
    name: 'Pháp Sư',
    description: 'Phép thuật và sát thương cao',
    stats: {
      hp: 100,
      attack: 15,
      defense: 4,
      speed: 12,
      critChance: 10,
      critDamage: 1.5,
    },
    skill: {
      id: nanoid(),
      name: 'Bão Lửa',
      description: 'Gây 3x sát thương, cooldown 4 lượt',
      cooldown: 4,
      effect: (damage: number) => damage * 3,
    },
  },
  archer: {
    name: 'Thợ Săn',
    description: 'Tốc độ và chính xác',
    stats: {
      hp: 110,
      attack: 13,
      defense: 5,
      speed: 14,
      critChance: 15,
      critDamage: 1.3,
    },
    skill: {
      id: nanoid(),
      name: 'Mũi Tên Xuyên Thủng',
      description: 'Gây 1.8x sát thương, bỏ qua 50% defense, cooldown 2 lượt',
      cooldown: 2,
      effect: (damage: number) => damage * 1.8,
    },
  },
  rogue: {
    name: 'Kẻ Lén Lút',
    description: 'Tấn công nhanh và né tránh',
    stats: {
      hp: 105,
      attack: 14,
      defense: 6,
      speed: 15,
      critChance: 20,
      critDamage: 1.4,
    },
    skill: {
      id: nanoid(),
      name: 'Tấn Công Bất Ngờ',
      description: 'Gây 2.5x sát thương, cooldown 2 lượt',
      cooldown: 2,
      effect: (damage: number) => damage * 2.5,
    },
  },
};

export function getClassStats(playerClass: PlayerClass): ClassStats {
  return CLASS_DEFINITIONS[playerClass].stats;
}

export function getClassSkill(playerClass: PlayerClass): Skill {
  return CLASS_DEFINITIONS[playerClass].skill;
}

export function getClassName(playerClass: PlayerClass): string {
  return CLASS_DEFINITIONS[playerClass].name;
}

export function getClassDescription(playerClass: PlayerClass): string {
  return CLASS_DEFINITIONS[playerClass].description;
}
