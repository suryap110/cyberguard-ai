import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, Search, Filter, CheckCircle2, Zap, FileText, Trash2, 
  CheckCheck, ShieldCheck, ArrowUpRight, ChevronRight
} from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';

export interface ThreatItem {
  id: string;
  name: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';
  type: string;
  sourceIp: string;
  destination: string;
  detectionTime: string;
  confidence: number;
  aiAnalysis: string;
  status: 'BLOCKED' | 'CONTAINED' | 'ACTIVE';
}

export const AlertsPage: React.FC = () => {
  const navigate = useNavigate();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [threats, setThreats] = useState<ThreatItem[]>([
    {
      id: 'TRT-1029',
      name: 'SQL Injection Payload Attack',
      severity: 'CRITICAL',
      type: 'Database Intrusion',
      sourceIp: '185.220.101.5',
      destination: '10.0.2.15 (DB-Server-01)',
      detectionTime: '10:42 AM',
      confidence: 99.4,
      aiAnalysis: 'Malicious SQL command injection detected targeting authentication table via external query parameters.',
      status: 'BLOCKED'
    },
    {
      id: 'TRT-1028',
      name: 'Synthetic AI Voice Extortion',
      severity: 'HIGH',
      type: 'Deepfake Fraud',
      sourceIp: '45.142.120.9',
      destination: 'Executive Mobile Endpoint',
      detectionTime: '10:35 AM',
      confidence: 96.2,
      aiAnalysis: 'Audio spectral analysis flagged synthetic pitch variance matching neural voice cloning fingerprints.',
      status: 'BLOCKED'
    },
    {
      id: 'TRT-1027',
      name: 'UPI Fraud Gateway Spoof',
      severity: 'HIGH',
      type: 'Financial Fraud',
      sourceIp: '103.28.45.12',
      destination: 'Consumer Payment Gateway',
      detectionTime: '10:20 AM',
      confidence: 94.8,
      aiAnalysis: 'QR payload contains invalid NPCI VPA parameter headers directing to unverified offshore wallet.',
      status: 'CONTAINED'
    },
    {
      id: 'TRT-1026',
      name: 'Credential Stuffing Anomaly',
      severity: 'MEDIUM',
      type: 'Account Takeover',
      sourceIp: '198.51.100.42',
      destination: 'User Auth Service',
      detectionTime: '09:50 AM',
      confidence: 88.0,
      aiAnalysis: 'Automated rapid login attempts detected across 24 distinct user accounts from single IP range.',
      status: 'BLOCKED'
    },
    {
      id: 'TRT-1025',
      name: 'Unusual External Port Scan',
      severity: 'LOW',
      type: 'Reconnaissance',
      sourceIp: '89.248.165.74',
      destination: 'Perimeter Firewall',
      detectionTime: '09:12 AM',
      confidence: 92.1,
      aiAnalysis: 'Sequential port probing detected across TCP ports 80, 443, 8080, and 22.',
      status: 'BLOCKED'
    }
  ]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-[#FF3B3B]/20 text-[#FF3B3B] border-[#FF3B3B]/40';
      case 'HIGH':
        return 'bg-[#FF7A00]/20 text-[#FF7A00] border-[#FF7A00]/40';
      case 'MEDIUM':
        return 'bg-[#FACC15]/20 text-[#FACC15] border-[#FACC15]/40';
      case 'LOW':
        return 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/40';
      default:
        return 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40';
    }
  };

  const filteredThreats = threats.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.sourceIp.includes(searchQuery) ||
                          t.type.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterSeverity !== 'ALL' && t.severity !== filterSeverity) return false;
    return matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-[#F8FAFC]">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-wide flex items-center gap-2.5">
            <ShieldAlert className="w-7 h-7 text-[#00E5FF]" />
            Threat Detection & Analytics
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Real-time threat feed, confidence scores, and automated containment logs</p>
        </div>

        <button
          onClick={() => {
            addToast('success', 'Bulk Containment Executed', 'All pending threat vectors neutralized.');
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#070B14] font-extrabold text-xs shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:scale-105 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <CheckCheck className="w-4 h-4" />
          <span>Execute Auto-Containment</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="cg-card p-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 bg-[#151F32] border border-slate-800 rounded-xl px-3.5 py-2 w-full md:w-96">
          <Search className="w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by threat name, IP, or type..."
            className="bg-transparent text-[#F8FAFC] focus:outline-none w-full placeholder-[#64748B]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          <span className="text-[#94A3B8] font-medium">Severity:</span>
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                filterSeverity === sev 
                  ? 'bg-[#00E5FF] text-[#070B14] shadow-[0_0_10px_rgba(0,229,255,0.3)]' 
                  : 'bg-[#151F32] text-[#94A3B8] hover:text-[#F8FAFC] border border-slate-800'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Threat List Table */}
      <div className="cg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#151F32] text-[#94A3B8] font-semibold border-b border-slate-800">
              <tr>
                <th className="p-4">Threat Name & ID</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Type</th>
                <th className="p-4">Source IP</th>
                <th className="p-4">Destination</th>
                <th className="p-4">Detection Time</th>
                <th className="p-4">AI Confidence</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredThreats.map((threat) => (
                <tr key={threat.id} className="hover:bg-[#151F32]/50 transition-colors">
                  <td className="p-4 font-bold text-[#F8FAFC]">
                    <div>{threat.name}</div>
                    <span className="text-[10px] text-[#00E5FF] font-mono">{threat.id}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${getSeverityBadge(threat.severity)}`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="p-4 text-[#94A3B8]">{threat.type}</td>
                  <td className="p-4 font-mono text-[#F8FAFC]">{threat.sourceIp}</td>
                  <td className="p-4 text-[#94A3B8]">{threat.destination}</td>
                  <td className="p-4 text-[#64748B]">{threat.detectionTime}</td>
                  <td className="p-4 font-bold text-[#00E5FF]">{threat.confidence}%</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] font-bold text-[10px] border border-[#10B981]/30">
                      {threat.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => navigate(`/incidents/${threat.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-[#151F32] border border-slate-800 text-[#00E5FF] hover:bg-[#00E5FF]/10 font-medium text-xs transition-colors flex items-center gap-1 ml-auto"
                    >
                      <span>Investigate</span>
                      <ChevronRight className="w-3.5 h-3.5" />
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
