import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Cpu, Sparkles, Activity, ShieldCheck } from 'lucide-react';

interface SentinelAICoreProps {
  status?: 'ONLINE' | 'ANALYZING' | 'INTERCEPTING';
  compact?: boolean;
}

export const SentinelAICore: React.FC<SentinelAICoreProps> = ({ status = 'ONLINE', compact = false }) => {
  return (
    <div className={`relative flex flex-col items-center justify-between ${compact ? 'p-5' : 'p-7 md:p-8'} bg-[#0B1220] border border-purple-500/40 rounded-3xl shadow-cyber-glow overflow-hidden font-mono h-full space-y-6`}>
      {/* Background Energy Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 via-cyan-500/10 to-emerald-500/10 blur-xl pointer-events-none"></div>

      {/* Holographic Neural Core Sphere Visualizer */}
      <div className="relative w-40 h-40 flex items-center justify-center my-4">
        {/* Outer Rotating Arc Ring 1 */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/60 hud-ring-spin"></div>
        
        {/* Middle Rotating Arc Ring 2 */}
        <div className="absolute inset-2 rounded-full border border-cyan-400/50 hud-ring-spin-reverse"></div>

        {/* Inner Pulsing Core */}
        <motion.div 
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 via-cyan-400 to-emerald-400 p-0.5 shadow-[0_0_35px_rgba(192,132,252,0.6)] flex items-center justify-center relative"
        >
          <div className="w-full h-full rounded-full bg-[#070B14] flex items-center justify-center">
            <Bot className="w-10 h-10 text-cyan-400 animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Core Status Title */}
      <div className="text-center z-10 space-y-1">
        <h3 className="text-lg font-black text-white tracking-wider flex items-center justify-center gap-2">
          <span>SENTINEL AI CORE</span>
          <Sparkles className="w-4 h-4 text-purple-400" />
        </h3>
        <div className="flex items-center justify-center gap-2 mt-1">
          <span className={`w-2.5 h-2.5 rounded-full ${status === 'ONLINE' ? 'bg-emerald-400 animate-ping' : 'bg-amber-400 animate-bounce'}`}></span>
          <span className={`text-xs font-bold ${status === 'ONLINE' ? 'text-emerald-400' : 'text-amber-400'}`}>
            ● {status === 'ONLINE' ? 'SYSTEM ONLINE & MONITORING' : 'ANALYZING THREAT CORRELATION...'}
          </span>
        </div>
      </div>

      {/* AI Sub-Systems Active Checklist */}
      {!compact && (
        <div className="w-full grid grid-cols-2 gap-3 pt-2 text-[10px] z-10">
          <div className="p-3 rounded-xl bg-[#101827] border border-[#1E293B] flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="text-slate-300">Phish Model: <strong className="text-emerald-400">ACTIVE</strong></span>
          </div>
          <div className="p-3 rounded-xl bg-[#101827] border border-[#1E293B] flex items-center gap-2.5">
            <Activity className="w-4 h-4 text-purple-400 shrink-0" />
            <span className="text-slate-300">FFT Vocoder: <strong className="text-emerald-400">ACTIVE</strong></span>
          </div>
          <div className="p-3 rounded-xl bg-[#101827] border border-[#1E293B] flex items-center gap-2.5">
            <Cpu className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="text-slate-300">NPCI Query: <strong className="text-emerald-400">ACTIVE</strong></span>
          </div>
          <div className="p-3 rounded-xl bg-[#101827] border border-[#1E293B] flex items-center gap-2.5">
            <Bot className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-300">Playbooks: <strong className="text-emerald-400">READY</strong></span>
          </div>
        </div>
      )}
    </div>
  );
};
