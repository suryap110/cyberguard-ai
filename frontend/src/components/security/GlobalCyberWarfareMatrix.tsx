import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, ShieldAlert, Zap, Crosshair, Activity, CheckCircle2, 
  Radio, Lock, Terminal, X, RefreshCw, AlertTriangle, ShieldCheck, Flame, Cpu 
} from 'lucide-react';
import { soundFx } from '../../utils/audioSfx';

interface MapNode {
  id: string;
  city: string;
  country: string;
  ip: string;
  type: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  lat: number; // Y % position
  lng: number; // X % position
  packets: string;
  status: 'ACTIVE' | 'CONTAINED';
}

export const GlobalCyberWarfareMatrix: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'MAP' | 'BOTNET' | 'QUANTUM' | 'FEEDS'>('MAP');
  const [selectedNode, setSelectedNode] = useState<MapNode | null>(null);
  const [defconLevel, setDefconLevel] = useState<number>(2);
  const [scrubbingActive, setScrubbingActive] = useState<boolean>(false);
  const [livePacketsCount, setLivePacketsCount] = useState<number>(42890);

  const [nodes, setNodes] = useState<MapNode[]>([
    { id: 'NOD-GLOBAL-01', city: 'Tokyo', country: 'Japan', ip: '103.28.45.12', type: 'Zero-Day Exploit Injection', severity: 'CRITICAL', lat: 38, lng: 82, packets: '14.2 GB/s', status: 'ACTIVE' },
    { id: 'NOD-GLOBAL-02', city: 'Frankfurt', country: 'Germany', ip: '185.220.101.5', type: 'Distributed SYN Flood DDoS', severity: 'CRITICAL', lat: 32, lng: 52, packets: '88.6 GB/s', status: 'ACTIVE' },
    { id: 'NOD-GLOBAL-03', city: 'São Paulo', country: 'Brazil', ip: '177.12.89.44', type: 'UPI Credential Harvester', severity: 'HIGH', lat: 68, lng: 32, packets: '2.4 GB/s', status: 'ACTIVE' },
    { id: 'NOD-GLOBAL-04', city: 'San Francisco', country: 'USA', ip: '198.51.100.88', type: 'AI Deepfake Audio Stream', severity: 'HIGH', lat: 35, lng: 20, packets: '5.1 GB/s', status: 'ACTIVE' },
    { id: 'NOD-GLOBAL-05', city: 'Mumbai', country: 'India', ip: '103.45.12.90', type: 'UPI Fraud VPA Mule Node', severity: 'CRITICAL', lat: 48, lng: 68, packets: '11.8 GB/s', status: 'CONTAINED' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setLivePacketsCount(prev => prev + Math.floor(Math.random() * 45) + 12);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const handleContainNode = (nodeId: string) => {
    soundFx.playLevelUp();
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, status: 'CONTAINED' } : n));
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode({ ...selectedNode, status: 'CONTAINED' });
    }
  };

  const handleTriggerScrubbing = () => {
    soundFx.playLaserScan();
    setScrubbingActive(true);
    setTimeout(() => {
      setScrubbingActive(false);
      setNodes(prev => prev.map(n => ({ ...n, status: 'CONTAINED' })));
    }, 2500);
  };

  return (
    <div className="glass-card p-6 md:p-8 space-y-6 relative overflow-hidden border-cyan-500/40 shadow-cyber-glow font-mono text-xs">
      {/* Background Decor Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="cyber-box-decor" />

      {/* TOP COMMAND HEADER BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-purple-500/30 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-cyber-glow">
            <Globe className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 text-[10px] font-orbitron font-extrabold uppercase tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                DEFCON {defconLevel} - ELEVATED THREAT
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-orbitron font-extrabold">
                QUANTUM MESH SECURE
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white font-orbitron mt-1 flex items-center gap-2">
              <span>GLOBAL CYBER WARFARE MATRIX</span>
              <span className="text-[#00F0FF] text-xs">LIVE HUD</span>
            </h2>
          </div>
        </div>

        {/* TACTICAL TAB SWITCHER */}
        <div className="flex flex-wrap items-center gap-2 font-orbitron">
          {(['MAP', 'BOTNET', 'QUANTUM', 'FEEDS'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => { soundFx.playClick(); setActiveTab(tab); }}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#00F0FF] text-black border-[#00F0FF] shadow-cyber-glow scale-105'
                  : 'bg-[#0B1220] text-slate-400 border-purple-500/30 hover:text-white'
              }`}
            >
              {tab === 'MAP' ? '🌍 ATTACK MAP' : tab === 'BOTNET' ? '🛡️ BOTNET SCRUBBING' : tab === 'QUANTUM' ? '🔒 QUANTUM MESH' : '⚡ LIVE FEEDS'}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: INTERACTIVE GLOBAL ATTACK MAP */}
      {activeTab === 'MAP' && (
        <div className="space-y-4 relative z-10">
          {/* Map Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-xl bg-[#050811] border border-purple-500/30 text-[11px]">
            <div className="flex items-center gap-4">
              <span className="text-slate-400 flex items-center gap-1.5 font-sans">
                <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                Live Ingress Telemetry: <strong className="text-white font-mono">{livePacketsCount.toLocaleString()} Pkts/s</strong>
              </span>
              <span className="text-slate-400 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:flex items-center gap-1.5 font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Active Containment: <strong className="text-emerald-400 font-mono">100% Operational</strong>
              </span>
            </div>

            <button
              onClick={handleTriggerScrubbing}
              disabled={scrubbingActive}
              className={`px-4 py-1.5 rounded-xl font-orbitron font-extrabold text-xs transition-all cursor-pointer flex items-center gap-2 ${
                scrubbingActive
                  ? 'bg-amber-500 text-black animate-pulse'
                  : 'bg-gradient-to-r from-red-600 via-amber-500 to-amber-400 text-black shadow-cyber-glow hover:scale-105'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${scrubbingActive ? 'animate-spin' : ''}`} />
              <span>{scrubbingActive ? 'SCRUBBING GLOBAL TRAFFIC...' : 'TRIGGER GLOBAL SCRUBBING'}</span>
            </button>
          </div>

          {/* Interactive Sci-Fi World Map Grid */}
          <div className="relative w-full h-80 md:h-96 rounded-2xl bg-[#070C18] border border-cyan-500/30 overflow-hidden flex items-center justify-center">
            {/* World Grid Lines Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:2rem_2rem]" />

            {/* Glowing Center Target Ring */}
            <div className="absolute w-64 h-64 rounded-full border border-cyan-500/20 hud-ring-spin pointer-events-none" />
            <div className="absolute w-40 h-40 rounded-full border border-purple-500/20 hud-ring-reverse pointer-events-none" />

            {/* SVG Attack Vector Arcs */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <defs>
                <linearGradient id="attackGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="attackGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Animated Attack Arcs connecting nodes */}
              {nodes.map((node, i) => (
                <g key={node.id}>
                  <path
                    d={`M ${node.lng}% ${node.lat}% Q 50% 50% 48% 68%`}
                    stroke={i % 2 === 0 ? 'url(#attackGrad1)' : 'url(#attackGrad2)'}
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="6,6"
                    className="animate-pulse"
                  />
                </g>
              ))}
            </svg>

            {/* Map Nodes Pins */}
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => { soundFx.playLaserScan(); setSelectedNode(node); }}
                style={{ left: `${node.lng}%`, top: `${node.lat}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border transition-all hover:scale-125 z-20 group cursor-pointer ${
                  node.status === 'CONTAINED'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : node.severity === 'CRITICAL'
                    ? 'bg-red-500/20 border-red-500 text-red-400 animate-bounce'
                    : 'bg-amber-500/20 border-amber-500 text-amber-400'
                }`}
              >
                <span className={`w-3 h-3 rounded-full block ${
                  node.status === 'CONTAINED'
                    ? 'bg-emerald-400 shadow-[0_0_10px_#10B981]'
                    : node.severity === 'CRITICAL'
                    ? 'bg-red-500 shadow-[0_0_12px_#EF4444]'
                    : 'bg-amber-400 shadow-[0_0_10px_#F59E0B]'
                }`} />

                {/* Hover Label */}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block px-2.5 py-1 rounded bg-[#0B1220] border border-cyan-400 text-[10px] text-white whitespace-nowrap font-orbitron shadow-cyber-glow">
                  {node.city}, {node.country} ({node.ip})
                </span>
              </button>
            ))}

            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#0B1220]/90 backdrop-blur-md border border-purple-500/40 text-[10px] space-y-1 font-orbitron z-20">
              <span className="text-cyan-400 font-bold block">🌍 LIVE NODE TOPOLOGY</span>
              <span className="text-slate-300 block">Active Vectors: {nodes.filter(n => n.status === 'ACTIVE').length} Dangerous</span>
              <span className="text-emerald-400 block">Neutralized: {nodes.filter(n => n.status === 'CONTAINED').length} Nodes</span>
            </div>
          </div>

          {/* Node Inspection Modal */}
          <AnimatePresence>
            {selectedNode && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-5 rounded-2xl bg-[#0B1220] border border-cyan-500/50 space-y-3 relative text-left shadow-cyber-glow"
              >
                <button
                  onClick={() => setSelectedNode(null)}
                  className="absolute top-4 right-4 p-1 rounded-lg bg-[#070B14] text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-orbitron font-extrabold uppercase ${
                    selectedNode.status === 'CONTAINED'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}>
                    {selectedNode.status}
                  </span>
                  <h4 className="text-sm font-bold text-white font-orbitron">
                    {selectedNode.type} • {selectedNode.city}, {selectedNode.country}
                  </h4>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] pt-1 border-t border-purple-500/20">
                  <div>
                    <span className="text-slate-400 block text-[10px]">ORIGIN IP</span>
                    <span className="text-white font-mono font-bold">{selectedNode.ip}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">TRAFFIC BANDWIDTH</span>
                    <span className="text-cyan-400 font-mono font-bold">{selectedNode.packets}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">SEVERITY RATING</span>
                    <span className="text-amber-400 font-mono font-bold">{selectedNode.severity}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">ACTION PROTOCOL</span>
                    <span className="text-purple-400 font-mono font-bold">SOAR AUTO-RULE</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  {selectedNode.status === 'ACTIVE' && (
                    <button
                      onClick={() => handleContainNode(selectedNode.id)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron text-xs shadow-cyber-glow hover:scale-105 transition-all cursor-pointer"
                    >
                      EXECUTE INSTANT CONTAINMENT →
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* TAB 2: BOTNET SCRUBBING CONSOLE */}
      {activeTab === 'BOTNET' && (
        <div className="space-y-4 relative z-10 font-mono">
          <div className="p-4 rounded-xl bg-[#050811] border border-purple-500/30 text-xs space-y-2">
            <h4 className="font-bold text-cyan-400 font-orbitron flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>DDoS Scrubbing & BGP Anycast Routing Engine</span>
            </h4>
            <p className="text-slate-300 text-[11px]">
              Reroutes incoming malicious botnet streams through CyberGuard automated cleaning nodes before reaching target server instances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#0B1220] border border-purple-500/30 space-y-2">
              <span className="text-[10px] text-slate-400 font-orbitron block">SCRUBBING CAPACITY</span>
              <div className="text-xl font-bold text-white font-orbitron">2.4 Terabits/sec</div>
              <span className="text-[9px] text-emerald-400 font-bold">100% Operational</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1220] border border-purple-500/30 space-y-2">
              <span className="text-[10px] text-slate-400 font-orbitron block">BOTNET CLUSTERS BLOCKED</span>
              <div className="text-xl font-bold text-amber-400 font-orbitron">14 Active Clusters</div>
              <span className="text-[9px] text-amber-400 font-bold">Auto-Drop Enforced</span>
            </div>

            <div className="p-4 rounded-xl bg-[#0B1220] border border-purple-500/30 space-y-2">
              <span className="text-[10px] text-slate-400 font-orbitron block">LATENCY PENALTY</span>
              <div className="text-xl font-bold text-cyan-400 font-orbitron">&lt; 1.2 ms</div>
              <span className="text-[9px] text-cyan-400 font-bold">Zero Overhead</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: QUANTUM ENCRYPTION MESH */}
      {activeTab === 'QUANTUM' && (
        <div className="p-5 rounded-xl bg-[#050811] border border-purple-500/30 text-xs space-y-3 font-mono">
          <div className="flex items-center justify-between">
            <span className="font-bold text-purple-400 font-orbitron flex items-center gap-2">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>Post-Quantum Kyber-1024 Lattice Encryption</span>
            </span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">LATTICE LOCKED</span>
          </div>
          <p className="text-slate-300 text-[11px]">
            Node-to-node telemetry tunnels are protected with NIST-approved Post-Quantum Kyber-1024 key encapsulation.
          </p>
        </div>
      )}

      {/* TAB 4: THREAT FEEDS */}
      {activeTab === 'FEEDS' && (
        <div className="space-y-3 font-mono text-xs">
          {nodes.map(n => (
            <div key={n.id} className="p-3.5 rounded-xl bg-[#050811] border border-purple-500/30 flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-bold text-white block">{n.type} ({n.ip})</span>
                <span className="text-[10px] text-slate-400">Location: {n.city}, {n.country} • Bandwidth: {n.packets}</span>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                n.status === 'CONTAINED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {n.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
