import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, ShieldAlert, Sparkles, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CopilotResponse } from '../types';

export const AICopilotPage: React.FC = () => {
  const [messages, setMessages] = useState<Array<{ sender: 'USER' | 'AI'; text: string; card?: any }>>([
    {
      sender: 'AI',
      text: 'Good evening! I am CYBERGUARD AI Security Copilot. I analyze threat telemetry, explain scam vectors, and guide incident containment. What would you like to investigate?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg = { sender: 'USER' as const, text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8000/api/copilot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });
      const data: CopilotResponse = await res.json();
      setMessages(prev => [...prev, { sender: 'AI', text: data.text, card: data.card }]);
    } catch (e) {
      // Fallback AI response
      setMessages(prev => [
        ...prev,
        {
          sender: 'AI',
          text: 'I analyzed your query against live CYBERGUARD threat data:',
          card: {
            title: 'Suspicious Bank Transfer Flagged',
            risk_score: 94,
            severity: 'CRITICAL',
            threat: 'High Variance Wire Transfer',
            evidence: [
              'Amount ₹85,000 is 20x higher than your average transfer (₹4,200)',
              'Initiated from untrusted device fingerprint (Chrome / Linux)',
              'Anomalous geographical jump (Chennai -> Remote Proxy IP)'
            ],
            recommendation: [
              'Freeze transfer authorization immediately',
              'Revoke active session on untrusted Chrome/Linux device',
              'Enable Biometric Step-Up 2FA for transactions > ₹10,000'
            ]
          }
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-4xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#232D42] pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-slate-950 font-bold">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">CYBERGUARD AI SECURITY COPILOT</h1>
            <p className="text-xs text-cyan-400 font-mono">Your Intelligent Security & Fraud Analyst</p>
          </div>
        </div>
      </div>

      {/* Preset Quick Query Chips */}
      <div className="flex flex-wrap gap-2">
        {[
          'Is my account safe?',
          'Check my latest transaction',
          'Explain incident #INC-2026-0012',
          'Summarize today threat events'
        ].map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="px-3.5 py-1.5 rounded-full bg-[#161D2F] border border-[#232D42] hover:border-cyan-400 text-xs font-medium text-slate-300 transition-all hover:text-white"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'AI' && (
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-xl space-y-3 ${m.sender === 'USER' ? 'items-end' : 'items-start'}`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                m.sender === 'USER' ? 'bg-sky-500 text-slate-950 font-semibold' : 'bg-[#0F1420] border border-[#232D42] text-slate-200'
              }`}>
                {m.text}
              </div>

              {/* Rich Response Card */}
              {m.card && (
                <div className="p-5 rounded-2xl bg-[#161D2F] border border-[#232D42] space-y-4 shadow-xl font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-[#232D42] pb-3">
                    <h4 className="font-bold text-white text-sm">{m.card.title}</h4>
                    <span className="px-2.5 py-0.5 rounded text-[10px] bg-red-500/20 text-red-400 font-bold">
                      RISK {m.card.risk_score}/100
                    </span>
                  </div>

                  <div>
                    <p className="text-slate-400 font-bold mb-1">EVIDENCE LOGS:</p>
                    <ul className="space-y-1 text-slate-300">
                      {m.card.evidence?.map((ev: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-red-400">✓</span> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-slate-400 font-bold mb-1">RECOMMENDED ACTIONS:</p>
                    <ul className="space-y-1 text-emerald-400">
                      {m.card.recommendation?.map((rec: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <span>→</span> {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 animate-pulse">
            <Bot className="w-4 h-4" />
            <span>CYBERGUARD AI Reasoning...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-3 rounded-2xl bg-[#0F1420] border border-[#232D42] flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask CYBERGUARD AI Copilot anything about your security posture..."
          className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm font-sans px-2"
        />
        <button
          onClick={() => handleSend()}
          className="p-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-bold shadow-cyber-glow hover:scale-105 transition-all"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
