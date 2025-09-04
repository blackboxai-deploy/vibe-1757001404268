'use client';

import { Button } from '@/components/ui/button';
import { GameState } from '@/lib/game-constants';
import { DIRECTIONS } from '@/lib/game-constants';
import { Direction } from '@/lib/game-utils';

interface GameControlsProps {
  gameState: GameState;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  resetGame: () => void;
  changeDirection: (direction: Direction) => void;
  canChangeDirection: boolean;
}

export const GameControls: React.FC<GameControlsProps> = ({
  gameState,
  startGame,
  pauseGame,
  resumeGame,
  resetGame,
  changeDirection,
  canChangeDirection
}) => {
  const handleDirectionChange = (direction: Direction) => {
    if (canChangeDirection) {
      changeDirection(direction);
    }
  };
  
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Main Game Controls */}
      <div className="flex flex-wrap gap-3 justify-center">
        {gameState === GameState.MENU && (
          <Button
            onClick={startGame}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            Start Game
          </Button>
        )}
        
        {gameState === GameState.PLAYING && (
          <>
            <Button
              onClick={pauseGame}
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white px-6 py-2 rounded-lg transition-all duration-200"
            >
              Pause
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-lg transition-all duration-200"
            >
              Reset
            </Button>
          </>
        )}
        
        {gameState === GameState.PAUSED && (
          <>
            <Button
              onClick={resumeGame}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200"
            >
              Resume
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-2 rounded-lg transition-all duration-200"
            >
              Reset
            </Button>
          </>
        )}
        
        {gameState === GameState.GAME_OVER && (
          <>
            <Button
              onClick={startGame}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Play Again
            </Button>
            <Button
              onClick={resetGame}
              variant="outline"
              className="border-slate-500 text-slate-500 hover:bg-slate-500 hover:text-white px-6 py-2 rounded-lg transition-all duration-200"
            >
              Reset
            </Button>
          </>
        )}
      </div>
      
      {/* Mobile/Touch Controls */}
      <div className="block md:hidden">
        <div className="text-center mb-3">
          <span className="text-sm text-slate-400">Touch Controls</span>
        </div>
        <div className="grid grid-cols-3 gap-2 w-32">
          {/* Up */}
          <div></div>
          <Button
            onClick={() => handleDirectionChange(DIRECTIONS.UP)}
            disabled={!canChangeDirection}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 h-12 w-12 p-0 rounded-lg disabled:opacity-50"
            aria-label="Move Up"
          >
            ↑
          </Button>
          <div></div>
          
          {/* Left, Down, Right */}
          <Button
            onClick={() => handleDirectionChange(DIRECTIONS.LEFT)}
            disabled={!canChangeDirection}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 h-12 w-12 p-0 rounded-lg disabled:opacity-50"
            aria-label="Move Left"
          >
            ←
          </Button>
          <Button
            onClick={() => handleDirectionChange(DIRECTIONS.DOWN)}
            disabled={!canChangeDirection}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 h-12 w-12 p-0 rounded-lg disabled:opacity-50"
            aria-label="Move Down"
          >
            ↓
          </Button>
          <Button
            onClick={() => handleDirectionChange(DIRECTIONS.RIGHT)}
            disabled={!canChangeDirection}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 h-12 w-12 p-0 rounded-lg disabled:opacity-50"
            aria-label="Move Right"
          >
            →
          </Button>
        </div>
      </div>
      
      {/* Keyboard Shortcuts */}
      <div className="text-center space-y-2">
        <div className="text-xs text-slate-400">Keyboard Controls</div>
        <div className="flex flex-wrap justify-center gap-4 text-xs text-slate-500">
          <span>Arrow Keys / WASD - Move</span>
          <span>SPACE - Start/Pause</span>
          <span>R - Reset</span>
          <span>ESC - Pause/Menu</span>
        </div>
      </div>
    </div>
  );
};