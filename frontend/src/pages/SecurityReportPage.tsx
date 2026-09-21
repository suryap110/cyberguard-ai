import React from 'react';
import { Download, FileText, TrendingUp, ShieldCheck, Laptop, AlertTriangle, Printer } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

import { apiRequest } from '../services/api';

export const SecurityReportPage: React.FC = () => {
  const [reportData, setReportData] = React.useState<any>(null);

  React.useEffect(() => {
    async function loadReport() {
      try {
        const res: any = await apiRequest('/admin/executive-report');
        setReportData(res);
      } catch (e) {}
    }
    loadReport();
  }, []);
  const trendData = [
    { month: 'Jan', threats: 240, resolved: 238 },
    { month: 'Feb', threats: 310, resolved: 308 },
    { month: 'Mar', threats: 180, resolved: 180 },
    { month: 'Apr', threats: 420, resolved: 415 },
    { month: 'May', threats: 390, resolved: 388 },
    { month: 'Jun', threats: 510, resolved: 508 }
  ];

  const categoryData = [
    { name: 'Phishing URLs', value: 45, color: '#00E5FF' },
    { name: 'Malware APKs', value: 25, color: '#7C3AED' },
    { name: 'UPI Scams', value: 15, color: '#FF7A00' },
    { name: 'Account Takeover', value: 15, color: '#FF3B3B' }
  ];

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-[1600px] mx-auto font-sans text-[#F8FAFC]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#F8FAFC] tracking-wide flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-[#00E5FF]" />
            Reports & Security Analytics
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">Monthly posture evaluation, attack category trends, and executive PDF audit export</p>
        </div>

        <button
          onClick={handleDownload}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#070B14] font-extrabold text-xs shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:scale-105 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Download Executive Report (PDF)</span>
        </button>
      </div>

      {/* Grid Charts & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Threat Trends Area Chart */}
        <div className="lg:col-span-8 cg-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-[#F8FAFC] border-b border-slate-800/60 pb-3">Monthly Threat Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="threatGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#101827', borderColor: 'rgba(148,163,184,0.12)' }} />
                <Area type="monotone" dataKey="threats" stroke="#00E5FF" strokeWidth={2} fillOpacity={1} fill="url(#threatGrad)" name="Detected Threats" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Attack Category Breakdown Pie */}
        <div className="lg:col-span-4 cg-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-[#F8FAFC] border-b border-slate-800/60 pb-3">Attack Categories Share</h3>
          <div className="h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#101827', borderRadius: '8px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Device Stats & Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cg-card p-5 space-y-2">
          <span className="text-xs text-[#94A3B8]">Security Performance</span>
          <p className="text-2xl font-extrabold text-[#10B981]">99.8%</p>
          <p className="text-xs text-[#94A3B8]">Threat Isolation Success Rate</p>
        </div>
        <div className="cg-card p-5 space-y-2">
          <span className="text-xs text-[#94A3B8]">Protected Endpoints</span>
          <p className="text-2xl font-extrabold text-[#00E5FF]">4,290</p>
          <p className="text-xs text-[#94A3B8]">Active Agent Connections</p>
        </div>
        <div className="cg-card p-5 space-y-2">
          <span className="text-xs text-[#94A3B8]">Average Response Time</span>
          <p className="text-2xl font-extrabold text-[#7C3AED]">1.4s</p>
          <p className="text-xs text-[#94A3B8]">Automated SOAR Mitigation</p>
        </div>
      </div>
    </div>
  );
};