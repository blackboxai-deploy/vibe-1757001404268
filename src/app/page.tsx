'use client';

import { useSnakeGame } from '@/hooks/use-snake-game';
import { GameBoard } from '@/components/GameBoard';
import { GameControls } from '@/components/GameControls';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import { GameOverModal } from '@/components/GameOverModal';
import { GameState } from '@/lib/game-constants';

export default function SnakeGamePage() {
  const {
    gameState,
    snake,
    food,
    stats,
    startGame,
    pauseGame,
    resumeGame,
    resetGame,
    changeDirection,
    isGameRunning,
    canChangeDirection
  } = useSnakeGame();
  
  const isNewHighScore = stats.score > 0 && stats.score === stats.highScore && stats.score > 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_70%)]" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Snake Game
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Classic snake gameplay with modern design. Collect food, grow longer, and beat your high score!
          </p>
        </div>
        
        {/* Game State Messages */}
        {gameState === GameState.MENU && (
          <div className="text-center mb-8">
            <div className="bg-slate-800 rounded-xl p-6 mx-auto max-w-md border border-slate-700">
              <h2 className="text-2xl font-bold text-white mb-3">Welcome to Snake!</h2>
              <p className="text-slate-300 mb-4">
                Control your snake using arrow keys or WASD. Eat the red food to grow and increase your score.
              </p>
              <div className="text-sm text-slate-400 space-y-1">
                <div>🎯 Avoid hitting walls or yourself</div>
                <div>🍎 Each food gives 10 points</div>
                <div>⚡ Speed increases as you progress</div>
              </div>
            </div>
          </div>
        )}
        
        {gameState === GameState.PAUSED && (
          <div className="text-center mb-4">
            <div className="bg-yellow-900 border border-yellow-600 rounded-lg px-4 py-3 inline-block">
              <span className="text-yellow-200 font-semibold">⏸️ Game Paused</span>
            </div>
          </div>
        )}
        
        {/* Main Game Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Score Display - Left Column */}
            <div className="order-2 lg:order-1">
              <ScoreDisplay 
                stats={stats} 
                isNewHighScore={isNewHighScore && gameState === GameState.PLAYING}
              />
            </div>
            
            {/* Game Board - Center Column */}
            <div className="order-1 lg:order-2">
              <GameBoard 
                snake={snake}
                food={food}
                isGameRunning={isGameRunning}
              />
            </div>
            
            {/* Game Controls - Right Column */}
            <div className="order-3 lg:order-3">
              <GameControls
                gameState={gameState}
                startGame={startGame}
                pauseGame={pauseGame}
                resumeGame={resumeGame}
                resetGame={resetGame}
                changeDirection={changeDirection}
                canChangeDirection={canChangeDirection}
              />
            </div>
          </div>
        </div>
        
        {/* Game Instructions for Desktop */}
        <div className="hidden md:block mt-12 text-center">
          <div className="bg-slate-800 rounded-xl p-6 mx-auto max-w-4xl border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-4">How to Play</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-slate-300">
              <div className="space-y-2">
                <div className="text-emerald-400 font-medium">Movement</div>
                <div>Arrow Keys</div>
                <div>WASD Keys</div>
                <div>HJKL (Vim)</div>
              </div>
              <div className="space-y-2">
                <div className="text-blue-400 font-medium">Game Control</div>
                <div>SPACE - Pause/Resume</div>
                <div>R - Restart Game</div>
                <div>ESC - Pause/Menu</div>
              </div>
              <div className="space-y-2">
                <div className="text-yellow-400 font-medium">Scoring</div>
                <div>10 points per food</div>
                <div>Speed bonus multiplier</div>
                <div>Level progression</div>
              </div>
              <div className="space-y-2">
                <div className="text-purple-400 font-medium">Strategy</div>
                <div>Plan your path ahead</div>
                <div>Use walls strategically</div>
                <div>Stay calm at high speeds</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-12 text-slate-500 text-sm">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
      
      {/* Game Over Modal */}
      <GameOverModal
        isOpen={gameState === GameState.GAME_OVER}
        stats={stats}
        isNewHighScore={isNewHighScore}
        onPlayAgain={startGame}
        onReset={resetGame}
      />
    </div>
  );
}