import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ShieldAlert, CheckCircle2, Radio, Terminal, ArrowRight, ShieldCheck } from 'lucide-react';
import { useWebSocket } from '../context/WebSocketContext';
import { useNavigate } from 'react-router-dom';

export const SimulationPage: React.FC = () => {
  const navigate = useNavigate();
  const { lastMessage } = useWebSocket();
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [logs, setLogs] = useState<Array<{ step: number; title: string; risk: number }>>([]);
  const [containedSummary, setContainedSummary] = useState<any>(null);

  const startSimulation = async () => {
    setIsRunning(true);
    setCurrentStep(1);
    setLogs([]);
    setContainedSummary(null);

    try {
      await fetch('http://localhost:8000/api/simulation/run-attack', { method: 'POST' });
    } catch (e) {
      console.warn("Simulation call triggered in fallback mode.");
    }
  };

  useEffect(() => {
    if (lastMessage) {
      if (lastMessage.event_type === 'SIMULATION_STEP') {
        const d = lastMessage.data;
        setCurrentStep(d.step);
        setLogs(prev => [...prev, { step: d.step, title: d.title, risk: d.risk_score }]);
      } else if (lastMessage.event_type === 'SIMULATION_COMPLETE') {
        setIsRunning(false);
        setContainedSummary(lastMessage.data);
      }
    }
  }, [lastMessage]);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">
      <div className="text-center space-y-2">
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs font-bold border border-amber-500/30">
          CYBERGUARD HACKATHON SHOWCASE DEMO
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">LIVE ATTACK SIMULATION CENTER</h1>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          Execute a 1-click end-to-end multi-stage cyber fraud attack. Watch live WebSockets stream events, update SOC stats, and perform automated AI threat containment.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={startSimulation}
          disabled={isRunning}
          className="px-10 py-5 rounded-3xl bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 text-white font-extrabold text-lg shadow-red-glow hover:scale-105 disabled:opacity-50 transition-all flex items-center gap-3 mx-auto"
        >
          <Play className="w-6 h-6 fill-current" />
          <span>{isRunning ? 'SIMULATION IN PROGRESS...' : 'RUN FULL ATTACK SIMULATION'}</span>
        </button>
      </div>

      {/* Real-time Execution Log Panel */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0F1420] border border-[#232D42] space-y-4 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#232D42] pb-4">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-300">
            <Radio className={`w-4 h-4 ${isRunning ? 'text-red-500 animate-ping' : 'text-slate-500'}`} />
            <span>SIMULATION PIPELINE SEQUENCE (STEP {currentStep}/8)</span>
          </div>
          <span className="text-xs font-mono text-cyan-400">WebSockets Broadcasting</span>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {logs.length === 0 ? (
            <p className="p-8 text-center text-slate-500 font-mono text-xs">
              Click the button above to launch the live attack simulation.
            </p>
          ) : (
            logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-2xl bg-[#161D2F] border border-[#232D42] flex items-center justify-between font-mono text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                    0{log.step}
                  </span>
                  <span className="text-white font-semibold">{log.title}</span>
                </div>
                <span className="text-red-400 font-bold">{log.risk}/100</span>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Contained Hero Summary Card */}
      {containedSummary && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-3xl bg-gradient-to-br from-[#0F1420] to-[#161D2F] border-2 border-emerald-500/50 shadow-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">CONTAINMENT COMPLETE</span>
            <h2 className="text-3xl font-extrabold text-white mt-1">{containedSummary.title}</h2>
            <p className="text-sm font-mono text-slate-400 mt-1">Incident Code: {containedSummary.incident_code} • Risk 98/100 (CRITICAL)</p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto font-mono text-xs">
            <div className="p-3 rounded-2xl bg-[#080B11]">
              <span className="text-slate-400 block">Correlated</span>
              <span className="text-lg font-bold text-white mt-1">7 Events</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#080B11]">
              <span className="text-slate-400 block">Incidents</span>
              <span className="text-lg font-bold text-amber-400 mt-1">1 Created</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#080B11]">
              <span className="text-slate-400 block">Transactions</span>
              <span className="text-lg font-bold text-emerald-400 mt-1">1 Blocked</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/incidents')}
            className="px-8 py-3.5 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-sm shadow-cyber-glow hover:scale-105 transition-all inline-flex items-center gap-2"
          >
            <span>VIEW ATTACK GRAPH & INCIDENT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
