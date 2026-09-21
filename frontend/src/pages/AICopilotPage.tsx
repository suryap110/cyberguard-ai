import React, { useState, useRef } from 'react';
import { Bot, Send, Sparkles, Volume2, VolumeX, Copy, Check, ShieldAlert, Cpu, Paperclip, CheckCircle2 } from 'lucide-react';
import { ToastContainer, ToastMessage } from '../components/ui/Toast';
import { voiceSpeech } from '../utils/voiceSpeech';

interface Message {
  id: string;
  sender: 'USER' | 'AI';
  text: string;
  explanationCard?: {
    threatType: string;
    riskScore: number;
    explanation: string;
    recommendations: string[];
  };
}

export const AICopilotPage: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'AI',
      text: "Greetings. I am Cyber Shield AI Assistant. I monitor active threat telemetry, explain complex attack chains, and provide automated security recommendations.",
      explanationCard: {
        threatType: 'SOC Sentinel Overview',
        riskScore: 12,
        explanation: 'System security posture is currently OPTIMAL. 0 critical vulnerabilities unpatched.',
        recommendations: [
          'Enable multi-factor WebAuthn for all admin user sessions.',
          'Review 24-hour API log rate limiting metrics.',
          'Perform automated zero-trust perimeter health audit.'
        ]
      }
    }
  ]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message: string) => {
    const toastId = Date.now().toString();
    setToasts(prev => [...prev, { id: toastId, type, title, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 4000);
  };

  const handleSend = (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'AI',
        text: `Analysis complete for query: "${textToSend}". Cyber Shield AI Sentinel has correlated network logs and threat intelligence databases.`,
        explanationCard: {
          threatType: 'AI Security Telemetry Correlation',
          riskScore: 28,
          explanation: `The query pattern matches standardized threat vectors. Our AI models suggest enforcing proactive perimeter inspection.`,
          recommendations: [
            'Isolate unverified IP ranges at the gateway level.',
            'Inspect inbound payloads for SQL and XSS injection vectors.',
            'Trigger automated SOAR playbook response.'
          ]
        }
      };

      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 600);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast('success', 'Copied to Clipboard', 'Text copied.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto font-sans text-[#F8FAFC] min-h-[85vh] flex flex-col justify-between">
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      <div className="space-y-6 flex-1">
        {/* Assistant Header */}
        <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#151F32] border border-[#00E5FF]/40 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.25)] flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#F8FAFC] flex items-center gap-2">
                Cyber Shield AI Assistant
                <span className="px-2 py-0.5 rounded-full bg-[#7C3AED]/20 text-[#7C3AED] border border-[#7C3AED]/40 text-[10px] font-bold">
                  AI SENTINEL
                </span>
              </h1>
              <p className="text-xs text-[#94A3B8]">Proactive threat explanation, incident forensics, and security recommendations</p>
            </div>
          </div>
        </div>

        {/* Suggested Prompt Chips */}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-[#64748B] font-medium flex items-center gap-1 self-center text-[11px] mr-1">
            <Sparkles className="w-3.5 h-3.5 text-[#00E5FF]" /> Suggested Questions:
          </span>

          <button
            onClick={() => handleSend("Explain recent critical threats and recommended actions")}
            className="px-3 py-1.5 rounded-lg bg-[#151F32] border border-slate-800 text-[#00E5FF] hover:border-[#00E5FF] transition-all cursor-pointer"
          >
            "Explain recent critical threats"
          </button>

          <button
            onClick={() => handleSend("How to mitigate SQL injection attack TRT-1029?")}
            className="px-3 py-1.5 rounded-lg bg-[#151F32] border border-slate-800 text-[#00E5FF] hover:border-[#00E5FF] transition-all cursor-pointer"
          >
            "Mitigate SQL injection TRT-1029"
          </button>

          <button
            onClick={() => handleSend("Provide network isolation recommendations")}
            className="px-3 py-1.5 rounded-lg bg-[#151F32] border border-slate-800 text-[#00E5FF] hover:border-[#00E5FF] transition-all cursor-pointer"
          >
            "Network isolation advice"
          </button>
        </div>

        {/* Message Log */}
        <div className="space-y-4">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-3 ${m.sender === 'USER' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'AI' && (
                <div className="w-8 h-8 rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className="max-w-2xl space-y-3">
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  m.sender === 'USER'
                    ? 'bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#070B14] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                    : 'cg-card text-[#F8FAFC]'
                }`}>
                  <p>{m.text}</p>
                </div>

                {/* AI Explanation & Analysis Cards */}
                {m.sender === 'AI' && m.explanationCard && (
                  <div className="cg-card-elevated p-4 space-y-3 border-[#7C3AED]/40 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                      <span className="font-bold text-[#F8FAFC] flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-[#7C3AED]" />
                        {m.explanationCard.threatType}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] font-bold text-[10px]">
                        Risk Score: {m.explanationCard.riskScore}/100
                      </span>
                    </div>

                    <p className="text-[#94A3B8]">{m.explanationCard.explanation}</p>

                    <div className="space-y-1 pt-1">
                      <span className="text-[#00E5FF] font-semibold text-[11px]">Security Recommendations:</span>
                      <ul className="space-y-1">
                        {m.explanationCard.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-[#F8FAFC]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                            <span>{rec}</span>
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
            <div className="flex items-center gap-2 text-xs font-semibold text-[#00E5FF] bg-[#101827] p-3 rounded-xl border border-slate-800 w-fit">
              <Bot className="w-4 h-4 animate-spin text-[#00E5FF]" />
              <span>Analyzing Security Telemetry...</span>
            </div>
          )}
        </div>
      </div>

      {/* Input Box */}
      <div className="p-3 rounded-2xl bg-[#101827] border border-slate-800/80 flex items-center gap-3 shadow-2xl mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Cyber Shield AI Assistant for threat explanation, security advice, or IOC details..."
          className="flex-1 bg-transparent text-[#F8FAFC] placeholder-[#64748B] focus:outline-none text-sm px-2"
        />
        <button
          onClick={() => handleSend()}
          disabled={loading || !input.trim()}
          className="p-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#3B82F6] text-[#070B14] font-bold shadow-[0_0_15px_rgba(0,229,255,0.25)] hover:scale-105 transition-all disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
