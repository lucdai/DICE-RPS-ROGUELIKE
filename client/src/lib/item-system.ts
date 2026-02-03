import { Item, ItemStats, ItemType, Rarity, CoreStats, DerivedStats } from '@/types/game';

// Rarity multiplier
const RARITY_MULTIPLIERS: Record<Rarity, number> = {
  common: 1,
  uncommon: 1.2,
  rare: 1.5,
  epic: 2,
  legendary: 2.5,
};

// Tạo vật phẩm mới
export function createItem(
  name: string,
  type: ItemType,
  rarity: Rarity,
  baseStats: ItemStats,
  level: number = 1,
  maxLevel: number = 9999
): Item {
  return {
    id: `item-${Date.now()}-${Math.random()}`,
    name,
    type,
    rarity,
    level,
    maxLevel,
    baseStats,
    effects: [],
  };
}

// Tính stats của vật phẩm dựa trên level
export function calculateItemStats(item: Item): ItemStats {
  const multiplier = RARITY_MULTIPLIERS[item.rarity];
  const levelScaling = 1 + (item.level - 1) * 0.1; // 10% tăng mỗi level

  const scaledStats: ItemStats = {};

  if (item.baseStats.attack !== undefined) {
    scaledStats.attack = Math.floor(item.baseStats.attack * levelScaling * multiplier);
  }
  if (item.baseStats.defense !== undefined) {
    scaledStats.defense = Math.floor(item.baseStats.defense * levelScaling * multiplier);
  }
  if (item.baseStats.speed !== undefined) {
    scaledStats.speed = Math.floor(item.baseStats.speed * levelScaling * multiplier);
  }
  if (item.baseStats.critChance !== undefined) {
    scaledStats.critChance = item.baseStats.critChance * levelScaling * multiplier;
  }
  if (item.baseStats.critDamage !== undefined) {
    scaledStats.critDamage = item.baseStats.critDamage * levelScaling * multiplier;
  }
  if (item.baseStats.hp !== undefined) {
    scaledStats.hp = Math.floor(item.baseStats.hp * levelScaling * multiplier);
  }

  return scaledStats;
}

// Tính tổng stats từ tất cả vật phẩm được equip
export function calculateEquippedStats(equippedItems: {
  weapon?: Item;
  armor?: Item;
  accessory?: Item;
}): ItemStats {
  const totalStats: ItemStats = {};

  const items = [equippedItems.weapon, equippedItems.armor, equippedItems.accessory].filter(
    Boolean
  ) as Item[];

  for (const item of items) {
    const itemStats = calculateItemStats(item);
    totalStats.attack = (totalStats.attack || 0) + (itemStats.attack || 0);
    totalStats.defense = (totalStats.defense || 0) + (itemStats.defense || 0);
    totalStats.speed = (totalStats.speed || 0) + (itemStats.speed || 0);
    totalStats.critChance = (totalStats.critChance || 0) + (itemStats.critChance || 0);
    totalStats.critDamage = (totalStats.critDamage || 0) + (itemStats.critDamage || 0);
    totalStats.hp = (totalStats.hp || 0) + (itemStats.hp || 0);
  }

  return totalStats;
}

// Tính core stats cuối cùng (base + item + buff)
export function calculateFinalCoreStats(
  baseCoreStats: CoreStats,
  equippedStats: ItemStats
): CoreStats {
  return {
    hp: baseCoreStats.hp + (equippedStats.hp || 0),
    maxHp: baseCoreStats.maxHp + (equippedStats.hp || 0),
    attack: baseCoreStats.attack + (equippedStats.attack || 0),
    defense: baseCoreStats.defense + (equippedStats.defense || 0),
    speed: baseCoreStats.speed + (equippedStats.speed || 0),
    critChance: Math.min(1, baseCoreStats.critChance + (equippedStats.critChance || 0)),
    critDamage: baseCoreStats.critDamage + (equippedStats.critDamage || 0),
  };
}

// Tính derived stats
export function calculateDerivedStats(coreStats: CoreStats): DerivedStats {
  return {
    dps: coreStats.attack * (1 + coreStats.critChance * coreStats.critDamage),
    damageReduction: coreStats.defense / (coreStats.defense + 100), // 0-1 ratio
    dodgeRate: 0.05, // Base 5%, có thể tăng từ buff/relic
    cooldownReduction: 0, // Base 0%, có thể tăng từ buff/relic
  };
}

// Nâng cấp vật phẩm
export function upgradeItem(item: Item, cost: number): { success: boolean; newItem?: Item } {
  if (item.level >= item.maxLevel) {
    return { success: false };
  }

  const newItem: Item = {
    ...item,
    level: item.level + 1,
  };

  return { success: true, newItem };
}

// Merge 2 vật phẩm cùng level thành 1 vật phẩm level +1
export function mergeItems(item1: Item, item2: Item): { success: boolean; newItem?: Item } {
  if (
    item1.type !== item2.type ||
    item1.level !== item2.level ||
    item1.rarity !== item2.rarity ||
    item1.level >= item1.maxLevel
  ) {
    return { success: false };
  }

  const mergedItem: Item = {
    ...item1,
    id: `item-${Date.now()}-${Math.random()}`,
    level: item1.level + 1,
  };

  return { success: true, newItem: mergedItem };
}

// Tạo vật phẩm mặc định cho người chơi mới
export function createStarterItems(): {
  weapon: Item;
  armor: Item;
  accessory: Item;
} {
  return {
    weapon: createItem('Iron Sword', 'weapon', 'common', { attack: 5 }),
    armor: createItem('Leather Armor', 'armor', 'common', { defense: 3, hp: 10 }),
    accessory: createItem('Bronze Ring', 'accessory', 'common', { critChance: 0.05 }),
  };
}
