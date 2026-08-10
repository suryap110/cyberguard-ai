import React from 'react';
import { motion } from 'framer-motion';

interface SecurityScoreGaugeProps {
  score: number;
  status: string;
}

export const SecurityScoreGauge: React.FC<SecurityScoreGaugeProps> = ({ score, status }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 80) return '#10B981'; // Green
    if (s >= 60) return '#F59E0B'; // Amber
    return '#EF4444'; // Red
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[#0F1420] border border-[#232D42] rounded-3xl relative overflow-hidden shadow-2xl">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative w-48 h-48 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="#161D2F"
            strokeWidth="14"
            fill="transparent"
          />
          <motion.circle
            cx="96"
            cy="96"
            r={radius}
            stroke={getColor(score)}
            strokeWidth="14"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span 
            className="text-4xl font-extrabold text-white font-mono tracking-tight"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {score}
          </motion.span>
          <span className="text-xs font-mono text-slate-400">/ 100</span>
          <span className={`mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider ${
            score >= 80 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {status}
          </span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-sm font-semibold text-white">CYBERGUARD Cyber-Risk Score</h3>
        <p className="text-xs text-slate-400 mt-0.5">+4 score points optimized this week</p>
      </div>
    </div>
  );
};
