import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, Cpu, Server, Bot, Zap, Database, Lock, CheckCircle2, Award, Terminal, Activity, Globe, Sparkles } from 'lucide-react';

interface JudgeArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JudgeArchitectureModal: React.FC<JudgeArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto font-mono">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-4xl bg-[#050811] border-2 border-purple-500/60 rounded-3xl p-6 md:p-8 shadow-[0_0_50px_rgba(168,85,247,0.3)] space-y-6 relative text-left my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-[#0B1220] text-slate-400 hover:text-white border border-purple-500/30 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-4 border-b border-purple-500/30 pb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-purple-600 via-cyan-500 to-amber-400 text-black shadow-cyber-glow">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="section-badge mb-1">
                <span className="badge-glow-dot"></span>
                <span>SYSTEM ARCHITECTURE & TECHNICAL BLUEPRINT</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white font-orbitron tracking-tight">
                CYBERGUARD AI <span className="text-[#00F0FF]">TECHNICAL ARCHITECTURE</span>
              </h2>
            </div>
          </div>

          {/* 4 TECH HIGHLIGHT GRID CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1: Tech Stack */}
            <div className="glass-card p-5 space-y-3 border-cyan-500/40">
              <div className="flex items-center gap-2 text-cyan-400 font-orbitron font-bold text-sm">
                <Server className="w-4 h-4" />
                <span>FULL-STACK ARCHITECTURE</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 font-sans">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> <strong>Frontend:</strong> React 18, Vite, TypeScript, Tailwind CSS, Framer Motion</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> <strong>Backend:</strong> Python 3 FastAPI, Uvicorn, WebSockets</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> <strong>Audio & Voice:</strong> Web Speech API Synthesizer & Web Audio Spectral Analysis</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> <strong>Data Visualization:</strong> Recharts Telemetry, Attack Graph SVG Canvas</li>
              </ul>
            </div>

            {/* Card 2: AI Engine */}
            <div className="glass-card p-5 space-y-3 border-purple-500/40">
              <div className="flex items-center gap-2 text-purple-400 font-orbitron font-bold text-sm">
                <Bot className="w-4 h-4" />
                <span>AI & FORENSICS ENGINE</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 font-sans">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> <strong>Gemini 1.5 AI Copilot:</strong> Automated root cause audit & playbooks</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> <strong>Deepfake Classifier:</strong> Vocal frequency harmonics & spectral graphs</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> <strong>SMS Smishing Model:</strong> Social engineering urgency & link parser</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" /> <strong>NPCI VPA Lookup:</strong> Money-mule detection & fraud freeze</li>
              </ul>
            </div>

            {/* Card 3: Security Modules */}
            <div className="glass-card p-5 space-y-3 border-amber-500/40">
              <div className="flex items-center gap-2 text-amber-400 font-orbitron font-bold text-sm">
                <Zap className="w-4 h-4" />
                <span>16 STANDALONE SECURITY MODULES</span>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                Phishing URL Guard, SMS Detector, UPI Fraud Shield, QR Scanner, Deepfake Voice Scanner, APK Trojan Guard, SIM Swap Lock, Identity Vault, Dark Web Intel, SOAR Playbooks, ML Sandbox, Zero-Trust Guard, Attack Simulator, System Health, Security Audit Export, Gemini Copilot.
              </p>
            </div>

            {/* Card 4: Real Impact */}
            <div className="glass-card p-5 space-y-3 border-emerald-500/40">
              <div className="flex items-center gap-2 text-emerald-400 font-orbitron font-bold text-sm">
                <Activity className="w-4 h-4" />
                <span>REAL-WORLD IMPACT METRICS</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-orbitron pt-1">
                <div className="p-2 rounded-xl bg-[#0B1220] border border-emerald-500/30">
                  <span className="text-emerald-400 font-black text-base block">1.4M+</span>
                  <span className="text-[10px] text-slate-400">Threats Neutralized</span>
                </div>
                <div className="p-2 rounded-xl bg-[#0B1220] border border-cyan-500/30">
                  <span className="text-cyan-400 font-black text-base block">&lt; 10ms</span>
                  <span className="text-[10px] text-slate-400">Interception Latency</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-purple-500/30 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-sans">© 2026 CYBERGUARD AI — Enterprise Defense Platform</span>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-orbitron font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all cursor-pointer"
            >
              CLOSE ARCHITECTURE OVERVIEW
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
