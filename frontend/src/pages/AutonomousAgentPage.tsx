import React, { useState } from 'react';
import { Bot, Radio, ShieldCheck, CheckCircle2, Play, RefreshCw, Terminal, Zap, Power } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const AutonomousAgentPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [running, setRunning] = useState(false);
  const [agentActive, setAgentActive] = useState(true);
  const [agentLogs, setAgentLogs] = useState<string[]>([
    '[AUTONOMOUS AI AGENT] Initializing background perimeter telemetry worker...',
    '[AUTONOMOUS AI AGENT] Monitoring 10,000+ packets/sec across network edge...'
  ]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleStartAgent = () => {
    setRunning(true);
    setAgentLogs(prev => [...prev, '[AUTONOMOUS AI AGENT] Launching high-priority perimeter attack chain sweep...']);
    setTimeout(() => {
      setAgentLogs(prev => [
        ...prev,
        '✓ Correlated 42 background telemetry events across network edge',
        '✓ Identified 1 phishing domain impersonation (secure-bank-verify-login.com)',
        '✓ Auto-drafted SOAR playbook #SOAR-PB-001 execution ticket',
        '✓ Injected DNS Sinkhole block rule into edge routers',
        '✓ Autonomous AI Agent sweep complete: 0 uncontained threats remaining.'
      ]);
      setRunning(false);
      addToast('success', 'Autonomous Sweep Complete', 'Autonomous AI Agent neutralized 1 threat and drafted SOAR ticket.');
    }, 1500);
  };

  const toggleAutonomousMode = () => {
    setAgentActive(prev => !prev);
    addToast(
      agentActive ? 'warning' : 'success',
      'Autonomous Guard Status Updated',
      `Autonomous AI Background Agent is now ${agentActive ? 'PAUSED' : 'ALWAYS ACTIVE'}.`
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232D42] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border flex items-center gap-1.5 ${
              agentActive ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
            }`}>
              <span className={`w-2 h-2 rounded-full ${agentActive ? 'bg-emerald-400 animate-ping' : 'bg-red-500'}`}></span>
              AUTONOMOUS AI AGENT {agentActive ? 'ACTIVE & MONITORING' : 'PAUSED'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 flex items-center gap-3">
            <Bot className="w-8 h-8 text-amber-400" />
            AUTONOMOUS AI SOC SECURITY AGENT
          </h1>
          <p className="text-sm text-slate-400 mt-1">Autonomous background agent performing continuous perimeter sweeps, attack chain correlation, and automated incident drafting.</p>
        </div>

        <button
          onClick={toggleAutonomousMode}
          className={`px-5 py-3 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 shrink-0 ${
            agentActive ? 'bg-emerald-500 text-slate-950 shadow-cyber-glow' : 'bg-red-500 text-white'
          }`}
        >
          <Power className="w-4 h-4" />
          <span>{agentActive ? 'AGENT ALWAYS ACTIVE' : 'ACTIVATE AUTONOMOUS AGENT'}</span>
        </button>
      </div>

      {/* Agent Control Box */}
      <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#232D42] pb-3">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            Live Autonomous Agent Telemetry Log
          </h3>
          <button
            onClick={handleStartAgent}
            disabled={running}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{running ? 'SWEEP IN PROGRESS...' : 'Trigger Immediate Agent Sweep'}</span>
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-[#161D2F] border border-[#232D42] font-mono text-xs text-emerald-400 space-y-2 max-h-80 overflow-y-auto">
          {agentLogs.map((l, i) => (
            <p key={i}>{l}</p>
          ))}
        </div>
      </div>
    </div>
  );
};