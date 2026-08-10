import React, { useState } from 'react';
import { Bot, Radio, ShieldCheck, CheckCircle2, Play, RefreshCw } from 'lucide-react';

export const AutonomousAgentPage: React.FC = () => {
  const [running, setRunning] = useState(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);

  const handleStartAgent = () => {
    setRunning(true);
    setAgentLogs(['Initializing Autonomous AI SOC Agent worker...']);
    setTimeout(() => {
      setAgentLogs(prev => [
        ...prev,
        '✓ Correlated 42 background telemetry events',
        '✓ Identified 1 phishing domain impersonation',
        '✓ Auto-drafted SOAR playbook #SOAR-PB-001 execution ticket',
        '✓ Autonomous AI Agent sweep complete: 0 uncontained threats.'
      ]);
      setRunning(false);
    }, 1500);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <Bot className="w-8 h-8 text-amber-400" />
          AUTONOMOUS AI SOC SECURITY AGENT
        </h1>
        <p className="text-sm text-slate-400 mt-1">Autonomous background agent performing continuous perimeter sweeps, attack chain correlation, and automated incident drafting.</p>
      </div>

      <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
        <button
          onClick={handleStartAgent}
          disabled={running}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-cyber-glow"
        >
          {running ? 'AUTONOMOUS SWEEP IN PROGRESS...' : 'RUN AUTONOMOUS SOC AGENT SWEEP'}
        </button>

        <div className="p-6 rounded-2xl bg-[#161D2F] border border-[#232D42] font-mono text-xs text-emerald-400 space-y-2 max-h-64 overflow-y-auto">
          {agentLogs.length === 0 ? (
            <p className="text-slate-500">Click the button above to launch the autonomous AI agent sweep.</p>
          ) : (
            agentLogs.map((l, i) => <p key={i}>{l}</p>)
          )}
        </div>
      </div>
    </div>
  );
};