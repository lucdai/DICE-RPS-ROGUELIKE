import { Item, ItemStats, Rarity } from '@/types/game';
import { createItem } from './item-system';

export interface ShopItem {
  item: Item;
  price: number;
}

// Danh sách vật phẩm bán trong cửa hàng
export const SHOP_ITEMS: ShopItem[] = [
  // Weapons
  {
    item: createItem('Iron Sword', 'weapon', 'common', { attack: 5 }),
    price: 50,
  },
  {
    item: createItem('Steel Blade', 'weapon', 'uncommon', { attack: 8 }),
    price: 150,
  },
  {
    item: createItem('Enchanted Sword', 'weapon', 'rare', { attack: 12, critChance: 0.05 }),
    price: 500,
  },
  {
    item: createItem('Legendary Blade', 'weapon', 'epic', { attack: 18, critChance: 0.1, critDamage: 1.5 }),
    price: 2000,
  },

  // Armor
  {
    item: createItem('Leather Armor', 'armor', 'common', { defense: 3, hp: 10 }),
    price: 50,
  },
  {
    item: createItem('Iron Armor', 'armor', 'uncommon', { defense: 6, hp: 20 }),
    price: 150,
  },
  {
    item: createItem('Steel Plate', 'armor', 'rare', { defense: 10, hp: 35 }),
    price: 500,
  },
  {
    item: createItem('Mythril Armor', 'armor', 'epic', { defense: 15, hp: 60 }),
    price: 2000,
  },

  // Accessories
  {
    item: createItem('Bronze Ring', 'accessory', 'common', { critChance: 0.05 }),
    price: 30,
  },
  {
    item: createItem('Silver Ring', 'accessory', 'uncommon', { critChance: 0.1, speed: 2 }),
    price: 100,
  },
  {
    item: createItem('Gold Ring', 'accessory', 'rare', { critChance: 0.15, speed: 5, attack: 3 }),
    price: 400,
  },
  {
    item: createItem('Diamond Ring', 'accessory', 'epic', { critChance: 0.2, speed: 8, attack: 6, defense: 3 }),
    price: 1500,
  },
];

// Tính chi phí nâng cấp vật phẩm
export function calculateUpgradeCost(currentLevel: number): number {
  // Chi phí tăng theo cấp số nhân: 100 * (1.2 ^ level)
  return Math.floor(100 * Math.pow(1.2, currentLevel));
}

// Tính chi phí merge 2 vật phẩm
export function calculateMergeCost(level: number): number {
  // Chi phí merge = 50 * level
  return 50 * level;
}

// Lấy vật phẩm ngẫu nhiên từ cửa hàng
export function getRandomShopItem(): ShopItem {
  return SHOP_ITEMS[Math.floor(Math.random() * SHOP_ITEMS.length)];
}

// Lấy vật phẩm từ cửa hàng theo loại
export function getShopItemsByType(type: 'weapon' | 'armor' | 'accessory'): ShopItem[] {
  return SHOP_ITEMS.filter((shopItem) => shopItem.item.type === type);
}

// Lấy vật phẩm từ cửa hàng theo rarity
export function getShopItemsByRarity(rarity: Rarity): ShopItem[] {
  return SHOP_ITEMS.filter((shopItem) => shopItem.item.rarity === rarity);
}
