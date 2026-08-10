import React from 'react';
import { motion } from 'framer-motion';

interface RiskMeterProps {
  score: number;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ score }) => {
  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-xs font-mono">
        <span className="text-emerald-400">SAFE (0)</span>
        <span className="text-amber-400">WARNING (25)</span>
        <span className="text-orange-400">HIGH (50)</span>
        <span className="text-red-400 font-bold">CRITICAL (75+)</span>
      </div>
      <div className="h-3 w-full bg-[#161D2F] rounded-full overflow-hidden p-0.5 border border-[#232D42] relative">
        <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-500 via-orange-500 to-red-500 opacity-80"></div>
        <motion.div
          className="absolute top-0 bottom-0 w-2 bg-white rounded-full shadow-lg shadow-white"
          initial={{ left: '0%' }}
          animate={{ left: `${Math.min(Math.max(score, 2), 97)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between text-[11px] font-mono text-slate-400">
        <span>Detected Risk Indicator</span>
        <span className="font-bold text-white">{score} / 100</span>
      </div>
    </div>
  );
};
