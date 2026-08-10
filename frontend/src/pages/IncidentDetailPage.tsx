import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, CheckCircle2, Lock, FileText, AlertTriangle } from 'lucide-react';
import { AttackGraphView } from '../components/security/AttackGraphView';

export const IncidentDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto">
      <button onClick={() => navigate('/soc')} className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to SOC Command Center
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232D42] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-400">
              CRITICAL INCIDENT #INC-2026-0012
            </span>
            <span className="text-xs font-mono text-amber-400">STATUS: INVESTIGATING</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Coordinated Phishing & Account Takeover Sequence</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-xs hover:bg-red-500 hover:text-white transition-all">
            Revoke All Active Sessions
          </button>
          <button className="px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:bg-emerald-400 transition-all">
            Mark Incident Contained
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <AttackGraphView />

          <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-3">
            <h3 className="text-base font-bold text-white">AI Evidence Summary</h3>
            <ul className="space-y-2 text-xs font-mono text-slate-300">
              <li className="p-3 rounded-xl bg-[#161D2F] flex items-center gap-2">
                <span className="text-red-400">●</span> Phishing SMS received containing domain 'secure-bank-login-update.com'
              </li>
              <li className="p-3 rounded-xl bg-[#161D2F] flex items-center gap-2">
                <span className="text-red-400">●</span> 17 Failed login attempts recorded from IP 198.51.100.42 within 5 minutes
              </li>
              <li className="p-3 rounded-xl bg-[#161D2F] flex items-center gap-2">
                <span className="text-red-400">●</span> ₹85,000 wire transfer requested to unverified beneficiary account
              </li>
            </ul>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 h-fit font-mono text-xs">
          <h3 className="text-base font-bold text-white font-sans">Incident Metadata</h3>
          <div className="space-y-2">
            <div className="flex justify-between p-3 rounded-xl bg-[#161D2F]">
              <span className="text-slate-400">ASSIGNED ANALYST:</span>
              <span className="text-cyan-400 font-bold">Analyst-01</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-[#161D2F]">
              <span className="text-slate-400">TARGET USER:</span>
              <span className="text-white font-bold">user_102 (Surya)</span>
            </div>
            <div className="flex justify-between p-3 rounded-xl bg-[#161D2F]">
              <span className="text-slate-400">RISK SCORE:</span>
              <span className="text-red-400 font-bold">97 / 100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
