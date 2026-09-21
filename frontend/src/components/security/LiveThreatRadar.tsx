import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, AlertTriangle, ShieldCheck, X, ChevronRight, Zap } from 'lucide-react';
import { soundFx } from '../../utils/audioSfx';

interface RadarNode {
  id: string;
  type: 'IP' | 'DOMAIN' | 'USER' | 'VPA' | 'APK';
  name: string;
  riskScore: number;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  x: number; // % offset
  y: number; // % offset
  details: string;
}

export const LiveThreatRadar: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<RadarNode | null>(null);

  const radarNodes: RadarNode[] = [
    { id: 'NOD-101', type: 'DOMAIN', name: 'http://secure-verify-bank.com', riskScore: 97, status: 'CRITICAL', x: 72, y: 28, details: 'Typosquatting credential harvesting payload detected.' },
    { id: 'NOD-102', type: 'VPA', name: 'prize-claim@paytm', riskScore: 94, status: 'CRITICAL', x: 28, y: 70, details: 'NPCI Flagged Money Mule account (14 disputes).' },
    { id: 'NOD-103', type: 'APK', name: 'Bank_KYC_Update.apk', riskScore: 88, status: 'WARNING', x: 82, y: 65, details: 'Overlay malware with SMS forwarder permission.' },
    { id: 'NOD-104', type: 'IP', name: '185.220.101.5 (Tor Exit)', riskScore: 78, status: 'WARNING', x: 35, y: 25, details: 'Brute force credential stuffing attempt.' },
    { id: 'NOD-105', type: 'USER', name: 'Surya (Protected User)', riskScore: 4, status: 'SAFE', x: 50, y: 50, details: 'Zero-Trust Shield active. 100% Optimal.' },
  ];

  const handleNodeClick = (node: RadarNode) => {
    soundFx.playLaserScan();
    setSelectedNode(node);
  };

  return (
    <div className="bg-[#0B1220] border border-cyan-500/40 rounded-3xl p-7 md:p-8 shadow-cyber-glow relative overflow-hidden font-mono text-xs h-full flex flex-col justify-between space-y-6">
      {/* Radar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-cyan-400 animate-spin-slow" />
          <span className="font-extrabold text-white text-sm tracking-wide">TACTICAL THREAT RADAR</span>
        </div>
        <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 font-bold text-[10px] border border-cyan-500/40">
          360° SWEEP ACTIVE
        </span>
      </div>

      {/* Interactive Radar Canvas & Sweep Line */}
      <div className="relative w-full h-80 md:h-96 my-2 bg-[#070B14] rounded-2xl border border-[#1E293B] overflow-hidden flex items-center justify-center">
        {/* Concentric Radar Grid Rings */}
        <div className="absolute w-[260px] h-[260px] rounded-full border border-cyan-500/20"></div>
        <div className="absolute w-[180px] h-[180px] rounded-full border border-cyan-500/20"></div>
        <div className="absolute w-[100px] h-[100px] rounded-full border border-cyan-500/20"></div>

        {/* Crosshair Axes */}
        <div className="absolute w-full h-px bg-cyan-500/20"></div>
        <div className="absolute h-full w-px bg-cyan-500/20"></div>

        {/* Rotating Radar Sweep Cone */}
        <div className="absolute inset-0 hud-ring-spin pointer-events-none">
          <div className="w-1/2 h-1/2 bg-gradient-to-tr from-cyan-500/30 to-transparent origin-bottom-right rounded-tl-full"></div>
        </div>

        {/* Radar Nodes */}
        {radarNodes.map((node) => (
          <button
            key={node.id}
            onClick={() => handleNodeClick(node)}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border transition-all hover:scale-125 z-20 group ${
              node.status === 'CRITICAL' ? 'bg-red-500/20 border-red-500 text-red-400 animate-bounce' :
              node.status === 'WARNING' ? 'bg-amber-500/20 border-amber-500 text-amber-400' :
              'bg-emerald-500/20 border-emerald-500 text-emerald-400'
            }`}
            title={`${node.name} (${node.riskScore}%)`}
          >
            <span className={`w-2.5 h-2.5 rounded-full block ${
              node.status === 'CRITICAL' ? 'bg-red-500 shadow-[0_0_10px_#EF4444]' :
              node.status === 'WARNING' ? 'bg-amber-400 shadow-[0_0_10px_#FBBF24]' :
              'bg-emerald-400 shadow-[0_0_10px_#10B981]'
            }`}></span>
          </button>
        ))}
      </div>

      {/* Node Details Inspection Modal */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="p-4 rounded-2xl bg-[#101827] border border-cyan-500/40 text-left space-y-2 relative"
          >
            <button 
              onClick={() => setSelectedNode(null)} 
              className="absolute top-3 right-3 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                selectedNode.status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-400'
              }`}>
                {selectedNode.status} (RISK: {selectedNode.riskScore}/100)
              </span>
              <span className="text-white font-bold">{selectedNode.name}</span>
            </div>
            <p className="text-[11px] text-slate-300">{selectedNode.details}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
