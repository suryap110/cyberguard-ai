import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Zap, Activity, Crosshair, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audioSfx';

export const CyberBootSequence: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [flashScreen, setFlashScreen] = useState(false);

  const bootLogs = [
    "CYBERGUARD AI CORE V4.2 ACTIVE...",
    "ACTIVATING CYBERGUARD AI SPECTRAL SENSORS...",
    "SYNCHRONIZING CYBERGUARD MESH BLOCK 07...",
    "ALIGNING CYBERGUARD ZERO-TRUST DNA MESH...",
    "NEUTRALIZING UNTRUSTED THREAT SHARDS...",
    "SYNCHRONIZATION 100% COMPLETE. ENTERING QUEST HQ."
  ];

  useEffect(() => {
    soundFx.playLaserScan();
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          soundFx.playLevelUp();
          setFlashScreen(true);
          setTimeout(onComplete, 700);
          return 100;
        }
        return prev + 20;
      });
      setStep(prev => Math.min(bootLogs.length - 1, prev + 1));
    }, 450);

    return () => clearInterval(interval);
  }, []);

  const handleFinishEarly = () => {
    soundFx.playLevelUp();
    setFlashScreen(true);
    setTimeout(onComplete, 400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#040714] flex flex-col items-center justify-center p-6 text-white font-mono selection:bg-cyan-500 selection:text-black overflow-hidden">
      {/* Electric Cyan Animus Flash Burst Overlay */}
      <AnimatePresence>
        {flashScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#00F0FF] flex items-center justify-center shadow-[0_0_100px_#00F0FF]"
          >
            <div className="text-black font-orbitron font-black text-2xl md:text-3xl tracking-widest animate-ping">
              SYNCHRONIZATION COMPLETE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animus Scanlines & Electric Cyan Ambient Rays */}
      <div className="animus-scanline" />
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/15 via-transparent to-blue-950/30 pointer-events-none" />

      {/* Rotating 3D Animus Perspective VR Rings in Electric Cyan & Blue */}
      <div className="absolute w-[600px] h-[600px] rounded-full border border-cyan-400/20 hud-ring-spin pointer-events-none" />
      <div className="absolute w-[420px] h-[420px] rounded-full border border-blue-500/30 hud-ring-reverse pointer-events-none" />
      <div className="absolute w-[280px] h-[280px] rounded-full border border-cyan-400/40 animus-eagle-pulse pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.85, rotateX: 12 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-[#070C1A]/95 border border-[#00F0FF]/70 rounded-3xl p-8 shadow-[0_0_60px_rgba(0,240,255,0.4)] space-y-6 text-center relative overflow-hidden animus-clip-corner"
      >
        <div className="animus-box-decor border-[#00F0FF]" />
        <div className="animus-box-decor-br border-[#00F0FF]" />

        {/* Authentic Assassin's Creed Hood Crest SVG Emblem (Electric Cyan & Blue) */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-cyan-400/50 animate-ping opacity-40 pointer-events-none" />
          
          <svg className="w-24 h-24 text-[#00F0FF] drop-shadow-[0_0_25px_#00F0FF] animate-pulse" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outer Hood Triangle */}
            <path d="M50 5 L88 78 L68 78 L50 42 L32 78 L12 78 Z" fill="url(#acCyanGrad)" stroke="#00F0FF" strokeWidth="2.5" />
            {/* Inner Crescent Arch Wings */}
            <path d="M50 18 L72 65 L60 65 L50 45 L40 65 L28 65 Z" fill="#070B14" stroke="#3B82F6" strokeWidth="1.5" />
            {/* Eagle Eye Center Gem */}
            <polygon points="50,45 57,60 50,75 43,60" fill="#00F0FF" />
            <defs>
              <linearGradient id="acCyanGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div>
          <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 text-[#00F0FF] border border-cyan-500/50 text-[10px] font-orbitron font-extrabold uppercase tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            🛡️ CYBERGUARD AI V4.2
          </span>
          <h1 className="text-2xl md:text-3xl font-black tracking-wider text-white font-orbitron mt-2">
            SYSTEM <span className="text-[#00F0FF] drop-shadow-[0_0_12px_#00F0FF]">SYNCHRONIZER</span>
          </h1>
          <p className="text-xs text-cyan-300 font-bold uppercase tracking-widest mt-1 font-mono">
            CYBERGUARD AI ENFORCED | ACTIVE DEFENSE PROTOCOL
          </p>
        </div>

        {/* Progress Bar - Animus Electric Blue Eagle Sync */}
        <div className="space-y-2 font-orbitron">
          <div className="flex justify-between text-xs text-slate-300">
            <span>SYSTEM SYNCHRONIZATION PROGRESS</span>
            <span className="text-[#00F0FF] font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-[#050811] h-3.5 rounded-full overflow-hidden border border-cyan-500/50 p-0.5">
            <motion.div 
              className="bg-gradient-to-r from-[#00F0FF] via-[#3B82F6] to-[#7C3AED] h-full rounded-full shadow-[0_0_20px_#00F0FF]"
              style={{ width: `${progress}%` }}
            ></motion.div>
          </div>
        </div>

        {/* Console Boot Steps */}
        <div className="bg-[#050811]/90 p-4 rounded-2xl border border-cyan-500/40 text-xs font-mono text-left space-y-2 h-36 overflow-hidden">
          {bootLogs.slice(0, step + 1).map((log, index) => (
            <div key={index} className="flex items-center gap-2.5 text-cyan-300 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="tracking-wide">{log}</span>
            </div>
          ))}
        </div>

        {/* Skip / Enter Button - Animus Electric Cyan Style */}
        <button
          onClick={handleFinishEarly}
          className="w-full py-3 rounded-xl animus-btn-cyan text-xs font-orbitron font-bold shadow-[0_0_25px_rgba(0,240,255,0.5)] cursor-pointer"
        >
          ENTER CYBERGUARD AI SYSTEM [CLICK / SPACE]
        </button>
      </motion.div>
    </div>
  );
};

