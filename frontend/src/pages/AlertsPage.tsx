import React, { useState } from 'react';
import { Bell, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const [filter, setFilter] = useState('ALL');

  const alerts = [
    { id: '1', title: 'Account Takeover Attempt Detected', msg: '17 failed login attempts recorded followed by credential modification from untrusted proxy IP 198.51.100.42.', severity: 'CRITICAL', time: '2 mins ago', read: false },
    { id: '2', title: 'Suspicious ₹85,000 Transaction Blocked', msg: 'Transfer attempt intercepted due to 20x variance from baseline profile.', severity: 'HIGH', time: '12 mins ago', read: false },
    { id: '3', title: 'Phishing Domain Intercepted', msg: 'Domain secure-bank-verify-login.com added to perimeter blocklist.', severity: 'MEDIUM', time: '1 hour ago', read: true }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <Bell className="w-8 h-8 text-cyan-400" />
          ALERT & NOTIFICATION CENTER
        </h1>
        <p className="text-sm text-slate-400 mt-1">Real-time proactive security warnings and incident updates.</p>
      </div>

      <div className="flex gap-2 font-mono text-xs">
        {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl transition-all ${
              filter === f ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-[#0F1420] text-slate-400 border border-[#232D42]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {alerts.map(a => (
          <div key={a.id} className={`p-6 rounded-3xl border flex items-start justify-between gap-4 ${
            a.severity === 'CRITICAL' ? 'bg-red-500/10 border-red-500/30' : 'bg-[#0F1420] border-[#232D42]'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${a.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{a.title}</h3>
                  <span className="text-[10px] font-mono text-slate-400">• {a.time}</span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{a.msg}</p>
              </div>
            </div>
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
              a.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
            }`}>
              {a.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
