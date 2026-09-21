import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Laptop, Router, ShieldAlert, CheckCircle2, ArrowRight, X, Cpu, Wifi } from 'lucide-react';

export const AttackGraphView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const nodes = [
    { 
      id: 'srv-1', 
      title: 'Perimeter Gateway Router', 
      type: 'Router',
      status: 'Normal', 
      ip: '198.51.100.1', 
      icon: Router, 
      color: '#00E5FF', 
      lineColor: '#00E5FF',
      packet: 'INBOUND_HTTP_TRAFFIC 1.2 Gbps - Clean SSL Handshake',
      action: 'Normal routing traffic active'
    },
    { 
      id: 'srv-2', 
      title: 'DMZ Web Firewall', 
      type: 'Security Device',
      status: 'Normal', 
      ip: '10.0.1.1', 
      icon: Cpu, 
      color: '#00E5FF', 
      lineColor: '#00E5FF',
      packet: 'WAF_RULE_PASS: 9,412 requests verified',
      action: 'Filtering standard user connections'
    },
    { 
      id: 'srv-3', 
      title: 'External Proxy Attacker', 
      type: 'Suspicious Node',
      status: 'Attacking', 
      ip: '185.220.101.5', 
      icon: ShieldAlert, 
      color: '#FF3B3B', 
      lineColor: '#FF3B3B',
      packet: 'EXPLOIT_PAYLOAD: SQL injection select * from users--',
      action: 'ISOLATED - IP added to perimeter blackhole'
    },
    { 
      id: 'srv-[#4]', 
      title: 'SQL Database Cluster', 
      type: 'Server',
      status: 'Targeted', 
      ip: '10.0.2.15', 
      icon: Server, 
      color: '#FF7A00', 
      lineColor: '#FF3B3B',
      packet: 'UNAUTHORIZED_QUERY_BLOCKED: Connection pool reset',
      action: 'Enforced query parameter validation'
    },
    { 
      id: 'srv-5', 
      title: 'Analyst Workstation Mesh', 
      type: 'Computer',
      status: 'Protected', 
      ip: '10.0.4.88', 
      icon: Laptop, 
      color: '#22C55E', 
      lineColor: '#00E5FF',
      packet: 'EDR_AGENT_OK: Zero threats found on host',
      action: 'Continuous endpoint monitoring active'
    }
  ];

  return (
    <div className="w-full bg-[#101827] border border-slate-800/80 rounded-2xl p-6 relative overflow-hidden font-sans">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800/60 pb-3">
        <div>
          <h3 className="text-base font-bold text-[#F8FAFC] flex items-center gap-2">
            <Wifi className="w-5 h-5 text-[#00E5FF]" />
            Network Topology & Attack Path Visualization
          </h3>
          <p className="text-xs text-[#94A3B8] mt-1">Cyan lines denote clean connections; Red lines highlight suspicious attack paths</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 text-xs font-semibold">
          TOPOLOGY LIVE
        </span>
      </div>

      {/* Nodes Line Connection Simulation */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedNode(node)}
            className="p-4 rounded-xl bg-[#151F32] border border-slate-800/80 flex flex-col justify-between relative group cursor-pointer hover:border-[#00E5FF] transition-all shadow-md"
            style={{ borderColor: node.status === 'Attacking' ? 'rgba(255,59,59,0.5)' : undefined }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-[#070B14]" style={{ color: node.color }}>
                  <node.icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-[#94A3B8]">{node.type}</span>
              </div>
              <h4 className="text-xs font-bold text-[#F8FAFC] mb-1">{node.title}</h4>
              <p className="text-[10px] font-mono text-[#00E5FF]">{node.ip}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] mt-3">
              <span className="text-[#94A3B8]">Status:</span>
              <span className="font-bold px-1.5 py-0.5 rounded" style={{ color: node.color, backgroundColor: `${node.color}20` }}>
                {node.status}
              </span>
            </div>

            {/* Connection Vector Arrow */}
            {index < nodes.length - 1 && (
              <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10" style={{ color: node.lineColor }}>
                <ArrowRight className="w-4 h-4 animate-pulse" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Node Detail Popup */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="mt-6 p-5 rounded-xl bg-[#151F32] border border-slate-800 space-y-3 text-xs relative"
          >
            <button onClick={() => setSelectedNode(null)} className="absolute top-4 right-4 p-1 text-[#94A3B8] hover:text-[#F8FAFC]">
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-[#070B14]" style={{ color: selectedNode.color }}>
                <selectedNode.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#F8FAFC]">{selectedNode.title} ({selectedNode.ip})</h4>
                <p className="text-[11px] text-[#94A3B8]">Node Status: <strong style={{ color: selectedNode.color }}>{selectedNode.status}</strong></p>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] text-[#94A3B8] uppercase">Packet Telemetry:</span>
              <pre className="p-2.5 rounded-lg bg-[#070B14] text-[#F8FAFC] font-mono text-[11px]">
                {selectedNode.packet}
              </pre>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-[#94A3B8] uppercase">Action Protocol:</span>
              <p className="p-2 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] font-semibold text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {selectedNode.action}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};