'use client';

import { GameStats } from '@/hooks/use-snake-game';
import { formatScore } from '@/lib/game-utils';

interface ScoreDisplayProps {
  stats: GameStats;
  isNewHighScore?: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  stats,
  isNewHighScore = false
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Main Score Display */}
      <div className="bg-slate-800 rounded-xl p-6 shadow-2xl border border-slate-700">
        <div className="grid grid-cols-2 gap-8 text-center">
          {/* Current Score */}
          <div className="space-y-2">
            <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">
              Score
            </div>
            <div className={`text-3xl font-bold ${isNewHighScore ? 'text-emerald-400 animate-pulse' : 'text-white'}`}>
              {formatScore(stats.score)}
            </div>
            {isNewHighScore && (
              <div className="text-xs text-emerald-400 font-medium animate-bounce">
                NEW RECORD!
              </div>
            )}
          </div>
          
          {/* High Score */}
          <div className="space-y-2">
            <div className="text-sm text-slate-400 uppercase tracking-wider font-medium">
              Best
            </div>
            <div className="text-3xl font-bold text-yellow-400">
              {formatScore(stats.highScore)}
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary Stats */}
      <div className="flex gap-4 text-center">
        {/* Level */}
        <div className="bg-slate-800 rounded-lg px-4 py-3 border border-slate-700">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">
            Level
          </div>
          <div className="text-xl font-bold text-blue-400">
            {stats.level}
          </div>
        </div>
        
        {/* Speed */}
        <div className="bg-slate-800 rounded-lg px-4 py-3 border border-slate-700">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">
            Speed
          </div>
          <div className="text-xl font-bold text-purple-400">
            {Math.round(1000 / stats.speed * 10) / 10}x
          </div>
        </div>
        
        {/* Snake Length */}
        <div className="bg-slate-800 rounded-lg px-4 py-3 border border-slate-700">
          <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-1">
            Length
          </div>
          <div className="text-xl font-bold text-orange-400">
            {Math.floor(stats.score / 10) + 3}
          </div>
        </div>
      </div>
      
      {/* Progress Bar for Next Level */}
      <div className="w-full max-w-sm">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Level {stats.level}</span>
          <span>Level {stats.level + 1}</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${((stats.score % 50) / 50) * 100}%`
            }}
          />
        </div>
        <div className="text-center text-xs text-slate-500 mt-1">
          {50 - (stats.score % 50)} points to next level
        </div>
      </div>
    </div>
  );
};