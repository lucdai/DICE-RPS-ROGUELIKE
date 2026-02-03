import { useGame } from '@/contexts/GameContext';
import { ClassSelector } from '@/components/ClassSelector';
import { PlayerClass } from '@/types/game';

export default function ClassSelectionScreen() {
  const { selectPlayerClass } = useGame();

  const handleSelectClass = (playerClass: PlayerClass) => {
    selectPlayerClass(playerClass);
  };

  return <ClassSelector onSelectClass={handleSelectClass} />;
}
