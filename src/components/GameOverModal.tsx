'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GameStats } from '@/hooks/use-snake-game';
import { formatScore } from '@/lib/game-utils';

interface GameOverModalProps {
  isOpen: boolean;
  stats: GameStats;
  isNewHighScore: boolean;
  onPlayAgain: () => void;
  onReset: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  stats,
  isNewHighScore,
  onPlayAgain,
  onReset
}) => {
  const getPerformanceMessage = () => {
    if (isNewHighScore) {
      return "🎉 Incredible! New high score!";
    } else if (stats.score >= stats.highScore * 0.8) {
      return "🔥 Excellent performance!";
    } else if (stats.score >= stats.highScore * 0.5) {
      return "👍 Good job!";
    } else if (stats.score >= 50) {
      return "👌 Not bad!";
    } else {
      return "🚀 Keep practicing!";
    }
  };
  
  const getScoreRank = () => {
    if (stats.score >= 500) return "Snake Master";
    if (stats.score >= 300) return "Snake Expert";
    if (stats.score >= 200) return "Snake Pro";
    if (stats.score >= 100) return "Snake Veteran";
    if (stats.score >= 50) return "Snake Novice";
    return "Snake Beginner";
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700 text-white">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold mb-2">
            Game Over!
          </DialogTitle>
          <DialogDescription className="text-slate-300">
            {getPerformanceMessage()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Score Summary */}
          <div className="bg-slate-800 rounded-xl p-6 text-center space-y-4">
            {isNewHighScore && (
              <div className="text-emerald-400 font-bold text-lg animate-pulse">
                🏆 NEW HIGH SCORE! 🏆
              </div>
            )}
            
            <div className="space-y-2">
              <div className="text-sm text-slate-400 uppercase tracking-wider">
                Final Score
              </div>
              <div className={`text-4xl font-bold ${isNewHighScore ? 'text-emerald-400' : 'text-white'}`}>
                {formatScore(stats.score)}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-center text-sm">
              <div>
                <div className="text-slate-400">Level</div>
                <div className="text-blue-400 font-bold text-lg">{stats.level}</div>
              </div>
              <div>
                <div className="text-slate-400">Length</div>
                <div className="text-orange-400 font-bold text-lg">{Math.floor(stats.score / 10) + 3}</div>
              </div>
              <div>
                <div className="text-slate-400">Rank</div>
                <div className="text-purple-400 font-bold text-lg">{getScoreRank()}</div>
              </div>
            </div>
            
            {!isNewHighScore && (
              <div className="pt-2 border-t border-slate-700">
                <div className="text-xs text-slate-400">Best Score</div>
                <div className="text-yellow-400 font-bold text-xl">{formatScore(stats.highScore)}</div>
                <div className="text-xs text-slate-500">
                  {stats.score > 0 ? `${stats.highScore - stats.score} points to beat` : 'Your first game!'}
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button
              onClick={onPlayAgain}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Play Again
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 px-6 py-3 rounded-lg transition-all duration-200"
            >
              Main Menu
            </Button>
          </div>
          
          {/* Tips */}
          <div className="text-center text-xs text-slate-500 space-y-1">
            <div>💡 Tips: Use arrow keys or WASD to move</div>
            <div>Press SPACE to pause • Press R to restart</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};