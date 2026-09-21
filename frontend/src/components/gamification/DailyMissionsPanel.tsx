import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Flame, CheckCircle2, ChevronRight, Gift, Trophy } from 'lucide-react';
import { useGamification } from '../../context/GamificationContext';
import { soundFx } from '../../utils/audioSfx';

export const DailyMissionsPanel: React.FC = () => {
  const { missions, achievements, streakDays, claimMissionReward, xp } = useGamification();

  return (
    <div className="bg-[#0B1220] border border-cyan-500/40 rounded-3xl p-7 md:p-8 shadow-cyber-glow font-mono text-xs space-y-6">
      {/* Streak Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-cyber-glow">
            <Flame className="w-5 h-5 fill-amber-400 text-amber-400 animate-bounce" />
          </div>
          <div>
            <h3 className="font-extrabold text-white text-sm tracking-wide">🔥 {streakDays} DAY DEFENSE STREAK</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Log in daily & complete missions to earn XP</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/40 text-[10px]">
          +500 XP BONUS
        </span>
      </div>

      {/* Daily Missions List */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
          <Trophy className="w-4 h-4 text-cyan-400" />
          <span>DAILY SECURITY MISSIONS</span>
        </h4>

        {missions.map((m) => (
          <div key={m.id} className="p-4 rounded-2xl bg-[#101827] border border-[#1E293B] flex items-center justify-between gap-4">
            <div className="space-y-1.5 text-left flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">{m.title}</span>
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-bold">
                  +{m.rewardXp} XP
                </span>
              </div>
              <p className="text-[10px] text-slate-400">{m.description}</p>
              
              {/* Progress Bar */}
              <div className="w-full bg-[#070B14] h-1.5 rounded-full overflow-hidden border border-[#1E293B] mt-1.5">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-purple-500 h-full rounded-full transition-all"
                  style={{ width: `${(m.progress / m.maxProgress) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Claim Reward Button */}
            {m.completed ? (
              <button
                onClick={() => claimMissionReward(m.id)}
                disabled={m.claimed}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs transition-all shrink-0 cursor-pointer ${
                  m.claimed 
                    ? 'bg-[#151F32] text-slate-500 border border-[#1E293B]' 
                    : 'bg-emerald-400 text-black shadow-cyber-glow hover:scale-105'
                }`}
              >
                {m.claimed ? '✓ CLAIMED' : 'CLAIM REWARD'}
              </button>
            ) : (
              <span className="text-[10px] text-slate-500 font-bold px-2.5 py-1 bg-[#070B14] rounded-lg border border-[#1E293B] shrink-0">
                IN PROGRESS ({m.progress}/{m.maxProgress})
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Collectible Defender Badges Grid */}
      <div className="pt-2">
        <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-purple-400" />
          <span>COLLECTIBLE DEFENDER BADGES</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {achievements.map((ach) => (
            <div 
              key={ach.id}
              className={`p-3 rounded-2xl border text-center transition-all ${
                ach.unlocked 
                  ? 'bg-[#101827] border-purple-500/50 shadow-cyber-glow text-purple-200' 
                  : 'bg-[#070B14] border-[#1E293B] opacity-50 text-slate-500'
              }`}
            >
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 w-fit mx-auto mb-1.5">
                <Award className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-bold text-white truncate">{ach.title}</p>
              <p className="text-[9px] text-slate-400 truncate mt-0.5">{ach.description}</p>
              {ach.unlocked && (
                <span className="text-[8px] text-emerald-400 font-bold block mt-1.5">✓ UNLOCKED</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
