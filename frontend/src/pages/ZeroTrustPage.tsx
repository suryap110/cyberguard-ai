import React, { useState } from 'react';
import { Lock, ShieldCheck, AlertTriangle, Key, Cpu, RefreshCw, CheckCircle2 } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const ZeroTrustPage: React.FC = () => {
  const [trustScore, setTrustScore] = useState(98);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'warning' | 'error', title: string, message: string) => {
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
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <Lock className="w-8 h-8 text-cyan-400" />
          ZERO-TRUST PERIMETER & CONTINUOUS AUTHENTICATION
        </h1>
        <p className="text-sm text-slate-400 mt-1">Never Trust, Always Verify. Real-time dynamic trust scoring based on location velocity and FIDO2 keys.</p>
      </div>

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

        <div className="flex gap-3">
          <button
            onClick={handleSimulateHijack}
            className="px-5 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-mono text-xs font-bold hover:bg-red-500 hover:text-white transition-all"
          >
            Simulate Session Hijack
          </button>
          <button
            onClick={handleEnforceStepUp}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-mono text-xs font-bold hover:bg-emerald-400 transition-all"
          >
            Verify FIDO2 Step-Up Key
          </button>
        </div>
      </div>
    </div>
  );
};