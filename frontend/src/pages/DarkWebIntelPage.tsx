import React, { useState } from 'react';
import { ShieldAlert, Search, Database, CheckCircle2, RefreshCw } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const DarkWebIntelPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('cyberguard.demo');
  const [searching, setSearching] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [threatLeaks, setThreatLeaks] = useState([
    {
      id: 'leak-1',
      title: 'Stealer Log Exposure #LOG-9812',
      source: 'RussianMarket / RedLine Stealer Dump',
      domain: 'cyberguard.demo',
      exposedAccount: 'user@cyberguard.demo',
      exposureType: 'Plaintext Password & Auth Cookies',
      riskScore: 96,
      severity: 'CRITICAL',
      detectedDate: '3 Hours Ago',
      status: 'UNRESOLVED'
    },
    {
      id: 'leak-2',
      title: 'Corporate Employee Combo List Dump',
      source: 'BreachForums / Darknet Marketplace',
      domain: 'cyberguard.demo',
      exposedAccount: 'analyst@cyberguard.demo',
      exposureType: 'Hashed Credentials & Secret Answers',
      riskScore: 84,
      severity: 'HIGH',
      detectedDate: 'Yesterday',
      status: 'CONTAINED'
    },
    {
      id: 'leak-3',
      title: 'Session Cookie Token Hijack',
      source: 'Raccoon Stealer v2 Dump',
      domain: 'cyberguard.demo',
      exposedAccount: 'finance_admin@cyberguard.demo',
      exposureType: 'Active Session Token & IP Fingerprint',
      riskScore: 92,
      severity: 'CRITICAL',
      detectedDate: '2 Days Ago',
      status: 'UNRESOLVED'
    }
  ]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleDarkWebSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      addToast('info', 'Dark Web Search Complete', `Scanned 42 darknet forums & stealer markets for '${searchQuery}'.`);
    }, 1200);
  };

  const handleExecutePlaybook = (id: string, account: string) => {
    setThreatLeaks(prev => prev.map(l => l.id === id ? { ...l, status: 'CONTAINED' } : l));
    addToast('success', 'Automated SOAR Execution', `Invalidated session tokens & triggered force password reset for ${account}.`);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232D42] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-red-500/20 text-red-400 font-mono text-xs font-bold flex items-center gap-1.5 border border-red-500/30">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              DARKNET INTELLIGENCE RADAR ACTIVE
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 flex items-center gap-3">
            <Database className="w-8 h-8 text-cyan-400" />
            DARK WEB THREAT INTELLIGENCE & STEALER LOG MONITOR
          </h1>
        </div>

        <button
          onClick={() => handleDarkWebSearch({ preventDefault: () => {} } as any)}
          disabled={searching}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-sm shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${searching ? 'animate-spin' : ''}`} />
          <span>{searching ? 'SCANNING DARKNET MARKETS...' : 'Run Deep Darknet Sweep'}</span>
        </button>
      </div>

      {/* Search Bar for Darknet Domain Lookup */}
      <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-3 shadow-2xl">
        <label className="text-xs font-mono text-slate-400 uppercase tracking-wider">Search Enterprise Domain / Employee Email across Stealer Logs</label>
        <form onSubmit={handleDarkWebSearch} className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#161D2F] border border-[#232D42] rounded-2xl focus-within:border-cyan-400 font-mono text-xs">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. cyberguard.demo or CEO email..."
              className="w-full bg-transparent text-white focus:outline-none"
            />
          </div>
          <button type="submit" className="px-6 py-3 rounded-2xl bg-[#161D2F] border border-[#232D42] text-cyan-400 font-bold text-xs hover:border-cyan-400">
            Lookup Darknet Intelligence
          </button>
        </form>
      </div>

      {/* Threat Leaks List */}
      <div className="bg-[#0F1420] border border-[#232D42] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-[#232D42] flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Detected Dark Web Exposures ({threatLeaks.length})</h3>
          <span className="text-xs font-mono text-red-400 font-bold">2 Critical Unresolved</span>
        </div>

        <div className="divide-y divide-[#232D42]">
          {threatLeaks.map((leak) => (
            <div key={leak.id} className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-[#161D2F] transition-all">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    leak.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {leak.severity} RISK {leak.riskScore}/100
                  </span>
                  <span className="text-xs font-mono text-slate-400">• Detected {leak.detectedDate}</span>
                </div>
                <h4 className="text-base font-bold text-white font-sans">{leak.title}</h4>
                <p className="text-xs font-mono text-slate-300">Target Account: <span className="text-cyan-400 font-bold">{leak.exposedAccount}</span></p>
                <p className="text-xs font-mono text-slate-400">Darknet Source: {leak.source} | Exposure: <span className="text-amber-400">{leak.exposureType}</span></p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {leak.status === 'CONTAINED' ? (
                  <span className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> CONTAINED
                  </span>
                ) : (
                  <button
                    onClick={() => handleExecutePlaybook(leak.id, leak.exposedAccount)}
                    className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-bold text-xs shadow-red-glow hover:bg-red-600 transition-all flex items-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Trigger Automated Containment</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};