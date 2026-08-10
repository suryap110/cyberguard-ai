import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowRight, CheckCircle2, Lock, Cpu, Eye, Radio, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080B11] text-[#F8FAFC] overflow-hidden">
      {/* Navigation Bar */}
      <nav className="h-20 border-b border-[#232D42] bg-[#0F1420]/80 backdrop-blur-lg px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-400 text-white shadow-cyber-glow">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <span className="font-extrabold text-xl tracking-wider">CYBERGUARD<span className="text-cyan-400">AI</span></span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard')} className="px-5 py-2.5 rounded-xl bg-[#161D2F] border border-[#232D42] hover:border-sky-500/50 text-sm font-semibold transition-all">
            Consumer Guard
          </button>
          <button onClick={() => navigate('/soc')} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-bold text-sm shadow-cyber-glow transition-all">
            Enter SOC Command
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-cyan-400 text-xs font-mono mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>PROACTIVE AI CYBERSECURITY ENGINE V1.0</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto"
        >
          Your AI-Powered Shield Against Digital Fraud.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Detect phishing, scam messages, account takeovers, and suspicious transactions before they become real-world losses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-base shadow-cyber-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>Protect Yourself Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate('/simulation')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#161D2F] border border-[#232D42] hover:border-amber-500/50 text-amber-400 font-bold text-base transition-all flex items-center justify-center gap-2"
          >
            <span>Run Hackathon Attack Simulation</span>
            <Radio className="w-5 h-5 animate-pulse" />
          </button>
        </motion.div>

        {/* Live Threat Hero Ticker */}
        <div className="mt-16 max-w-4xl mx-auto p-4 rounded-2xl bg-[#0F1420]/90 border border-[#232D42] flex items-center justify-between text-xs font-mono text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-400 font-bold uppercase">LIVE PROTECTION</span>
          </div>
          <div className="flex items-center gap-6 overflow-hidden text-slate-400">
            <span>● Phishing domain blocked (96/100)</span>
            <span>● Suspicious ₹85,000 transfer intercepted</span>
            <span>● Account takeover correlation active</span>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#232D42]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] hover:border-sky-500/40 transition-all">
            <div className="p-4 rounded-2xl bg-sky-500/10 text-cyan-400 w-fit mb-6">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Detect</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Multi-signal telemetry analyzing URL structures, SMS NLP urgency, transaction anomalies, and login locations.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] hover:border-cyan-500/40 transition-all">
            <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit mb-6">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Explain</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Natural-language explainable AI breaking down exact evidence, risk factors, confidence ratings, and root causes.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] hover:border-emerald-500/40 transition-all">
            <div className="p-4 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit mb-6">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Prevent</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automated session revoking, transaction freezing, biometric step-up 2FA, and attack-graph correlation.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
