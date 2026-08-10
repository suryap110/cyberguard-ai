import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Link2, Key, UserCheck, CreditCard, ArrowRight, X, Cpu, CheckCircle2 } from 'lucide-react';

export const AttackGraphView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const nodes = [
    { 
      id: '1', 
      title: 'Phishing SMS Received', 
      risk: 75, 
      time: '02:30 AM', 
      icon: Link2, 
      color: 'text-amber-400', 
      bg: 'border-amber-500/30 bg-amber-500/10',
      sourceIp: '198.51.100.42 (SMS Gateway Relay)',
      rawPacket: 'SMS_RECV: "Your bank account will be blocked today. Click http://secure-bank-login-update.com"',
      mitigation: 'Block SMS gateway sender ID across mobile carrier edge.'
    },
    { 
      id: '2', 
      title: 'Malicious Domain Clicked', 
      risk: 91, 
      time: '02:31 AM', 
      icon: Link2, 
      color: 'text-orange-400', 
      bg: 'border-orange-500/30 bg-orange-500/10',
      sourceIp: 'Domain DNS 104.21.45.18 (Newly Issued SSL)',
      rawPacket: 'HTTP_GET /verify-otp HTTP/1.1 Host: secure-bank-login-update.com',
      mitigation: 'Inject DNS sinkhole entry for secure-bank-login-update.com.'
    },
    { 
      id: '3', 
      title: 'Credential Harvested', 
      risk: 95, 
      time: '02:33 AM', 
      icon: Key, 
      color: 'text-red-400', 
      bg: 'border-red-500/30 bg-red-500/10',
      sourceIp: 'Form Endpoint POST /harvest_credentials',
      rawPacket: 'HTTP_POST payload: { username: "user_102", pass_hash: "******", otp: "9412" }',
      mitigation: 'Force immediate password reset & invalidate all active JWT tokens.'
    },
    { 
      id: '4', 
      title: '17 Failed Login Spikes', 
      risk: 96, 
      time: '02:35 AM', 
      icon: UserCheck, 
      color: 'text-red-400', 
      bg: 'border-red-500/30 bg-red-500/10',
      sourceIp: 'Attacker Proxy IP 198.51.100.42',
      rawPacket: 'AUTH_FAIL_BURST: 17 attempts in 180s from unrecognized Linux UserAgent',
      mitigation: 'Enforce IP rate limit & require WebAuthn FIDO2 step-up.'
    },
    { 
      id: '5', 
      title: 'Account Takeover Event', 
      risk: 97, 
      time: '02:37 AM', 
      icon: ShieldAlert, 
      color: 'text-red-400', 
      bg: 'border-red-500/40 bg-red-500/20',
      sourceIp: 'Authenticated Session token #sess_9182',
      rawPacket: 'SESSION_HIJACK: New session bound to IP 198.51.100.42 (Location Jump)',
      mitigation: 'Terminate active session & trigger account quarantine status.'
    },
    { 
      id: '6', 
      title: '₹85,000 Fraud Wire Transfer', 
      risk: 98, 
      time: '02:38 AM', 
      icon: CreditCard, 
      color: 'text-red-400', 
      bg: 'border-red-500/50 bg-red-500/30 shadow-red-glow',
      sourceIp: 'Core Banking API /v1/transfer',
      rawPacket: 'TXN_REQ: { amount: 85000, payee: "UNKNOWN_REMITTANCE", type: "IMPS" }',
      mitigation: 'Freeze outgoing wire transfer & flag destination VPA handle.'
    }
  ];

  return (
    <div className="w-full bg-[#0F1420] border border-[#232D42] rounded-3xl p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            Attack Vector Graph & Interactive Progression Timeline
          </h3>
          <p className="text-xs text-slate-400 mt-1">Click any attack step node below to inspect raw telemetry packets & AI containment steps</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-mono font-bold animate-pulse">
          INTERACTIVE THREAT GRAPH
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            onClick={() => setSelectedNode(node)}
            className={`p-4 rounded-2xl border ${node.bg} flex flex-col justify-between relative group cursor-pointer hover:scale-105 transition-all shadow-lg`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-xl bg-[#080B11] ${node.color}`}>
                  <node.icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">Step 0{index + 1}</span>
              </div>
              <h4 className="text-xs font-bold text-white leading-snug mb-2 group-hover:text-cyan-400 transition-colors">{node.title}</h4>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
              <span className="text-slate-400">{node.time}</span>
              <span className={`font-bold ${node.color}`}>{node.risk}/100</span>
            </div>

            {index < nodes.length - 1 && (
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-sky-400 animate-pulse">
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-6 p-6 rounded-2xl bg-[#161D2F] border border-[#232D42] space-y-4 font-mono text-xs shadow-2xl relative"
          >
            <button onClick={() => setSelectedNode(null)} className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl bg-[#080B11] ${selectedNode.color}`}>
                <selectedNode.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-sans">{selectedNode.title}</h4>
                <p className="text-[11px] text-slate-400">Recorded at {selectedNode.time} • Risk Score: {selectedNode.risk}/100</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase">Telemetry Origin IP:</span>
                <p className="p-3 rounded-xl bg-[#080B11] text-cyan-400 font-bold">{selectedNode.sourceIp}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase">AI Recommended Mitigation:</span>
                <p className="p-3 rounded-xl bg-[#080B11] text-emerald-400 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  {selectedNode.mitigation}
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase">Raw Intercepted Packet Payload:</span>
              <pre className="p-3 rounded-xl bg-[#080B11] text-slate-300 font-mono text-[11px] overflow-x-auto border border-[#232D42]">
                {selectedNode.rawPacket}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};