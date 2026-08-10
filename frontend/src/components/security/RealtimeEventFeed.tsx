import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, CheckCircle2, Radio } from 'lucide-react';
import { useWebSocket } from '../../context/WebSocketContext';

interface EventItem {
  id: string;
  time: string;
  type: string;
  title: string;
  risk: number;
  severity: 'SAFE' | 'WARNING' | 'HIGH' | 'CRITICAL';
}

export const RealtimeEventFeed: React.FC = () => {
  const { lastMessage, isConnected } = useWebSocket();
  const [events, setEvents] = useState<EventItem[]>([
    { id: '1', time: '02:41:23', type: 'ACCOUNT_TAKEOVER', title: '17 Failed logins from IP 198.51.100.42', risk: 97, severity: 'CRITICAL' },
    { id: '2', time: '02:41:18', type: 'PHISHING_URL', title: 'Domain secure-bank-verify-login.com flagged', risk: 91, severity: 'CRITICAL' },
    { id: '3', time: '02:41:05', type: 'FRAUD_TXN', title: '₹85,000 Transfer attempt intercepted', risk: 94, severity: 'HIGH' }
  ]);

  useEffect(() => {
    if (lastMessage && lastMessage.event_type === 'SIMULATION_STEP') {
      const newEvent: EventItem = {
        id: Date.now().toString(),
        time: new Date().toLocaleTimeString(),
        type: lastMessage.data.type,
        title: lastMessage.data.title,
        risk: lastMessage.data.risk_score,
        severity: lastMessage.data.risk_score >= 75 ? 'CRITICAL' : 'HIGH'
      };
      setEvents(prev => [newEvent, ...prev.slice(0, 7)]);
    }
  }, [lastMessage]);

  return (
    <div className="bg-[#0F1420] border border-[#232D42] rounded-3xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Real-Time Threat Stream</h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">WebSocket Live</span>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
        <AnimatePresence>
          {events.map((evt) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 rounded-xl bg-[#161D2F] border border-[#232D42] flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  evt.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white leading-tight">{evt.title}</p>
                  <p className="text-[10px] font-mono text-slate-400 mt-0.5">{evt.type} • {evt.time}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                evt.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {evt.risk}/100
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
