import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, MessageSquare, CreditCard, Bot, ShieldCheck, Smartphone, KeyRound, AlertTriangle, ArrowRight, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { SecurityScoreGauge } from '../components/security/SecurityScoreGauge';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const ConsumerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [sweeping, setSweeping] = useState(false);

  const addToast = (type: 'success' | 'warning' | 'error', title: string, message: string) => {
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

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto relative">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">PERSONAL SECURITY CENTER</h1>
          <p className="text-sm text-slate-400 mt-1">Good evening, {user?.full_name || 'Surya'} 👋 Your digital security posture is currently protected.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleQuickSweep}
            disabled={sweeping}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold text-sm shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{sweeping ? 'SWEEPING PERIMETER...' : 'Run Quick Sweep'}</span>
          </button>
          <button
            onClick={() => navigate('/security-report')}
            className="px-4 py-2.5 rounded-xl bg-[#161D2F] border border-[#232D42] hover:border-cyan-400 text-cyan-400 font-mono text-xs font-bold transition-all flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top Grid: Security Score + Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SecurityScoreGauge score={user?.security_score || 92} status="SECURE" />

        <div className="lg:col-span-2 bg-[#0F1420] border border-[#232D42] rounded-3xl p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Security Score Breakdown</h3>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> All Signals Optimal
              </span>
            </div>

            <div className="space-y-4">
              {[
                { name: 'ACCOUNT SECURITY', score: 95, color: 'bg-emerald-500' },
                { name: 'DEVICE SECURITY', score: 88, color: 'bg-sky-500' },
                { name: 'TRANSACTION SAFETY', score: 94, color: 'bg-emerald-500' },
                { name: 'THREAT EXPOSURE', score: 91, color: 'bg-cyan-500' },
                { name: 'BEHAVIORAL SECURITY', score: 90, color: 'bg-sky-500' },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">{item.name}</span>
                    <span className="text-white font-bold">{item.score} / 100</span>
                  </div>
                  <div className="h-2 w-full bg-[#161D2F] rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#232D42] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div onClick={() => navigate('/devices')} className="p-3 rounded-2xl bg-[#161D2F] hover:bg-[#1e273e] cursor-pointer transition-all">
              <p className="text-[10px] font-mono text-slate-400">Trusted Devices</p>
              <p className="text-lg font-bold text-white mt-1">3 Active</p>
            </div>
            <div onClick={() => navigate('/transactions')} className="p-3 rounded-2xl bg-[#161D2F] hover:bg-[#1e273e] cursor-pointer transition-all">
              <p className="text-[10px] font-mono text-slate-400">Transactions</p>
              <p className="text-lg font-bold text-emerald-400 mt-1">12 Protected</p>
            </div>
            <div onClick={() => navigate('/identity')} className="p-3 rounded-2xl bg-[#161D2F] hover:bg-[#1e273e] cursor-pointer transition-all">
              <p className="text-[10px] font-mono text-slate-400">Exposures</p>
              <p className="text-lg font-bold text-emerald-400 mt-1">0 Breach</p>
            </div>
            <div onClick={() => navigate('/alerts')} className="p-3 rounded-2xl bg-[#161D2F] hover:bg-[#1e273e] cursor-pointer transition-all">
              <p className="text-[10px] font-mono text-slate-400">Threat Level</p>
              <p className="text-lg font-bold text-emerald-400 mt-1">LOW</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Center: 4 Large Cards */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">QUICK ACTION CENTER</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => navigate('/scanner/url')}
            className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] hover:border-sky-500/50 hover:bg-[#161D2F] cursor-pointer transition-all group shadow-xl"
          >
            <div className="p-3 rounded-2xl bg-sky-500/10 text-cyan-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <Link2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Check a URL</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">Detect phishing domains & brand impersonation</p>
            <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:gap-2 transition-all">
              <span>Analyze Now</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => navigate('/scanner/message')}
            className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] hover:border-cyan-500/50 hover:bg-[#161D2F] cursor-pointer transition-all group shadow-xl"
          >
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Check a Message</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">Identify SMS scam urgency & OTP triggers</p>
            <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:gap-2 transition-all">
              <span>Analyze Now</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => navigate('/transactions')}
            className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] hover:border-emerald-500/50 hover:bg-[#161D2F] cursor-pointer transition-all group shadow-xl"
          >
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Check Transaction</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">Simulate wire transfer & fraud baseline</p>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:gap-2 transition-all">
              <span>Analyze Now</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div
            onClick={() => navigate('/copilot')}
            className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] hover:border-amber-500/50 hover:bg-[#161D2F] cursor-pointer transition-all group shadow-xl"
          >
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 w-fit mb-4 group-hover:scale-110 transition-transform">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Ask Security AI</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">Chat with AI Security Copilot Analyst</p>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:gap-2 transition-all">
              <span>Open Copilot</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
