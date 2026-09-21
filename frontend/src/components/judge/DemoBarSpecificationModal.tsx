import React from 'react';
import { Award, Zap, Mic, CreditCard, Radio, Volume2, ShieldCheck, CheckCircle2, X, Sparkles, Sliders } from 'lucide-react';

interface DemoBarSpecificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoBarSpecificationModal: React.FC<DemoBarSpecificationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const specifications = [
    {
      icon: Zap,
      title: 'Preset 1: Phishing URL Interception',
      color: 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10',
      description: 'Executes real-time domain typosquatting analysis, SSL certificate age verification, and brand impersonation scoring via FastAPI backend.',
      features: ['Typosquatting & Brand Impersonation Flag', 'SSL Certificate Age Check (<7 Days)', 'Automated IP Firewall Sinkhole']
    },
    {
      icon: Mic,
      title: 'Preset 2: Deepfake AI Voice Forensics',
      color: 'text-purple-400 border-purple-500/40 bg-purple-500/10',
      description: 'Performs FFT pitch harmonics analysis and synthetic vocal clone classification with Web Speech API vocalization.',
      features: ['Neural TTS Frame Discontinuity Detection', 'FFT Spectral Pitch Harmonics Graph', 'Real-Time AI Voice Speech Synthesis']
    },
    {
      icon: CreditCard,
      title: 'Preset 3: UPI Money-Mule Fraud Block',
      color: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
      description: 'Queries NPCI VPA registry, isolates unverified high-value wire transfers, and enforces instant beneficiary quarantine.',
      features: ['NPCI VPA Mule Registry Matching', 'High-Value Wire Freeze (>₹25,000)', 'FIDO2 Biometric Step-Up Challenge']
    },
    {
      icon: Radio,
      title: 'Preset 4: Multi-Stage Ransomware Simulator',
      color: 'text-red-400 border-red-500/40 bg-red-500/10',
      description: 'Triggers multi-stage cyber attack sequence broadcasting real-time WebSocket event streams and automated SOAR playbooks.',
      features: ['Real-Time WebSocket Event Pipeline', 'Isolation Forest ML Anomaly Engine', 'Automated SOAR IP Block & Session Revoke']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#0B101D] border border-purple-500/50 rounded-3xl shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden font-mono text-slate-200">
        
        {/* Background Mesh Grid */}
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

        {/* Modal Container */}
        <div className="p-6 md:p-8 space-y-6 relative z-10 max-h-[90vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-purple-500/30 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-cyber-glow">
                <Award className="w-7 h-7 text-amber-400 fill-amber-400" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold border border-purple-500/40 uppercase">
                  DEMO BAR SPECIFICATION & CAPABILITIES
                </span>
                <h2 className="text-xl md:text-2xl font-black text-white font-orbitron mt-1">
                  LIVE PRODUCT DEMO BAR <span className="text-cyan-400">SPECIFICATIONS</span>
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#161D2F] border border-[#232D42] text-slate-400 hover:text-white hover:border-purple-500 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Overview Banner */}
          <div className="p-5 rounded-2xl bg-[#0F1420] border border-cyan-500/30 flex items-center gap-4">
            <Sliders className="w-8 h-8 text-cyan-400 shrink-0" />
            <div className="text-xs space-y-1 font-sans">
              <span className="font-bold text-white font-mono uppercase">Interactive Live Control Specification</span>
              <p className="text-slate-300 leading-relaxed">
                The Live Product Demo Bar is a persistent top control HUD designed for 1-click execution of CyberGuard AI's core security features. Every scenario triggers live FastAPI backend processing, Web Speech API speech synthesis, and real-time database logging.
              </p>
            </div>
          </div>

          {/* 4 Scenario Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specifications.map((spec, i) => (
              <div key={i} className={`p-5 rounded-2xl border space-y-3 ${spec.color}`}>
                <div className="flex items-center gap-2.5 font-orbitron font-bold text-sm text-white">
                  <spec.icon className="w-5 h-5" />
                  <span>{spec.title}</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {spec.description}
                </p>
                <div className="pt-2 border-t border-white/10 space-y-1.5 text-xs">
                  {spec.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-200 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-purple-500/30 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-sans">© 2026 CYBERGUARD AI — Live Product Demo Controls</span>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-400 text-black font-orbitron font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all cursor-pointer"
            >
              CLOSE SPECIFICATION
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
