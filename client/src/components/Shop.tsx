import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Player, Item } from '@/types/game';
import { SHOP_ITEMS, calculateUpgradeCost } from '@/lib/shop-system';
import { toast } from 'sonner';

interface ShopProps {
  player: Player;
  onBuyItem: (item: Item, price: number) => void;
  onUpgradeItem: (itemId: string) => void;
}

export function Shop({ player, onBuyItem, onUpgradeItem }: ShopProps) {
  const [activeTab, setActiveTab] = useState<'buy' | 'upgrade'>('buy');
  const [selectedType, setSelectedType] = useState<'weapon' | 'armor' | 'accessory'>('weapon');

  const filteredItems = SHOP_ITEMS.filter((shopItem) => shopItem.item.type === selectedType);

  const handleBuy = (item: Item, price: number) => {
    if (player.coin < price) {
      toast.error(`Không đủ coin! Cần ${price}, bạn có ${player.coin}`);
      return;
    }
    onBuyItem(item, price);
    toast.success(`Mua thành công ${item.name}!`);
  };

  const handleUpgrade = (item: Item) => {
    if (item.level >= item.maxLevel) {
      toast.error('Vật phẩm đã đạt cấp độ tối đa!');
      return;
    }
    const upgradeCost = calculateUpgradeCost(item.level);
    if (player.coin < upgradeCost) {
      toast.error(`Không đủ coin! Cần ${upgradeCost}, bạn có ${player.coin}`);
      return;
    }
    onUpgradeItem(item.id);
    toast.success(`Nâng cấp thành công!`);
  };

  return (
    <div className="bg-gray-900/80 rounded-lg p-4 border border-amber-500/50 max-h-96 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold glow-accent mb-2">🏪 CỬA HÀNG</h3>
        <div className="text-sm text-amber-400 font-semibold">💰 Coin: {player.coin}</div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('buy')}
          className={`px-3 py-2 text-xs font-bold uppercase transition-colors ${
            activeTab === 'buy'
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Mua
        </button>
        <button
          onClick={() => setActiveTab('upgrade')}
          className={`px-3 py-2 text-xs font-bold uppercase transition-colors ${
            activeTab === 'upgrade'
              ? 'text-amber-400 border-b-2 border-amber-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Nâng Cấp
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'buy' ? (
          <div className="space-y-3">
            {/* Type Filter */}
            <div className="flex gap-2 mb-3">
              {(['weapon', 'armor', 'accessory'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
                    selectedType === type
                      ? 'bg-amber-500/50 text-amber-100'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  {type === 'weapon' ? '⚔️' : type === 'armor' ? '🛡️' : '💍'}
                </button>
              ))}
            </div>

            {/* Items */}
            {filteredItems.map((shopItem) => (
              <div
                key={shopItem.item.id}
                className="bg-gray-800/50 rounded p-2 border border-gray-700/50 hover:border-amber-500/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <div className="text-xs font-bold text-amber-300">{shopItem.item.name}</div>
                    <div className="text-xs text-gray-500">{shopItem.item.rarity}</div>
                  </div>
                  <div className="text-xs font-bold text-yellow-400">{shopItem.price} 💰</div>
                </div>
                <Button
                  onClick={() => handleBuy(shopItem.item, shopItem.price)}
                  disabled={player.coin < shopItem.price}
                  size="sm"
                  className="w-full h-6 text-xs bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:text-gray-500"
                >
                  Mua
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {/* Upgrade Equipped Items */}
            {[
              { item: player.equippedItems.weapon, label: '⚔️ Vũ Khí' },
              { item: player.equippedItems.armor, label: '🛡️ Áo Giáp' },
              { item: player.equippedItems.accessory, label: '💍 Phụ Kiện' },
            ]
              .filter(({ item }) => item)
              .map(({ item, label }) => {
                const upgradeCost = calculateUpgradeCost(item!.level);
                return (
                  <div
                    key={item!.id}
                    className="bg-gray-800/50 rounded p-2 border border-gray-700/50"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex-1">
                        <div className="text-xs font-bold text-amber-300">{label}</div>
                        <div className="text-xs text-gray-500">
                          Lv.{item!.level} → Lv.{item!.level + 1}
                        </div>
                      </div>
                      <div className="text-xs font-bold text-yellow-400">{upgradeCost} 💰</div>
                    </div>
                    <Button
                      onClick={() => handleUpgrade(item!)}
                      disabled={player.coin < upgradeCost || item!.level >= item!.maxLevel}
                      size="sm"
                      className="w-full h-6 text-xs bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-500"
                    >
                      Nâng Cấp
                    </Button>
                  </div>
                );
              })}
            {!player.equippedItems.weapon &&
              !player.equippedItems.armor &&
              !player.equippedItems.accessory && (
                <div className="text-xs text-gray-500 italic text-center py-4">
                  Chưa có vật phẩm để nâng cấp
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}
