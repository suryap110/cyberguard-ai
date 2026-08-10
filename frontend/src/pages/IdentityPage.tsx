import React, { useState } from 'react';
import { UserCheck, ShieldCheck, KeyRound, AlertTriangle, Smartphone, Search, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const IdentityPage: React.FC = () => {
  const [emailCheck, setEmailCheck] = useState('user@cyberguard.demo');
  const [checking, setChecking] = useState(false);
  const [breachResult, setBreachResult] = useState<any>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'warning' | 'error', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleCheckBreach = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailCheck.trim()) return;

    setChecking(true);
    setBreachResult(null);

    setTimeout(() => {
      setChecking(false);
      if (emailCheck.includes('breach') || emailCheck.includes('test')) {
        setBreachResult({
          exposed: true,
          breaches: [
            { name: 'Collection #1 Dump', date: '2023', details: 'Hashed Passwords & Email records exposed' },
            { name: 'E-Commerce Breach 2022', date: '2022', details: 'Full Name & Shipping Address exposed' }
          ]
        });
        addToast('error', 'Exposures Found', `Email ${emailCheck} found in 2 historical data dumps.`);
      } else {
        setBreachResult({
          exposed: false,
          breaches: []
        });
        addToast('success', 'Identity Clean', `Zero breach exposures found for ${emailCheck}.`);
      }
    }, 1200);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <UserCheck className="w-8 h-8 text-cyan-400" />
          IDENTITY & POSTURE SECURITY
        </h1>
        <p className="text-sm text-slate-400 mt-1">Monitor personal digital identity exposure, active sessions, and credential security posture.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-2">
          <span className="text-xs font-mono text-slate-400">IDENTITY STATUS</span>
          <p className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" /> PROTECTED
          </p>
        </div>
        <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-2">
          <span className="text-xs font-mono text-slate-400">BREACH EXPOSURE</span>
          <p className="text-xl font-bold text-white">0 Known Breaches</p>
        </div>
        <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-2">
          <span className="text-xs font-mono text-slate-400">PASSWORD AGE</span>
          <p className="text-xl font-bold text-sky-400">45 Days Old</p>
        </div>
      </div>

      {/* Interactive Email Breach Exposure Checker */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 shadow-2xl">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-base font-bold text-white">Credential Breach Exposure Checker</h3>
        </div>
        <p className="text-xs text-slate-400">Scan known data dump repositories for compromised email credentials.</p>

        <form onSubmit={handleCheckBreach} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-[#161D2F] border border-[#232D42] rounded-2xl focus-within:border-cyan-400">
            <Search className="w-4 h-4 text-slate-500" />
            <input
              type="email"
              value={emailCheck}
              onChange={(e) => setEmailCheck(e.target.value)}
              placeholder="Enter email to check..."
              className="w-full bg-transparent text-white focus:outline-none font-mono text-xs"
            />
          </div>
          <button
            type="submit"
            disabled={checking}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-xs shadow-cyber-glow hover:scale-105 transition-all"
          >
            {checking ? 'SCANNING DUMPS...' : 'CHECK BREACH STATUS'}
          </button>
        </form>

        {breachResult && (
          <div className={`p-4 rounded-2xl border font-mono text-xs space-y-2 ${
            breachResult.exposed ? 'bg-red-500/10 border-red-500/30 text-red-300' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
          }`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              {breachResult.exposed ? <ShieldAlert className="w-5 h-5 text-red-400" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              <span>{breachResult.exposed ? 'EXPOSURES DETECTED IN DATA DUMPS' : 'NO BREACH EXPOSURES FOUND'}</span>
            </div>
            <p>{breachResult.exposed ? 'Found in 2 historical breach lists.' : 'Your email record is clean across verified data dumps.'}</p>
          </div>
        )}
      </div>

      <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4">
        <h3 className="text-base font-bold text-white">Active Authenticated Sessions</h3>
        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-[#161D2F] border border-[#232D42] flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Chrome 122.0 on macOS Sonoma</p>
              <p className="text-xs font-mono text-slate-400">IP 103.28.45.12 • Chennai, IN • Active Now</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400">
              TRUSTED SESSION
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Python Script / Unknown Proxy</p>
              <p className="text-xs font-mono text-slate-400">IP 198.51.100.42 • Unknown Location • 3 mins ago</p>
            </div>
            <button
              onClick={() => addToast('success', 'Session Revoked', 'IP 198.51.100.42 terminated successfully.')}
              className="px-3 py-1.5 rounded-lg bg-red-500 text-white font-bold text-xs shadow-lg hover:bg-red-600 transition-all"
            >
              Revoke Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
