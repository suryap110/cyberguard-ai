import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, ShieldAlert, Zap, CheckCircle2, AlertTriangle, 
  Play, Lock, RefreshCw, Cpu, Database, ChevronRight, Activity, Bell 
} from 'lucide-react';
import { soundFx } from '../../utils/audioSfx';

interface Incident {
  id: string;
  title: string;
  target: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  status: 'ACTIVE' | 'TRIAGED' | 'CONTAINED';
  timestamp: string;
}

export const SOCTacticalProtocolConsole: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([
    { id: 'INC-9041', title: 'SQL Injection Attack Vector', target: '/api/v1/auth/login', severity: 'CRITICAL', status: 'ACTIVE', timestamp: '10s ago' },
    { id: 'INC-9040', title: 'Deepfake AI Voice Impersonation', target: 'SIP Gateway #4', severity: 'HIGH', status: 'ACTIVE', timestamp: '1m ago' },
    { id: 'INC-9039', title: 'Rogue UPI VPA Payee Claim', target: 'NPCI Bridge Node', severity: 'HIGH', status: 'TRIAGED', timestamp: '3m ago' },
    { id: 'INC-9038', title: 'Android APK Overlay Trojan', target: 'User Endpoint #892', severity: 'CRITICAL', status: 'CONTAINED', timestamp: '6m ago' },
  ]);

  const [executingPlaybook, setExecutingPlaybook] = useState<string | null>(null);

  const handleTriageIncident = (id: string) => {
    soundFx.playLevelUp();
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'CONTAINED' } : inc));
  };

  const handleRunPlaybook = (name: string) => {
    soundFx.playLaserScan();
    setExecutingPlaybook(name);
    setTimeout(() => {
      setExecutingPlaybook(null);
      setIncidents(prev => prev.map(inc => ({ ...inc, status: 'CONTAINED' })));
    }, 1800);
  };

  return (
    <div className="glass-card p-6 md:p-7 space-y-5 relative overflow-hidden border-cyan-500/40 shadow-cyber-glow font-mono text-xs">
      <div className="cyber-box-decor" />

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-500/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-cyber-glow">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-white font-orbitron flex items-center gap-2">
              <span>SIEM INCIDENT TRIAGE & SOAR PROTOCOL CONSOLE</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">LIVE AGENT</span>
            </h3>
            <p className="text-[10px] text-slate-400 font-sans mt-0.5">Automated incident response playbooks & containment protocol triggers</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-400 font-orbitron">Triage Engine:</span>
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[10px] font-bold font-orbitron">
            AUTOMATED
          </span>
        </div>
      </div>

      {/* MAIN TWO-COLUMN WORKSPACE: INCIDENTS + PLAYBOOKS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* INCIDENT TRIAGE STREAM (7 COLUMNS) */}
        <div className="md:col-span-7 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-orbitron text-slate-300">
            <span className="flex items-center gap-1.5 font-bold">
              <Bell className="w-3.5 h-3.5 text-cyan-400" />
              <span>ACTIVE SIEM INCIDENTS</span>
            </span>
            <span className="text-[10px] text-slate-500">{incidents.filter(i => i.status === 'ACTIVE').length} Active Alerts</span>
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {incidents.map((inc) => (
              <div 
                key={inc.id}
                className={`p-3 rounded-xl border transition-all flex items-center justify-between gap-3 text-[11px] ${
                  inc.status === 'CONTAINED'
                    ? 'bg-[#050811] border-emerald-500/30 text-slate-400 opacity-75'
                    : inc.severity === 'CRITICAL'
                    ? 'bg-red-950/20 border-red-500/40 text-red-200'
                    : 'bg-[#0B1220] border-purple-500/30 text-white'
                }`}
              >
                <div className="space-y-0.5 text-left flex-1 truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-orbitron font-bold text-white text-xs">{inc.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                      inc.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {inc.severity}
                    </span>
                  </div>
                  <p className="font-sans text-[11px] text-slate-200 truncate">{inc.title}</p>
                  <p className="text-[9px] text-slate-400 font-mono">Target: {inc.target} • {inc.timestamp}</p>
                </div>

                {inc.status === 'ACTIVE' ? (
                  <button
                    onClick={() => handleTriageIncident(inc.id)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-orbitron font-bold text-[10px] hover:bg-cyan-400 hover:text-black transition-all shrink-0 cursor-pointer"
                  >
                    CONTAIN
                  </button>
                ) : (
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[9px] font-orbitron font-bold rounded-lg shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>CONTAINED</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* AUTOMATED SOAR PLAYBOOK CONTROLS (5 COLUMNS) */}
        <div className="md:col-span-5 p-4 rounded-xl bg-[#050811] border border-purple-500/30 space-y-3 flex flex-col justify-between">
          <span className="text-[11px] font-orbitron font-bold text-purple-400 block border-b border-purple-500/20 pb-2">
            ⚡ ONE-CLICK SOAR PLAYBOOKS
          </span>

          <div className="space-y-2 text-[10px]">
            <button
              onClick={() => handleRunPlaybook('Perimeter Lock')}
              disabled={executingPlaybook !== null}
              className="w-full p-2.5 rounded-lg bg-[#0B1220] border border-cyan-500/30 hover:border-cyan-400 text-slate-200 hover:text-white font-bold transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Zero-Trust Perimeter Lock</span>
              </div>
              <ChevronRight className="w-3 h-3 text-cyan-400" />
            </button>

            <button
              onClick={() => handleRunPlaybook('Honeytokens')}
              disabled={executingPlaybook !== null}
              className="w-full p-2.5 rounded-lg bg-[#0B1220] border border-purple-500/30 hover:border-purple-400 text-slate-200 hover:text-white font-bold transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span>Deploy AI Decoy Honeytokens</span>
              </div>
              <ChevronRight className="w-3 h-3 text-purple-400" />
            </button>

            <button
              onClick={() => handleRunPlaybook('Flush Sessions')}
              disabled={executingPlaybook !== null}
              className="w-full p-2.5 rounded-lg bg-[#0B1220] border border-amber-500/30 hover:border-amber-400 text-slate-200 hover:text-white font-bold transition-all flex items-center justify-between text-left cursor-pointer group"
            >
              <div className="flex items-center gap-2">
                <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${executingPlaybook === 'Flush Sessions' ? 'animate-spin' : ''}`} />
                <span>Flush Flagged User Sessions</span>
              </div>
              <ChevronRight className="w-3 h-3 text-amber-400" />
            </button>
          </div>

          {executingPlaybook && (
            <div className="p-2 rounded bg-purple-500/20 text-purple-300 text-[10px] text-center font-orbitron animate-pulse border border-purple-500/40">
              Executing {executingPlaybook}...
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
