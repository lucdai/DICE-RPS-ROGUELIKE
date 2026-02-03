import { useState, useEffect } from 'react';
import { useGame } from '@/contexts/GameContext';
import { RelicCard } from '@/components/RelicCard';
import { selectRandomRelics } from '@/lib/game-logic';
import { RELICS } from '@/lib/constants';
import { RelicType } from '@/types/game';

export default function RelicSelectionScreen() {
  const { gameSession, selectRelic } = useGame();
  const [availableRelics, setAvailableRelics] = useState<RelicType[]>([]);

  useEffect(() => {
    if (gameSession) {
      const relics = selectRandomRelics(gameSession.player.relics);
      setAvailableRelics(relics);
    }
  }, [gameSession]);

  if (!gameSession || availableRelics.length === 0) {
    return null;
  }

  const { player } = gameSession;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black glow-primary mb-2" style={{ fontFamily: 'Orbitron' }}>
            CHỌN VẬT PHẨM
          </h1>
          <p className="text-gray-300 mb-4">
            Bạn đã vượt qua tầng {player.floor - 1}. Chọn một vật phẩm bổ trợ để tăng sức mạnh!
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-red-500 mx-auto" />
        </div>

        {/* Relic Selection */}
        <div className="space-y-4 mb-8">
          {availableRelics.map((relicId) => (
            <RelicCard
              key={relicId}
              relic={RELICS[relicId]}
              onSelect={() => selectRelic(relicId)}
            />
          ))}
        </div>

        {/* Info */}
        <div className="text-center text-xs text-gray-500">
          <p>Vật phẩm sẽ giúp bạn trong các trận chiến tiếp theo</p>
          <p>Bạn có thể sở hữu nhiều vật phẩm cùng lúc</p>
        </div>
      </div>
    </div>
  );
}
