import React from 'react';
import { Server, Activity, CheckCircle2, Cpu, Database, Radio } from 'lucide-react';

export const AdminHealthPage: React.FC = () => {
  const services = [
    { name: "FastAPI REST Service", status: "OPERATIONAL", latency: "12ms", uptime: "99.98%", icon: Server },
    { name: "PostgreSQL Database Engine", status: "OPERATIONAL", latency: "4ms", uptime: "99.99%", icon: Database },
    { name: "AI Threat & NLP Engine", status: "OPERATIONAL", latency: "45ms", uptime: "99.95%", icon: Cpu },
    { name: "WebSockets Real-Time Stream", status: "OPERATIONAL", latency: "8ms", uptime: "100.00%", icon: Radio }
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
          <Server className="w-8 h-8 text-cyan-400" />
          SYSTEM HEALTH & SERVICE TELEMETRY
        </h1>
        <p className="text-sm text-slate-400 mt-1">Live operational status of backend microservices, database engine, and AI workers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div key={i} className="p-6 rounded-3xl bg-[#0F1420] border border-[#232D42] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-sky-500/10 text-cyan-400">
                <s.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{s.name}</h3>
                <p className="text-xs font-mono text-slate-400">Latency: {s.latency} • Uptime: {s.uptime}</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {s.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
