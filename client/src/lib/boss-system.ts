import { Monster } from '@/types/game';
import { nanoid } from 'nanoid';

export type BossType = 'dragon' | 'demonKing';

export interface BossAbility {
  name: string;
  description: string;
  effect: (damage: number) => number;
  triggerChance: number; // 0-100
}

export const BOSS_DEFINITIONS: Record<BossType, { name: string; abilities: BossAbility[]; statMultiplier: number }> = {
  dragon: {
    name: '🐉 Rồng Cổ Đại',
    statMultiplier: 3,
    abilities: [
      {
        name: 'Lửa Thần',
        description: 'Gây 2x sát thương cho tất cả',
        effect: (damage: number) => damage * 2,
        triggerChance: 30,
      },
      {
        name: 'Cánh Quét',
        description: 'Gây 1.5x sát thương, 40% cơ hội stun',
        effect: (damage: number) => damage * 1.5,
        triggerChance: 40,
      },
      {
        name: 'Hồi Phục',
        description: 'Hồi 30% HP',
        effect: (damage: number) => -damage * 0.3, // âm = hồi máu
        triggerChance: 25,
      },
    ],
  },
  demonKing: {
    name: '👿 Vua Quỷ',
    statMultiplier: 3.5,
    abilities: [
      {
        name: 'Lời Nguyền Tối Tăm',
        description: 'Gây 2.5x sát thương, debuff -30% attack',
        effect: (damage: number) => damage * 2.5,
        triggerChance: 35,
      },
      {
        name: 'Tấn Công Liên Tiếp',
        description: 'Tấn công 2 lần với 1.2x sát thương mỗi lần',
        effect: (damage: number) => damage * 1.2 * 2,
        triggerChance: 40,
      },
      {
        name: 'Hồi Phục Bóng Tối',
        description: 'Hồi 40% HP',
        effect: (damage: number) => -damage * 0.4,
        triggerChance: 30,
      },
      {
        name: 'Stun Tuyệt Đối',
        description: 'Stun người chơi 1 lượt, 20% cơ hội',
        effect: (damage: number) => 0,
        triggerChance: 20,
      },
    ],
  },
};

export function isBossFight(floor: number): boolean {
  return floor === 5 || floor === 10;
}

export function getBossType(floor: number): BossType {
  if (floor === 5) return 'dragon';
  if (floor === 10) return 'demonKing';
  throw new Error('Invalid boss floor');
}

export function createBoss(floor: number): Monster {
  const bossType = getBossType(floor);
  const bossDef = BOSS_DEFINITIONS[bossType];
  
  const baseStats = {
    hp: 50,
    attack: 15,
    defense: 8,
    speed: 12,
  };

  const multiplier = bossDef.statMultiplier;

  return {
    id: nanoid(),
    name: bossDef.name,
    floor,
    maxHp: Math.floor(baseStats.hp * multiplier),
    currentHp: Math.floor(baseStats.hp * multiplier),
    attack: Math.floor(baseStats.attack * multiplier),
    defense: Math.floor(baseStats.defense * multiplier),
    speed: Math.floor(baseStats.speed * multiplier),
    isBoss: true,
    abilities: bossDef.abilities,
  };
}

export function triggerBossAbility(boss: Monster): BossAbility | null {
  if (!boss.abilities || boss.abilities.length === 0) return null;

  const randomAbility = boss.abilities[Math.floor(Math.random() * boss.abilities.length)];
  const shouldTrigger = Math.random() * 100 < randomAbility.triggerChance;

  return shouldTrigger ? randomAbility : null;
}
