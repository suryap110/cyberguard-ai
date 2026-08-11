import React, { useState } from 'react';
import { 
  Bell, ShieldAlert, AlertTriangle, CheckCircle2, X, Zap, Shield, Filter, 
  Trash2, Play, Download, Search, CheckCheck, Radio, Sparkles, Terminal, Activity, FileText 
} from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';
import { playSuccessChime, playThreatAlert } from '../utils/audio';

export interface AlertItem {
  id: string;
  title: string;
  msg: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: 'Phishing' | 'Account Takeover' | 'Transaction Fraud' | 'Malware APK' | 'SIM Swap';
  mitreCode: string;
  time: string;
  status: 'UNRESOLVED' | 'CONTAINED' | 'INVESTIGATING';
  sourceIp?: string;
  targetUser?: string;
  evidenceData?: any;
}

export const AlertsPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [filterSeverity, setFilterSeverity] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM'>('ALL');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'UNRESOLVED' | 'CONTAINED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);

  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: 'alt-101',
      title: 'Account Takeover & Anomaly Brute Force',
      msg: '17 failed login attempts recorded followed by credential modification from untrusted proxy IP 198.51.100.42.',
      severity: 'CRITICAL',
      category: 'Account Takeover',
      mitreCode: 'T1110.001 (Credential Stuffing)',
      time: '2 mins ago',
      status: 'UNRESOLVED',
      sourceIp: '198.51.100.42',
      targetUser: 'analyst@cyberguard.demo',
      evidenceData: { failedAttempts: 17, proxyLocation: 'Russia / Seychelle Proxy', recommendedAction: 'Revoke JWT session tokens & force WebAuthn MFA step-up.' }
    },
    {
      id: 'alt-102',
      title: 'Suspicious ₹85,000 Transfer Intercepted',
      msg: 'IMPS Direct wire transfer attempt intercepted due to 20x variance from baseline financial profile.',
      severity: 'CRITICAL',
      category: 'Transaction Fraud',
      mitreCode: 'T1565.001 (Data Manipulation)',
      time: '12 mins ago',
      status: 'CONTAINED',
      sourceIp: '103.28.45.12',
      targetUser: 'UNKNOWN_CRYPTO_EXCHANGE',
      evidenceData: { amount: 85000, baselineAvg: 4200, actionTaken: 'NPCI Settlement Freeze Executed' }
    },
    {
      id: 'alt-103',
      title: 'Phishing Domain Intercepted',
      msg: 'Domain secure-bank-verify-login.com added to perimeter DNS sinkhole blocklist.',
      severity: 'HIGH',
      category: 'Phishing',
      mitreCode: 'T1566.002 (Spearphishing Link)',
      time: '1 hour ago',
      status: 'CONTAINED',
      sourceIp: '185.220.101.4',
      targetUser: 'Consumer Base',
      evidenceData: { domain: 'secure-bank-verify-login.com', WHOISAge: '3 Days Old', SSL: "Let's Encrypt Free DV" }
    },
    {
      id: 'alt-104',
      title: 'WhatsApp Screen Sharing Trojan APK Detected',
      msg: 'Package Bank_KYC_Update.apk detected requesting BIND_ACCESSIBILITY_SERVICE remote access permissions.',
      severity: 'CRITICAL',
      category: 'Malware APK',
      mitreCode: 'T1417 (Input Capture)',
      time: '3 hours ago',
      status: 'UNRESOLVED',
      sourceIp: 'Device Storage',
      targetUser: 'Android OS System',
      evidenceData: { packageName: 'Bank_KYC_Update.apk', hash: 'a8f491b3c91e4f2d8f94', permissions: ['ACCESSIBILITY_SERVICE', 'SYSTEM_ALERT_WINDOW'] }
    }
  ]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  // 1-Click Automated SOAR Containment Action
  const handleContainAlert = (id: string, title: string) => {
    playSuccessChime();
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, status: 'CONTAINED' } : a));
    addToast('success', 'SOAR Playbook Executed', `Threat '${title}' contained & threat vectors neutralized.`);
  };

  // Bulk Contain Unresolved Alerts
  const handleBulkContain = () => {
    playSuccessChime();
    setAlerts(prev => prev.map(a => ({ ...a, status: 'CONTAINED' })));
    addToast('success', 'Bulk SOAR Execution Complete', 'All active security alerts marked as CONTAINED.');
  };

  // Delete Alert
  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    if (selectedAlert?.id === id) setSelectedAlert(null);
    addToast('warning', 'Alert Removed', 'Alert record removed from operational triage console.');
  };

  // Filtered Alerts
  const filteredAlerts = alerts.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          a.msg.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterSeverity !== 'ALL' && a.severity !== filterSeverity) return false;
    if (filterStatus !== 'ALL' && a.status !== filterStatus) return false;
    return true;
  });

  const unresolvedCount = alerts.filter(a => a.status === 'UNRESOLVED').length;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto relative">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-mono text-[11px] font-bold border border-red-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> REAL-TIME SOC ALERT STREAM
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1 flex items-center gap-3">
            <Bell className="w-8 h-8 text-cyan-400" />
            ENTERPRISE SOC ALERT TRIAGE CONSOLE
          </h1>
          <p className="text-sm text-slate-400 mt-1">Real-time threat alert streaming, 1-click SOAR automated containment, and MITRE ATT&CK forensic inspection.</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleBulkContain}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-400 text-slate-950 font-extrabold text-xs shadow-cyber-glow hover:scale-105 transition-all flex items-center gap-2"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Bulk Contain All ({unresolvedCount} Active)</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0F1420] border border-[#232D42] p-4 rounded-2xl font-mono text-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Search className="w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Alerts, MITRE Code, or Category..."
            className="bg-transparent text-white focus:outline-none w-full sm:w-64"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 uppercase">Severity:</span>
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilterSeverity(s)}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterSeverity === s ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-[#161D2F] text-slate-400 border border-[#232D42]'
              }`}
            >
              {s}
            </button>
          ))}

          <span className="text-slate-400 uppercase ml-2">Status:</span>
          {(['ALL', 'UNRESOLVED', 'CONTAINED'] as const).map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterStatus === st ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-[#161D2F] text-slate-400 border border-[#232D42]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Stream Feed */}
      <div className="space-y-4">
        {filteredAlerts.map(alert => (
          <div 
            key={alert.id} 
            className={`p-6 rounded-3xl border transition-all shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              alert.severity === 'CRITICAL' && alert.status === 'UNRESOLVED'
                ? 'bg-red-500/10 border-red-500/40 text-red-200'
                : alert.status === 'CONTAINED'
                ? 'bg-[#0F1420] border-emerald-500/30 text-emerald-200'
                : 'bg-[#0F1420] border-[#232D42] text-slate-300'
            }`}
          >
            <div className="flex items-start gap-4 flex-1">
              <div className={`p-3.5 rounded-2xl shrink-0 ${
                alert.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-white font-sans">{alert.title}</h3>
                  <span className="px-2 py-0.5 rounded bg-[#161D2F] border border-[#232D42] text-[10px] font-mono text-cyan-400 font-bold">
                    {alert.mitreCode}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">• {alert.time}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">{alert.msg}</p>
                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400 pt-1">
                  <span>Source: <strong className="text-white">{alert.sourceIp || 'Internal System'}</strong></span>
                  <span>Category: <strong className="text-cyan-400">{alert.category}</strong></span>
                </div>
              </div>
            </div>

            {/* Action Buttons Right Side */}
            <div className="flex items-center gap-2 shrink-0 self-end md:self-center font-mono text-xs">
              <button
                onClick={() => setSelectedAlert(alert)}
                className="px-3 py-2 rounded-xl bg-sky-500/10 text-cyan-400 border border-sky-500/30 hover:bg-sky-500 hover:text-slate-950 font-bold transition-all flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Forensics</span>
              </button>

              {alert.status === 'UNRESOLVED' ? (
                <button
                  onClick={() => handleContainAlert(alert.id, alert.title)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold text-xs shadow-red-glow hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Execute SOAR Containment</span>
                </button>
              ) : (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> CONTAINED
                </span>
              )}

              <button
                onClick={() => handleDeleteAlert(alert.id)}
                className="p-2 rounded-xl bg-[#161D2F] text-slate-400 hover:text-red-400 border border-[#232D42]"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ALERT FORENSICS & MITRE ATT&CK DRAWER */}
      {selectedAlert && (
        <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-[#0F1420] border-l border-[#232D42] p-6 shadow-2xl z-50 flex flex-col justify-between overflow-y-auto font-mono text-xs animate-in slide-in-from-right">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#232D42] pb-4">
              <div>
                <span className="text-cyan-400 font-bold text-xs">{selectedAlert.id}</span>
                <h3 className="text-lg font-bold text-white font-sans">{selectedAlert.title}</h3>
              </div>
              <button onClick={() => setSelectedAlert(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-[#161D2F] space-y-2 border border-[#232D42]">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">MITRE ATT&CK Classification:</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-bold">{selectedAlert.mitreCode}</span>
              </div>
              <p className="text-slate-300">{selectedAlert.msg}</p>
            </div>

            {/* Evidence Payload Data */}
            <div className="space-y-2">
              <h4 className="text-slate-300 font-bold uppercase font-sans text-xs">Raw Evidence Payload Telemetry:</h4>
              <pre className="p-4 rounded-2xl bg-[#161D2F] border border-[#232D42] text-slate-300 overflow-x-auto text-[11px] font-mono leading-relaxed">
                {JSON.stringify(selectedAlert.evidenceData, null, 2)}
              </pre>
            </div>

            {/* SOAR Containment Playbook Action */}
            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 space-y-2">
              <h4 className="font-bold text-cyan-400 font-sans flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> Recommended SOAR Automated Playbook:
              </h4>
              <p className="text-slate-300">Inject IP {selectedAlert.sourceIp} into perimeter DNS sinkhole & revoke active JWT sessions.</p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {selectedAlert.status === 'UNRESOLVED' && (
              <button
                onClick={() => {
                  handleContainAlert(selectedAlert.id, selectedAlert.title);
                  setSelectedAlert(null);
                }}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold shadow-red-glow hover:scale-105 transition-all"
              >
                Execute Containment Playbook
              </button>
            )}
            <button
              onClick={() => setSelectedAlert(null)}
              className="flex-1 py-3 rounded-2xl bg-[#161D2F] border border-[#232D42] text-white font-bold"
            >
              Close Drawer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
