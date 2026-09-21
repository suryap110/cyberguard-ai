import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, CheckCircle2, Lock, FileText, AlertTriangle, Cpu, Sparkles, Server, Globe } from 'lucide-react';
import { AttackGraphView } from '../components/security/AttackGraphView';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const IncidentDetailPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [resolved, setResolved] = useState(false);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const toastId = Date.now().toString();
    setToasts(prev => [...prev, { id: toastId, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 4000);
  };

  const handleResolve = () => {
    setResolved(true);
    addToast('success', 'Incident Resolved', 'Mitigation playbooks executed & threat vectors isolated.');
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-[#F8FAFC]">
      <ToastContainer toasts={toasts} onClose={(toastId) => setToasts(prev => prev.filter(t => t.id !== toastId))} />

      {/* Back Button */}
      <button onClick={() => navigate('/incidents')} className="flex items-center gap-2 text-xs text-[#00E5FF] hover:underline font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Incidents Console
      </button>

      {/* Top Header Card */}
      <div className="cg-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              resolved ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40' : 'bg-[#FF3B3B]/20 text-[#FF3B3B] border border-[#FF3B3B]/40'
            }`}>
              {resolved ? 'RESOLVED' : 'CRITICAL INCIDENT'} #{id || 'TRT-1029'}
            </span>
            <span className="text-xs text-[#94A3B8]">Detection Time: Today, 10:42 AM</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#F8FAFC] mt-2">SQL Injection & Multi-Stage Data Exfiltration Attack</h1>
          <p className="text-xs text-[#94A3B8] mt-1">Targeting database cluster node 10.0.2.15 via external proxy vectors</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => addToast('warning', 'Session Tokens Revoked', 'All active sessions for affected node invalidated.')}
            className="px-4 py-2.5 rounded-xl bg-[#151F32] border border-slate-800 text-[#F8FAFC] hover:border-[#00E5FF] font-medium text-xs transition-all"
          >
            Revoke Node Access
          </button>
          <button 
            onClick={handleResolve}
            disabled={resolved}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#070B14] font-extrabold text-xs shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:scale-105 transition-all disabled:opacity-50"
          >
            {resolved ? 'INCIDENT RESOLVED' : 'MARK AS RESOLVED'}
          </button>
        </div>
      </div>

      {/* Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">

          {/* Network Attack Visualization Graph */}
          <div className="cg-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#F8FAFC] border-b border-slate-800/60 pb-3">Interactive Network Attack Graph</h3>
            <AttackGraphView />
          </div>

          {/* AI Explanation & Analysis */}
          <div className="cg-card p-5 space-y-4 border-[#7C3AED]/30">
            <div className="flex items-center gap-2 text-[#7C3AED]">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-sm font-bold text-[#F8FAFC]">AI Threat Analysis & Explanation</h3>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              The automated AI Sentinel engine detected anomalous SQL command injections containing nested boolean queries matching known CVE-2026 exploit signatures. The attacker leveraged proxy IP 185.220.101.5 to attempt credential bypass.
            </p>
          </div>

          {/* Indicators of Compromise (IOCs) */}
          <div className="cg-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#F8FAFC] border-b border-slate-800/60 pb-3">Indicators of Compromise (IOCs)</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#151F32] flex items-center justify-between font-mono">
                <span className="text-[#F8FAFC]">IP Address: 185.220.101.5</span>
                <span className="text-[#FF3B3B] font-bold">Malicious Proxy</span>
              </div>
              <div className="p-3 rounded-xl bg-[#151F32] flex items-center justify-between font-mono">
                <span className="text-[#F8FAFC]">Malware SHA-256: 7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069</span>
                <span className="text-[#FF7A00] font-bold">High Risk</span>
              </div>
              <div className="p-3 rounded-xl bg-[#151F32] flex items-center justify-between font-mono">
                <span className="text-[#F8FAFC]">Domain: secure-verify-banking.com</span>
                <span className="text-[#FF3B3B] font-bold">Sinkholed</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column Metadata & Recommendations */}
        <div className="lg:col-span-4 space-y-6">

          {/* Metadata Card */}
          <div className="cg-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#F8FAFC] border-b border-slate-800/60 pb-3">Incident Metadata</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-2.5 rounded-xl bg-[#151F32]">
                <span className="text-[#94A3B8]">Attack Source:</span>
                <span className="text-[#00E5FF] font-mono font-bold">185.220.101.5</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#151F32]">
                <span className="text-[#94A3B8]">Target Asset:</span>
                <span className="text-[#F8FAFC] font-bold">DB-Server-01</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#151F32]">
                <span className="text-[#94A3B8]">AI Confidence:</span>
                <span className="text-[#00E5FF] font-bold">99.4%</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-[#151F32]">
                <span className="text-[#94A3B8]">Assigned Team:</span>
                <span className="text-[#7C3AED] font-bold">SOC Team Alpha</span>
              </div>
            </div>
          </div>

          {/* Recommended Action Steps */}
          <div className="cg-card p-5 space-y-4">
            <h3 className="text-sm font-bold text-[#F8FAFC] border-b border-slate-800/60 pb-3">Recommended Response Actions</h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#151F32] border border-slate-800 text-[#F8FAFC]">
                1. Apply perimeter firewall block rule for IP 185.220.101.5.
              </div>
              <div className="p-3 rounded-xl bg-[#151F32] border border-slate-800 text-[#F8FAFC]">
                2. Flush database connection pool and rotate API secret keys.
              </div>
              <div className="p-3 rounded-xl bg-[#151F32] border border-slate-800 text-[#F8FAFC]">
                3. Deploy SOAR automated patch playbook across node cluster.
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
