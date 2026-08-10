import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, ShieldAlert, AlertTriangle, Activity, CheckCircle2, Play, ArrowRight, Globe, Maximize2, Minimize2, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { RealtimeEventFeed } from '../components/security/RealtimeEventFeed';
import { AttackGraphView } from '../components/security/AttackGraphView';

export const SOCDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [fullscreen, setFullscreen] = useState(false);
  const [timeRange, setTimeRange] = useState('24h');

  const trendData = [
    { time: '00:00', threats: 12, risk: 22 },
    { time: '04:00', threats: 45, risk: 88 },
    { time: '08:00', threats: 28, risk: 45 },
    { time: '12:00', threats: 65, risk: 91 },
    { time: '16:00', threats: 38, risk: 52 },
    { time: '20:00', threats: 52, risk: 74 }
  ];

  const geoMapData = [
    { origin: "Proxy 198.51.100.42", target: "Chennai Node (user_102)", threat: "Account Takeover", risk: 97 },
    { origin: "Domain 104.21.45.18", target: "Banking API Edge", threat: "Phishing Harvest", risk: 91 },
    { origin: "IP 172.56.12.9", target: "Payment Gateway", threat: "₹85,000 Fraud Wire", risk: 94 }
  ];

  return (
    <div className={`p-6 md:p-8 space-y-8 max-w-7xl mx-auto transition-all ${
      fullscreen ? 'fixed inset-0 z-50 bg-[#080B11] p-8 overflow-y-auto max-w-none' : ''
    }`}>
      {/* SOC Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232D42] pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              SYSTEM OPERATIONAL
            </span>
            <span className="text-xs font-mono text-slate-400">ENTERPRISE SOC MODE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-2 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-amber-400" />
            SECURITY OPERATIONS COMMAND CENTER
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="px-4 py-2.5 rounded-xl bg-[#161D2F] border border-[#232D42] text-slate-300 hover:text-white font-mono text-xs flex items-center gap-2"
          >
            {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span>{fullscreen ? 'Exit Command Center' : 'Fullscreen SOC'}</span>
          </button>
          <button
            onClick={() => navigate('/simulation')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-extrabold text-sm shadow-red-glow hover:scale-105 transition-all flex items-center gap-2"
          >
            <Play className="w-4 h-4" />
            <span>RUN ATTACK SIMULATION</span>
          </button>
        </div>
      </div>

      {/* Time Range Filter Bar */}
      <div className="flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 uppercase">Telemetry Window:</span>
          {['24h', '7d', '30d'].map(r => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`px-3 py-1 rounded-lg transition-all ${
                timeRange === r ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-[#0F1420] text-slate-400 border border-[#232D42]'
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
        <span className="text-cyan-400">Live WebSockets Active</span>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42]">
          <span className="text-xs font-mono text-slate-400">TOTAL THREATS DETECTED</span>
          <p className="text-3xl font-extrabold text-white mt-2 font-mono">328</p>
          <p className="text-[11px] text-emerald-400 font-mono mt-1">↑ +14% vs last {timeRange}</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1420] border border-red-500/30 bg-red-500/5">
          <span className="text-xs font-mono text-red-400 font-bold">CRITICAL THREATS</span>
          <p className="text-3xl font-extrabold text-red-400 mt-2 font-mono">17</p>
          <p className="text-[11px] text-red-300 font-mono mt-1">Requires SOC Containment</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1420] border border-amber-500/30">
          <span className="text-xs font-mono text-amber-400">ACTIVE INCIDENTS</span>
          <p className="text-3xl font-extrabold text-amber-400 mt-2 font-mono">12</p>
          <p className="text-[11px] text-slate-400 font-mono mt-1">Assigned to Analyst-01</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1420] border border-emerald-500/30">
          <span className="text-xs font-mono text-emerald-400">BLOCKED ATTACKS</span>
          <p className="text-3xl font-extrabold text-emerald-400 mt-2 font-mono">84</p>
          <p className="text-[11px] text-slate-400 font-mono mt-1">Automated AI containment</p>
        </div>
      </div>

      {/* Main Grid: Realtime Feed + Hourly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0F1420] border border-[#232D42] rounded-3xl p-6 space-y-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-mono uppercase">Hourly Threat Velocity & Risk Curve</h3>
            <span className="text-xs font-mono text-slate-400">Telemetry Stream ({timeRange})</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#161D2F', borderColor: '#232D42', borderRadius: '12px', color: '#FFF' }} />
                <Area type="monotone" dataKey="risk" stroke="#EF4444" strokeWidth={2} fillOpacity={1} fill="url(#colorRisk)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <RealtimeEventFeed />
      </div>

      {/* Live Threat Geo Map Visualizer */}
      <div className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            Live Geographical Attack Interception Signals
          </h3>
          <span className="text-xs font-mono text-emerald-400 font-bold">3 Signals Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {geoMapData.map((g, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#161D2F] border border-[#232D42] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{g.threat}</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 font-bold">{g.risk}/100</span>
              </div>
              <p className="text-white font-bold">{g.origin} ➔ {g.target}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Attack Graph View */}
      <AttackGraphView />
    </div>
  );
};
