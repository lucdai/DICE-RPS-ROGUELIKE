import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Player, Item } from '@/types/game';
import { toast } from 'sonner';

interface InventoryProps {
  player: Player;
  onEquipItem: (item: Item, slot: 'weapon' | 'armor' | 'accessory') => void;
  onUnequipItem: (slot: 'weapon' | 'armor' | 'accessory') => void;
  onMergeItems: (item1Id: string, item2Id: string) => void;
}

export function Inventory({ player, onEquipItem, onUnequipItem, onMergeItems }: InventoryProps) {
  const [activeTab, setActiveTab] = useState<'inventory' | 'merge'>('inventory');
  const [selectedForMerge, setSelectedForMerge] = useState<string[]>([]);

  const handleEquip = (item: Item) => {
    const slot = item.type as 'weapon' | 'armor' | 'accessory';
    
    // Nếu slot đã có vật phẩm, unequip trước
    if (player.equippedItems[slot]) {
      onUnequipItem(slot);
    }
    
    onEquipItem(item, slot);
    toast.success(`Trang bị ${item.name}!`);
  };

  const handleUnequip = (slot: 'weapon' | 'armor' | 'accessory') => {
    onUnequipItem(slot);
    toast.success('Tháo trang bị thành công!');
  };

  const handleSelectForMerge = (itemId: string) => {
    if (selectedForMerge.includes(itemId)) {
      setSelectedForMerge(selectedForMerge.filter((id) => id !== itemId));
    } else if (selectedForMerge.length < 2) {
      setSelectedForMerge([...selectedForMerge, itemId]);
    } else {
      toast.error('Chỉ có thể chọn 2 vật phẩm để merge!');
    }
  };

  const handleMerge = () => {
    if (selectedForMerge.length !== 2) {
      toast.error('Vui lòng chọn 2 vật phẩm để merge!');
      return;
    }

    const item1 = player.inventory.find((item) => item.id === selectedForMerge[0]);
    const item2 = player.inventory.find((item) => item.id === selectedForMerge[1]);

    if (!item1 || !item2) {
      toast.error('Vật phẩm không tìm thấy!');
      return;
    }

    if (item1.type !== item2.type || item1.level !== item2.level || item1.rarity !== item2.rarity) {
      toast.error('Chỉ có thể merge vật phẩm cùng loại, cấp độ và rarity!');
      return;
    }

    onMergeItems(selectedForMerge[0], selectedForMerge[1]);
    setSelectedForMerge([]);
    toast.success('Merge thành công!');
  };

  return (
    <div className="bg-gray-900/80 rounded-lg p-4 border border-purple-500/50 max-h-96 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-bold glow-accent mb-2">🎒 KHO ĐỒ</h3>
        <div className="text-sm text-purple-400 font-semibold">
          {player.inventory.length} / 20 vật phẩm
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-700">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-3 py-2 text-xs font-bold uppercase transition-colors ${
            activeTab === 'inventory'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Kho
        </button>
        <button
          onClick={() => setActiveTab('merge')}
          className={`px-3 py-2 text-xs font-bold uppercase transition-colors ${
            activeTab === 'merge'
              ? 'text-purple-400 border-b-2 border-purple-400'
              : 'text-gray-400 hover:text-gray-300'
          }`}
        >
          Merge
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'inventory' ? (
          <div className="space-y-2">
            {/* Equipped Items */}
            <div className="mb-3">
              <div className="text-xs font-semibold text-gray-400 mb-2 uppercase">Trang Bị</div>
              {[
                { item: player.equippedItems.weapon, label: '⚔️ Vũ Khí', slot: 'weapon' as const },
                { item: player.equippedItems.armor, label: '🛡️ Áo Giáp', slot: 'armor' as const },
                { item: player.equippedItems.accessory, label: '💍 Phụ Kiện', slot: 'accessory' as const },
              ].map(({ item, label, slot }) => (
                <div key={slot} className="bg-gray-800/50 rounded p-2 border border-purple-500/30 mb-2">
                  {item ? (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-xs font-bold text-purple-300">{label}</div>
                        <div className="text-xs text-gray-500">{item.name} Lv.{item.level}</div>
                      </div>
                      <Button
                        onClick={() => handleUnequip(slot)}
                        size="sm"
                        className="h-6 text-xs bg-red-600 hover:bg-red-700"
                      >
                        Tháo
                      </Button>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 italic">{label} - Trống</div>
                  )}
                </div>
              ))}
            </div>

            {/* Inventory Items */}
            <div>
              <div className="text-xs font-semibold text-gray-400 mb-2 uppercase">Kho Đồ</div>
              {player.inventory.length > 0 ? (
                <div className="space-y-2">
                  {player.inventory.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-800/50 rounded p-2 border border-gray-700/50 hover:border-purple-500/50 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="text-xs font-bold text-purple-300">{item.name}</div>
                          <div className="text-xs text-gray-500">
                            {item.type} • Lv.{item.level} • {item.rarity}
                          </div>
                        </div>
                        <Button
                          onClick={() => handleEquip(item)}
                          size="sm"
                          className="h-6 text-xs bg-green-600 hover:bg-green-700"
                        >
                          Trang Bị
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-gray-500 italic text-center py-4">
                  Kho trống
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Merge Instructions */}
            <div className="text-xs text-gray-400 mb-3 p-2 bg-gray-800/50 rounded border border-gray-700/50">
              ℹ️ Chọn 2 vật phẩm cùng loại, cấp độ và rarity để merge
            </div>

            {/* Inventory Items for Merge */}
            {player.inventory.length > 0 ? (
              <div className="space-y-2">
                {player.inventory.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectForMerge(item.id)}
                    className={`bg-gray-800/50 rounded p-2 border transition-colors cursor-pointer ${
                      selectedForMerge.includes(item.id)
                        ? 'border-purple-500 bg-purple-900/30'
                        : 'border-gray-700/50 hover:border-purple-500/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="text-xs font-bold text-purple-300">{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.type} • Lv.{item.level} • {item.rarity}
                        </div>
                      </div>
                      {selectedForMerge.includes(item.id) && (
                        <div className="text-xs font-bold text-purple-400">✓</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-gray-500 italic text-center py-4">
                Kho trống
              </div>
            )}

            {/* Merge Button */}
            <Button
              onClick={handleMerge}
              disabled={selectedForMerge.length !== 2}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:text-gray-500"
            >
              Merge ({selectedForMerge.length}/2)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
