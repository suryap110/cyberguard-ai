import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Link2, MessageSquare, CreditCard, Bot, ShieldCheck, Smartphone, KeyRound, 
  AlertTriangle, ArrowRight, FileText, Sparkles, CheckCircle2, Lock, ShieldAlert, X,
  Search, ArrowUpRight, ArrowDownRight, Activity, ChevronLeft, ChevronRight, Cpu, Hexagon, Shield
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';
import { soundFx } from '../utils/audioSfx';

export const ConsumerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [sweeping, setSweeping] = useState(false);
  const [showLockdownModal, setShowLockdownModal] = useState(false);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleQuickSweep = () => {
    setSweeping(true);
    setTimeout(() => {
      setSweeping(false);
      addToast('success', 'Security Sweep Complete', 'Scanned 3 devices, 12 transactions, 0 active threats detected.');
    }, 1500);
  };

  const handleEmergencyLockdown = () => {
    setShowLockdownModal(true);
    addToast('warning', 'EMERGENCY LOCKDOWN INITIATED', 'Freezing active sessions, revoking OAuth tokens, and enforcing FIDO2 biometric step-up.');
  };

  const personalSignalRows = [
    { name: 'HDFC Savings Account Safety', val: 95, color: 'bg-cyan-400' },
    { name: 'Trusted Device Hardware Fingerprint', val: 88, color: 'bg-cyan-400' },
    { name: 'UPI Wire Baseline Protection', val: 94, color: 'bg-indigo-400' },
    { name: 'SIM Swap & OTP Interception', val: 91, color: 'bg-cyan-400' },
    { name: 'Identity & Passkey Security', val: 90, color: 'bg-cyan-400' }
  ];

  const consumerDetections = [
    { name: 'Suspicious ₹85,000 Wire Attempt', status: 'Blocked', statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', time: 'Just now' },
    { name: 'Phishing SMS Link Encountered', status: 'Blocked', statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', time: '14 min ago' },
    { name: 'WhatsApp APK Trojan Scan', status: 'Clean', statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30', time: '1 hour ago' },
    { name: 'Dark Web Dump Exposure Check', status: 'Zero Breach', statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', time: '2 hours ago' }
  ];

  const userActivityData = [
    { time: '00:00', safe: 12, risk: 0 },
    { time: '04:00', safe: 25, risk: 2 },
    { time: '08:00', safe: 40, risk: 0 },
    { time: '12:00', safe: 85, risk: 1 },
    { time: '16:00', safe: 60, risk: 0 },
    { time: '20:00', safe: 75, risk: 0 }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-[1700px] mx-auto font-mono text-[#F8FAFC]">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header Controls */}
      <div className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 border-purple-500/40">
        <div>
          <div className="flex items-center gap-3">
            <span className="section-badge">
              <span className="badge-glow-dot"></span>
              <span>PERSONAL CITIZEN SHIELD ACTIVE</span>
            </span>
            <span className="text-xs text-purple-300 font-orbitron">NEXUS HUD CONTROL VIEW</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-white mt-2 flex items-center gap-3 font-orbitron">
            <Hexagon className="w-8 h-8 text-cyan-400" />
            PERSONAL CYBER VAULT & SECURITY CENTER
          </h1>
        </div>

        <div className="flex items-center gap-3 font-orbitron">
          <button
            onClick={() => { soundFx.playAlarm(); handleEmergencyLockdown(); }}
            className="px-4 py-2.5 rounded-xl bg-red-500/20 border border-red-500/50 text-red-400 text-xs font-bold hover:bg-red-500 hover:text-white shadow-cyber-glow transition-all flex items-center gap-2 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Emergency Lockdown</span>
          </button>

          <button
            onClick={() => { soundFx.playLaserScan(); handleQuickSweep(); }}
            disabled={sweeping}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>{sweeping ? 'SWEEPING PERIMETER...' : 'Run Quick Sweep'}</span>
          </button>
        </div>
      </div>

      {/* 3-COLUMN SCI-FI HUD DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* COLUMN 1: SYSTEM OVERVIEW (LEFT CARD) */}
        <div className="lg:col-span-4 glass-card p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-white font-orbitron tracking-wider">SYSTEM OVERVIEW</h3>
                <p className="text-[10px] text-slate-400 font-sans">Personal security diagnostics & score</p>
              </div>
              <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/30">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            {/* Circular Sci-Fi Radial Arc Gauge (92% OPTIMAL) */}
            <div className="relative w-48 h-48 mx-auto my-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/40 hud-ring-spin"></div>
              <div className="absolute inset-3 rounded-full border-2 border-dotted border-indigo-400/50 hud-ring-reverse"></div>
              
              <div className="w-32 h-32 rounded-full bg-[#060911] border-2 border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.4)] flex flex-col items-center justify-center text-center">
                <span className="text-[9px] text-cyan-400 uppercase tracking-widest">CYBER SCORE</span>
                <span className="text-3xl font-extrabold text-white tracking-tight drop-shadow-[0_0_10px_#00F0FF]">{user?.security_score || 92}<span className="text-lg text-cyan-400">%</span></span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold mt-1">OPTIMAL</span>
              </div>
            </div>

            {/* 4 Micro-Stat Pills */}
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div className="p-2 rounded-xl bg-[#161D2F] border border-[#00F0FF]/20">
                <span className="text-slate-400 block">ACCOUNT</span>
                <span className="text-cyan-400 font-bold">95%</span>
              </div>
              <div className="p-2 rounded-xl bg-[#161D2F] border border-[#00F0FF]/20">
                <span className="text-slate-400 block">DEVICE</span>
                <span className="text-cyan-400 font-bold">88%</span>
              </div>
              <div className="p-2 rounded-xl bg-[#161D2F] border border-indigo-500/30">
                <span className="text-slate-400 block">WIRE</span>
                <span className="text-emerald-400 font-bold">94%</span>
              </div>
              <div className="p-2 rounded-xl bg-[#161D2F] border border-[#00F0FF]/20">
                <span className="text-slate-400 block">IDENTITY</span>
                <span className="text-cyan-400 font-bold">90%</span>
              </div>
            </div>
          </div>

          {/* ACTIVE PROTECTION SIGNALS */}
          <div className="space-y-3 pt-4 border-t border-[#00F0FF]/20">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white font-bold uppercase">ACTIVE SIGNALS</span>
              <span className="text-emerald-400 text-[10px]">ALL SAFE</span>
            </div>

            <div className="space-y-2 text-xs">
              {personalSignalRows.map((sig, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      {sig.name}
                    </span>
                    <span className="text-cyan-400 font-bold">{sig.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-[#161D2F] rounded-full overflow-hidden">
                    <div className={`h-full ${sig.color} rounded-full`} style={{ width: `${sig.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLUMN 2: GLOBAL NETWORK (CENTER CARD) */}
        <div className="lg:col-span-5 glass-card p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3 font-orbitron">
              <div>
                <h3 className="text-sm font-extrabold text-white tracking-wider">GLOBAL NETWORK</h3>
                <p className="text-[10px] text-slate-400 font-sans">Personal protected assets and network telemetry</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#0B1220] border border-cyan-500/30 text-[10px] text-cyan-400 font-bold">CITIZEN SHIELD</span>
            </div>

            {/* World Map SVG Canvas */}
            <div className="relative my-4 h-48 rounded-2xl bg-[#060911] border border-[#00F0FF]/20 overflow-hidden flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.15),transparent_70%)]"></div>
              
              <svg className="w-full h-full opacity-60" viewBox="0 0 1000 500" fill="none">
                <path d="M150,150 Q200,100 300,150 T450,200 T600,150 T800,200" stroke="rgba(0,240,255,0.2)" strokeWidth="1" fill="none" />
                <circle cx="480" cy="160" r="6" fill="#00F0FF" className="animate-ping" />
                <circle cx="320" cy="280" r="5" fill="#10B981" />
              </svg>

              <div className="absolute bottom-2 left-2 text-[10px] text-cyan-400 font-bold bg-[#060911]/80 px-2 py-1 rounded border border-cyan-400/30">
                ● Chennai Bank Gateway Protected
              </div>
            </div>

            {/* 4 Stat Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3 rounded-2xl bg-[#161D2F] border border-[#00F0FF]/20">
                <span className="text-[10px] text-slate-400 block uppercase">ASSETS</span>
                <p className="text-sm font-extrabold text-white mt-0.5">4 Active</p>
                <span className="text-[9px] text-emerald-400 font-bold">100% Safe</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#161D2F] border border-[#00F0FF]/20">
                <span className="text-[10px] text-slate-400 block uppercase">DEVICES</span>
                <p className="text-sm font-extrabold text-white mt-0.5">3 Trusted</p>
                <span className="text-[9px] text-emerald-400 font-bold">Verified</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#161D2F] border border-indigo-500/30">
                <span className="text-[10px] text-slate-400 block uppercase">WIRES PROTECTED</span>
                <p className="text-sm font-extrabold text-emerald-400 mt-0.5">12 Wires</p>
                <span className="text-[9px] text-emerald-400 font-bold">₹85,000 Blocked</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#161D2F] border border-emerald-500/30">
                <span className="text-[10px] text-slate-400 block uppercase">BREACH EXPOSURE</span>
                <p className="text-sm font-extrabold text-emerald-400 mt-0.5">ZERO</p>
                <span className="text-[9px] text-emerald-400 font-bold">0 Leaks</span>
              </div>
            </div>
          </div>

          {/* USER ACTIVITY AREA CHART */}
          <div className="space-y-3 pt-4 border-t border-[#00F0FF]/20">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white font-bold uppercase">PROTECTION VELOCITY</span>
              <span className="text-slate-400 text-[10px]">24 HOURS</span>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userActivityData}>
                  <defs>
                    <linearGradient id="colorUserSafe" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00F0FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#64748B" fontSize={9} tickLine={false} />
                  <YAxis stroke="#64748B" fontSize={9} tickLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: '#060911', borderColor: '#00F0FF', borderRadius: '12px', color: '#FFF' }} />
                  <Area type="monotone" dataKey="safe" stroke="#00F0FF" strokeWidth={2} fillOpacity={1} fill="url(#colorUserSafe)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* COLUMN 3: SECURITY STATUS (RIGHT CARD WITH PURPLE NEON ACCENTS) */}
        <div className="lg:col-span-3 glass-card p-6 flex flex-col justify-between space-y-6 border-purple-500/40">
          <div>
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-3 font-orbitron">
              <div>
                <h3 className="text-sm font-extrabold text-white tracking-wider">SECURITY STATUS</h3>
                <p className="text-[10px] text-slate-400 font-sans">Personal shield and threat detection</p>
              </div>
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-400/30">
                <Shield className="w-4 h-4" />
              </span>
            </div>

            {/* Glowing Hologram Shield Ring */}
            <div className="relative w-44 h-44 mx-auto my-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-purple-500/50 hud-ring-spin"></div>
              <div className="absolute inset-2 rounded-full border border-purple-400/30"></div>
              
              <div className="w-30 h-30 rounded-full bg-[#060911] border-2 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] flex flex-col items-center justify-center text-center p-3">
                <Shield className="w-8 h-8 text-purple-400 mb-1 animate-pulse" />
                <span className="text-[8px] text-slate-400 uppercase tracking-widest">SHIELD LEVEL</span>
                <span className="text-sm font-extrabold text-purple-300 uppercase tracking-wider">MAXIMUM</span>
                <span className="text-[8px] text-emerald-400 uppercase mt-0.5">VAULT PROTECTED</span>
              </div>
            </div>
          </div>

          {/* PERSONAL THREAT DETECTION LIST */}
          <div className="space-y-3 pt-4 border-t border-purple-500/20">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-white font-bold uppercase">RECENT AUDIT</span>
              <button onClick={() => navigate('/alerts')} className="text-purple-400 text-[10px] hover:underline">VIEW ALL</button>
            </div>

            <div className="space-y-2 text-xs">
              {consumerDetections.map((cd, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#161D2F] border border-purple-500/20 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-[11px]">{cd.name}</p>
                    <p className="text-[9px] text-slate-400">{cd.time}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${cd.statusColor}`}>
                    {cd.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* EMERGENCY LOCKDOWN MODAL */}
      {showLockdownModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#060911] border border-red-500/50 rounded-3xl p-6 shadow-2xl space-y-4 text-center">
            <button onClick={() => setShowLockdownModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <div className="p-4 rounded-2xl bg-red-500/20 text-red-400 w-fit mx-auto border border-red-500/40 animate-pulse">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-mono">EMERGENCY PERIMETER LOCKDOWN</h3>
              <p className="text-xs font-mono text-red-400 mt-1 uppercase">Full Account Isolation Protocol Activated</p>
            </div>
            <button
              onClick={() => {
                setShowLockdownModal(false);
                addToast('success', 'Lockdown Cleared', 'Biometric step-up key verified. Account security restored.');
              }}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all font-mono"
            >
              VERIFY BIOMETRIC KEY & UNLOCK PERIMETER
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
