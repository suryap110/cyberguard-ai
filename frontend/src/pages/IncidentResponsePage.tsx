import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldAlert, CheckCircle2, ChevronRight, Zap, Users, Clock, AlertTriangle } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export interface IncidentItem {
  id: string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  assignedTeam: string;
  timeline: string;
  status: 'ACTIVE' | 'INVESTIGATING' | 'RESOLVED';
  actionSummary: string;
}

export const IncidentResponsePage: React.FC = () => {
  const navigate = useNavigate();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [incidents, setIncidents] = useState<IncidentItem[]>([
    {
      id: 'INC-2026-0012',
      title: 'Coordinated Phishing & Credential Exfiltration',
      severity: 'CRITICAL',
      assignedTeam: 'SOC Alpha Team',
      timeline: '10 min ago',
      status: 'INVESTIGATING',
      actionSummary: 'Revoke active OAuth JWT tokens and isolate subnet 10.0.4.0/24.'
    },
    {
      id: 'INC-2026-0011',
      title: 'Deepfake AI Voice Extortion Incident',
      severity: 'HIGH',
      assignedTeam: 'Identity & Fraud Squad',
      timeline: '45 min ago',
      status: 'ACTIVE',
      actionSummary: 'Flag synthetic voice hash and issue emergency step-up biometric check.'
    },
    {
      id: 'INC-2026-0010',
      title: 'Abnormal IMPS Wire Transfer Anomaly',
      severity: 'HIGH',
      assignedTeam: 'Financial Risk Unit',
      timeline: '2 hours ago',
      status: 'ACTIVE',
      actionSummary: 'Freeze NPCI settlement batch #8912 and notify compliance.'
    },
    {
      id: 'INC-2026-0009',
      title: 'Screen Sharing Trojan APK Activity',
      severity: 'CRITICAL',
      assignedTeam: 'Endpoint Defense Team',
      timeline: '4 hours ago',
      status: 'RESOLVED',
      actionSummary: 'Remote wipe payload from host device and update signature database.'
    }
  ]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const toastId = Date.now().toString();
    setToasts(prev => [...prev, { id: toastId, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 4000);
  };

  const handleResolveIncident = (id: string) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, status: 'RESOLVED' } : inc));
    addToast('success', 'Incident Resolved', `Incident ${id} marked as resolved.`);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-[#F8FAFC]">
      <ToastContainer toasts={toasts} onClose={(toastId) => setToasts(prev => prev.filter(t => t.id !== toastId))} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-wide flex items-center gap-2.5">
            <Activity className="w-7 h-7 text-[#00E5FF]" />
            Incident Response Command
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Active enterprise incidents, assigned triage squads, and automated response orchestration</p>
        </div>

        <button 
          onClick={() => addToast('info', 'Playbooks Triggered', 'Automated SOAR playbooks dispatched.')}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#070B14] font-extrabold text-xs shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:scale-105 transition-all self-start sm:self-auto cursor-pointer"
        >
          Run SOAR Playbook Matrix
        </button>
      </div>

      {/* Incident List */}
      <div className="space-y-4">
        {incidents.map((incident) => (
          <div key={incident.id} className="cg-card p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#00E5FF]">{incident.id}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                  incident.severity === 'CRITICAL' ? 'bg-[#FF3B3B]/20 text-[#FF3B3B] border-[#FF3B3B]/40' : 'bg-[#FF7A00]/20 text-[#FF7A00] border-[#FF7A00]/40'
                }`}>
                  {incident.severity}
                </span>
                <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {incident.timeline}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#F8FAFC]">{incident.title}</h3>
              <p className="text-xs text-[#94A3B8]">
                <strong className="text-[#F8FAFC]">Recommended Action:</strong> {incident.actionSummary}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#94A3B8] pt-1">
                <span className="flex items-center gap-1 text-[#7C3AED] font-semibold">
                  <Users className="w-3.5 h-3.5" /> {incident.assignedTeam}
                </span>
                <span className="flex items-center gap-1 font-bold">
                  Status: <span className={incident.status === 'RESOLVED' ? 'text-[#10B981]' : 'text-[#FACC15]'}>{incident.status}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                onClick={() => navigate(`/incidents/${incident.id}`)}
                className="px-4 py-2 rounded-xl bg-[#151F32] border border-slate-800 text-[#00E5FF] hover:bg-[#00E5FF]/10 text-xs font-semibold transition-colors flex items-center gap-1"
              >
                <span>Investigate</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              
              {incident.status !== 'RESOLVED' && (
                <button
                  onClick={() => handleResolveIncident(incident.id)}
                  className="px-4 py-2 rounded-xl bg-[#10B981] text-[#070B14] font-extrabold text-xs shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:scale-105 transition-all cursor-pointer"
                >
                  Resolve Incident
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
