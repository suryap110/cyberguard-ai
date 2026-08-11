import React, { useState } from 'react';
import { Building2, ShieldCheck, AlertTriangle, Users, FileCheck, CheckCircle2, TrendingUp, Download, RefreshCw, Shield } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const EnterpriseRiskPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [auditing, setAuditing] = useState(false);

  const [departments, setDepartments] = useState([
    { id: 'dept-1', name: 'Finance & Accounts', riskScore: 88, employees: 42, targetedPhishing: 18, status: 'HIGH RISK' },
    { id: 'dept-2', name: 'Executive Suite & Board', riskScore: 84, employees: 12, targetedPhishing: 14, status: 'HIGH RISK' },
    { id: 'dept-3', name: 'Engineering & Product', riskScore: 94, employees: 120, targetedPhishing: 6, status: 'SECURE' },
    { id: 'dept-4', name: 'Human Resources', riskScore: 91, employees: 28, targetedPhishing: 8, status: 'SECURE' },
  ]);

  const [complianceFrameworks, setComplianceFrameworks] = useState([
    { name: 'ISO/IEC 27001:2022', score: 98, status: 'COMPLIANT', auditedDate: 'August 2026' },
    { name: 'SOC 2 Type II (Security & Trust)', score: 96, status: 'COMPLIANT', auditedDate: 'July 2026' },
    { name: 'RBI Cyber Security Framework', score: 95, status: 'COMPLIANT', auditedDate: 'August 2026' },
    { name: 'GDPR Data Protection Standard', score: 99, status: 'COMPLIANT', auditedDate: 'June 2026' },
  ]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleAuditSweep = () => {
    setAuditing(true);
    setTimeout(() => {
      setAuditing(false);
      setComplianceFrameworks(prev => prev.map(cf => ({ ...cf, score: 99, auditedDate: 'Just Now' })));
      addToast('success', 'Compliance Audit Complete', 'ISO 27001, SOC 2 Type II, and RBI audit scores updated to 99%.');
    }, 1200);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232D42] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-sky-500/20 text-cyan-400 font-mono text-xs font-bold border border-sky-500/30">
              ENTERPRISE MULTI-TENANT AUDITOR
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-cyan-400" />
            ENTERPRISE RISK MATRIX & COMPLIANCE AUDITOR
          </h1>
          <p className="text-sm text-slate-400 mt-1">Multi-tenant department risk profiling, targeted spear-phishing vulnerability metrics, and automated ISO 27001 / SOC 2 compliance readiness.</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => addToast('info', 'Certificate Downloaded', 'Downloaded Enterprise CISO ISO 27001 Compliance Certificate PDF.')}
            className="px-4 py-3 rounded-2xl bg-[#161D2F] border border-[#232D42] text-slate-300 font-bold text-xs hover:border-cyan-400 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download CISO Certificate</span>
          </button>

          <button
            onClick={handleAuditSweep}
            disabled={auditing}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${auditing ? 'animate-spin' : ''}`} />
            <span>{auditing ? 'AUDITING FRAMEWORKS...' : 'Run Compliance Audit'}</span>
          </button>
        </div>
      </div>

      {/* Regulatory Compliance Cards */}
      <div>
        <h3 className="text-base font-bold text-white mb-4">Automated Regulatory Compliance Readiness</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {complianceFrameworks.map((cf, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {cf.status}
                </span>
                <span className="text-[11px] font-mono text-slate-400">{cf.auditedDate}</span>
              </div>
              <h4 className="text-sm font-bold text-white font-mono">{cf.name}</h4>
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-2xl font-extrabold text-emerald-400">{cf.score}%</span>
                <span className="text-xs text-slate-400">Audit Score</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Department Risk Matrix Table */}
      <div className="bg-[#0F1420] border border-[#232D42] rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-[#232D42] flex items-center justify-between">
          <h3 className="text-base font-bold text-white">Departmental Cyber Risk Matrix</h3>
          <span className="text-xs font-mono text-cyan-400">Live Employee Vulnerability Telemetry</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-[#232D42] text-[11px] text-slate-400 uppercase bg-[#161D2F]">
                <th className="p-4">Department</th>
                <th className="p-4">Employees</th>
                <th className="p-4">Spear-Phishing Targets (30d)</th>
                <th className="p-4">Department Risk Score</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232D42]">
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-[#161D2F] transition-all">
                  <td className="p-4 font-bold text-white">{dept.name}</td>
                  <td className="p-4 text-slate-300">{dept.employees} Staff</td>
                  <td className="p-4 text-amber-400 font-bold">{dept.targetedPhishing} Attempts</td>
                  <td className="p-4 font-bold text-white">{dept.riskScore} / 100</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      dept.status === 'HIGH RISK' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {dept.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        setDepartments(prev => prev.map(d => d.id === dept.id ? { ...d, status: 'SECURE', riskScore: 96 } : d));
                        addToast('success', 'Security Policy Enforced', `Mandatory security awareness training dispatched to ${dept.name}.`);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold hover:bg-cyan-500 hover:text-slate-950 transition-all text-[11px]"
                    >
                      Enforce Security Training
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};