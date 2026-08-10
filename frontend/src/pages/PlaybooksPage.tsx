import React, { useState } from 'react';
import { Play, Zap } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export const PlaybooksPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [runningPlaybookId, setRunningPlaybookId] = useState<string | null>(null);
  const [playbookLogs, setPlaybookLogs] = useState<Record<string, string[]>>({});

  const playbooks = [
    {
      id: 'pb-1',
      code: 'SOAR-PB-001',
      title: 'Phishing Campaign Auto-Sinkhole & Credential Reset',
      trigger: 'URL Scan Risk Score ≥ 85 / Phishing Keyword Spike',
      steps: [
        '1. Inject malicious domain into DNS Sinkhole firewall rules',
        '2. Revoke active JWT session tokens for exposed employee email',
        '3. Force mandatory WebAuthn MFA step-up on next login',
        '4. Broadcast perimeter warning alert to SOC Security Analysts'
      ],
      lastRun: '12 mins ago',
      successRate: '100%'
    },
    {
      id: 'pb-2',
      code: 'SOAR-PB-002',
      title: 'Account Takeover Instant Session Quarantine',
      trigger: 'Failed Login Spike ≥ 10 / Location Deviation Jump',
      steps: [
        '1. Terminate all active browser & mobile OAuth refresh tokens',
        '2. Add attacker proxy IP address to edge firewall blacklist',
        '3. Place user account in temporary read-only quarantine mode',
        '4. Generate Incident ticket #INC-2026-0012 in SOC queue'
      ],
      lastRun: '2 hours ago',
      successRate: '99.8%'
    },
    {
      id: 'pb-3',
      code: 'SOAR-PB-003',
      title: 'High-Value Payment Fraud Wire Freeze',
      trigger: 'Transaction Amount Ratio > 10x / Unrecognized Device',
      steps: [
        '1. Freeze outgoing IMPS/NEFT transfer authorization',
        '2. Request biometric step-up verification on registered mobile device',
        '3. Flag payee VPA handle in core banking risk registry',
        '4. Notify Fraud Operations Analyst team'
      ],
      lastRun: '1 day ago',
      successRate: '100%'
    }
  ];

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const handleRunPlaybook = (id: string, title: string) => {
    setRunningPlaybookId(id);
    setPlaybookLogs(prev => ({ ...prev, [id]: ['Initializing SOAR Engine...', 'Connecting to Edge Firewall API...'] }));

    setTimeout(() => {
      setPlaybookLogs(prev => ({
        ...prev,
        [id]: [
          '✓ Injecting Firewall Rules...',
          '✓ Revoking Session Tokens...',
          '✓ Step-Up 2FA Enforced...',
          '✓ SOAR Containment Playbook Executed Successfully!'
        ]
      }));
      setRunningPlaybookId(null);
      addToast('success', 'Playbook Execution Complete', `Playbook '${title}' completed all 4 containment steps.`);
    }, 1800);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold border border-cyan-500/30">
            SOAR AUTOMATION ENGINE V2.4
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 flex items-center gap-3">
          <Zap className="w-8 h-8 text-amber-400" />
          AUTOMATED SOC INCIDENT RESPONSE PLAYBOOKS
        </h1>
        <p className="text-sm text-slate-400 mt-1">Orchestrate automated containment workflows across edge firewalls, authentication gateways, and banking APIs.</p>
      </div>

      {/* Playbooks List */}
      <div className="grid grid-cols-1 gap-6">
        {playbooks.map((pb) => (
          <div key={pb.id} className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-6 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232D42] pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">{pb.code}</span>
                <h3 className="text-xl font-bold text-white mt-0.5">{pb.title}</h3>
                <p className="text-xs font-mono text-slate-400 mt-1">Trigger Condition: <span className="text-amber-400">{pb.trigger}</span></p>
              </div>

              <button
                onClick={() => handleRunPlaybook(pb.id, pb.title)}
                disabled={runningPlaybookId === pb.id}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{runningPlaybookId === pb.id ? 'EXECUTING PLAYBOOK...' : 'Run Automated Playbook'}</span>
              </button>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <h4 className="text-slate-400 font-bold uppercase">Automated Playbook Action Steps:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {pb.steps.map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#161D2F] border border-[#232D42] text-slate-200">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Log */}
            {playbookLogs[pb.id] && (
              <div className="p-4 rounded-2xl bg-[#080B11] border border-[#232D42] font-mono text-xs text-emerald-400 space-y-1">
                {playbookLogs[pb.id].map((log: string, i: number) => (
                  <p key={i}>{log}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};