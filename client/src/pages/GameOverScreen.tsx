import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';

export default function GameOverScreen() {
  const { gameSession, startGame, goHome } = useGame();

  useEffect(() => {
    if (gameSession && gameSession.gameState === 'game-over') {
      // Auto-save high score is handled in useGameState
    }
  }, [gameSession]);

  if (!gameSession) return null;

  const { player, monster } = gameSession;
  const isWin = player.currentHp > 0 && player.floor > 10;
  const finalScore = player.score;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Result */}
        <div className="mb-8">
          <div className={`text-6xl md:text-7xl font-black mb-4 ${isWin ? 'glow-accent' : 'text-red-500'}`} style={{ fontFamily: 'Orbitron' }}>
            {isWin ? '🏆 THẮNG!' : '💀 THUA!'}
          </div>
          <div className="h-1 w-32 bg-gradient-to-r from-amber-500 to-red-500 mx-auto mb-6" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-lg p-4 border border-amber-500/30">
            <div className="text-xs text-gray-400 mb-1">TẦNG ĐẠT ĐƯỢC</div>
            <div className="text-3xl font-bold glow-accent">{player.floor}</div>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 border border-amber-500/30">
            <div className="text-xs text-gray-400 mb-1">VẬT PHẨM THU THẬP</div>
            <div className="text-3xl font-bold glow-accent">{Object.values(player.relics).reduce((a, b) => a + b, 0)}</div>
          </div>
        </div>

        {/* Score */}
        <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-lg p-6 mb-8 border border-amber-500/50">
          <div className="text-xs text-gray-400 mb-2">ĐIỂM CUỐI CÙNG</div>
          <div className="text-5xl font-black glow-accent mb-4">{finalScore}</div>
          {finalScore > gameSession.highScore && (
            <div className="text-sm text-amber-400 font-semibold">
              🎉 CAO ĐIỂM MỚI!
            </div>
          )}
        </div>

        {/* Message */}
        <div className="mb-8 text-gray-300">
          {isWin ? (
            <div className="space-y-2">
              <p className="text-lg font-semibold">Bạn đã chinh phục tất cả 10 tầng hầm!</p>
              <p className="text-sm">Bạn là một chiến binh thực sự xứng đáng!</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-lg font-semibold">Bạn đã bị tiêu diệt tại tầng {player.floor}.</p>
              <p className="text-sm">Hãy thử lại và vượt xa hơn lần này!</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <Button
            onClick={startGame}
            className="flex-1 py-4 text-lg font-bold bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white rounded-lg transition-all duration-200"
          >
            CHƠI LẠI
          </Button>
          <Button
            onClick={goHome}
            variant="outline"
            className="flex-1 py-4 text-lg font-bold border-amber-500/50 text-amber-400 hover:bg-amber-500/20 rounded-lg"
          >
            TRANG CHỦ
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-gray-500">
          <p>Cảm ơn đã chơi Dice & RPS Roguelike!</p>
        </div>
      </div>
    </div>
  );
}
