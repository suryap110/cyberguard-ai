import React, { useState } from 'react';
import { Lock, ShieldCheck, AlertTriangle, Key, Cpu, RefreshCw, CheckCircle2, Shield, Zap, Terminal } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const ZeroTrustPage: React.FC = () => {
  const [trustScore, setTrustScore] = useState(98);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [policies, setPolicies] = useState([
    { id: 'pol-1', name: 'Strict Geo-Velocity Lockdown', condition: 'IP Geolocation Delta > 500 km within 30 min', action: 'FORCE_WEBAUTHN_2FA', status: 'ACTIVE' },
    { id: 'pol-2', name: 'High-Value Payment Step-Up', condition: 'Transfer Amount > ₹20,000', action: 'REQUIRE_BIOMETRIC_PIN', status: 'ACTIVE' },
    { id: 'pol-3', name: 'Untrusted UserAgent Quarantine', condition: 'Headless Browser / Unknown Curl Agent', action: 'TERMINATE_OAUTH_TOKEN', status: 'ACTIVE' }
  ]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleSimulateHijack = () => {
    setTrustScore(35);
    addToast('error', 'Zero-Trust Violation Triggered', 'Location jump & unrecognized UserAgent detected. Continuous trust score dropped to 35/100.');
  };

  const handleEnforceStepUp = () => {
    setTrustScore(98);
    addToast('success', 'Biometric Step-Up Verified', 'Hardware FIDO2 WebAuthn key validated. Continuous trust restored to 98/100.');
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#232D42] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/30">
              ZERO-TRUST ARCHITECTURE V3.0
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 flex items-center gap-3">
            <Lock className="w-8 h-8 text-cyan-400" />
            ZERO-TRUST PERIMETER & CONTINUOUS AUTHENTICATION
          </h1>
          <p className="text-sm text-slate-400 mt-1">Never Trust, Always Verify. Real-time dynamic trust scoring based on location velocity and FIDO2 keys.</p>
        </div>

        <button
          onClick={() => {
            setPolicies(prev => prev.map(p => ({ ...p, status: 'ACTIVE' })));
            addToast('success', 'Zero-Trust Microsegmentation Enforced', 'All microsegmentation policies pushed to edge proxy routers.');
          }}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Enforce All Zero-Trust Rules</span>
        </button>
      </div>

      {/* Trust Score Banner */}
      <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div>
          <span className="text-xs font-mono text-slate-400">CONTINUOUS TRUST SCORE</span>
          <h2 className="text-4xl font-extrabold font-mono text-white mt-1">
            {trustScore} <span className="text-xs text-slate-400">/ 100</span>
          </h2>
          <p className={`text-xs font-mono font-bold mt-1 ${trustScore >= 80 ? 'text-emerald-400' : 'text-red-400'}`}>
            {trustScore >= 80 ? '✓ HIGH TRUST POSTURE' : '🚨 ZERO-TRUST STEP-UP CHALLENGE REQUIRED'}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSimulateHijack}
            className="px-5 py-3 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-xs font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-1.5"
          >
            <AlertTriangle className="w-4 h-4" /> Simulate Session Hijack
          </button>
          <button
            onClick={handleEnforceStepUp}
            className="px-5 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-mono text-xs font-extrabold shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-1.5"
          >
            <Key className="w-4 h-4" /> Verify FIDO2 Step-Up Key
          </button>
        </div>
      </div>

      {/* Micro-segmentation Policies Table */}
      <div className="bg-[#0F1420] border border-[#232D42] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-[#232D42] flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Active Micro-Segmentation Policies ({policies.length})</h3>
          <span className="text-xs font-mono text-emerald-400 font-bold">100% Policy Coverage</span>
        </div>

        <div className="divide-y divide-[#232D42] font-mono text-xs">
          {policies.map(p => (
            <div key={p.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#161D2F] transition-all">
              <div>
                <p className="font-bold text-white text-sm font-sans">{p.name}</p>
                <p className="text-slate-400 mt-0.5">Condition: <span className="text-amber-400">{p.condition}</span></p>
                <p className="text-slate-500">Action: <span className="text-cyan-400">{p.action}</span></p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30 w-fit">
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};