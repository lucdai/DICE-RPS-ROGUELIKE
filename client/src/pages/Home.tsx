import { Button } from '@/components/ui/button';
import { useGame } from '@/contexts/GameContext';
import CombatScreen from './CombatScreen';
import RelicSelectionScreen from './RelicSelectionScreen';
import GameOverScreen from './GameOverScreen';
import ClassSelectionScreen from './ClassSelectionScreen';

export default function Home() {
  const { gameSession, highScore, startGame, goHome } = useGame();

  if (!gameSession) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full text-center">
          {/* Title */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black glow-primary mb-2" style={{ fontFamily: 'Orbitron' }}>
              DICE & RPS
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-amber-400 mb-4" style={{ fontFamily: 'Orbitron' }}>
              ROGUELIKE
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-amber-500 to-red-500 mx-auto" />
          </div>

          {/* High Score */}
          {highScore > 0 && (
            <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-lg p-4 mb-12 border border-amber-500/50">
              <div className="text-xs text-gray-400 mb-1">CAO ĐIỂM</div>
              <div className="text-3xl font-bold glow-accent">{highScore}</div>
            </div>
          )}

          {/* Start Button */}
          <Button
            onClick={startGame}
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-600 hover:to-red-600 text-white rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-amber-500/50"
          >
            BẮT ĐẦU TRẬN ĐẤU
          </Button>
        </div>
      </div>
    );
  }

  // Render game screens based on game state
  switch (gameSession.gameState) {
    case 'class-selection' as any:
      return <ClassSelectionScreen />;
    case 'combat':
      return <CombatScreen />;
    case 'relic-selection':
      return <RelicSelectionScreen />;
    case 'game-over':
      return <GameOverScreen />;
    default:
      return null;
  }
}
