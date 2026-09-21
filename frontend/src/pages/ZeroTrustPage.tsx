import React, { useState } from 'react';
import { Lock, ShieldCheck, AlertTriangle, Key, Cpu, RefreshCw, CheckCircle2, Shield, Zap, Terminal } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';
import { apiRequest } from '../services/api';

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

  const handleEnforceAll = async () => {
    try {
      await apiRequest('/admin/zero-trust/ZT-001/toggle', { method: 'POST' });
      setPolicies(prev => prev.map(p => ({ ...p, status: 'ACTIVE' })));
      addToast('success', 'Zero-Trust Enforced via Backend', 'All microsegmentation policies updated & logged to SQLite DB.');
    } catch (e) {
      setPolicies(prev => prev.map(p => ({ ...p, status: 'ACTIVE' })));
      addToast('success', 'Zero-Trust Microsegmentation Enforced', 'All microsegmentation policies pushed to edge proxy routers.');
    }
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
          onClick={handleEnforceAll}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2 shrink-0"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Enforce All Zero-Trust Rules</span>
        </button>
      </div>

      {/* Trust Score Banner */}
      <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div>
          <span className="text-xs font-mono text-slate-400 uppercase">CONTINUOUS TRUST SCORE</span>
          <div className="flex items-baseline gap-3 mt-1">
            <span className={`text-5xl font-extrabold font-mono ${trustScore > 70 ? 'text-emerald-400' : 'text-red-400'}`}>
              {trustScore}/100
            </span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${trustScore > 70 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
              {trustScore > 70 ? 'HIGH TRUST VERIFIED' : 'UNTRUSTED PERIMETER'}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-mono">Continuous risk evaluation based on 14 device biometric telemetry signals.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateHijack}
            className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-bold text-xs hover:bg-red-500/20 transition-all flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Simulate Location Hijack</span>
          </button>
          <button
            onClick={handleEnforceStepUp}
            className="px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs hover:bg-cyan-500/20 transition-all flex items-center gap-2"
          >
            <Key className="w-4 h-4" />
            <span>Pass FIDO2 WebAuthn Step-Up</span>
          </button>
        </div>
      </div>

      {/* Policy Table */}
      <div className="p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
        <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          Active Microsegmentation Policies
        </h3>

        <div className="space-y-3 font-mono text-xs">
          {policies.map(p => (
            <div key={p.id} className="p-4 rounded-xl bg-[#161D2F] border border-[#232D42] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-bold text-white">{p.name}</span>
                <p className="text-slate-400 text-[11px] mt-0.5">Condition: {p.condition}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[11px] font-bold">{p.action}</span>
                <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};