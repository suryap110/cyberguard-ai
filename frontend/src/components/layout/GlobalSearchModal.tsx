import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, CreditCard, Link2, User, Terminal, X, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const mockResults = [
    { title: 'Account Takeover Incident #INC-2026-0012', type: 'Incident', path: '/incidents', icon: ShieldAlert, category: 'Incidents' },
    { title: 'Suspicious Wire Transfer ₹85,000 (TXN-8291)', type: 'Transaction', path: '/transactions', icon: CreditCard, category: 'Transactions' },
    { title: 'Phishing Domain: secure-bank-verify-login.com', type: 'URL Threat', path: '/scanner/url', icon: Link2, category: 'Threats' },
    { title: 'Open Enterprise SOC Command Center', type: 'SOC Mode', path: '/soc', icon: Terminal, category: 'Navigation' },
    { title: 'Run Full Cyber Attack Simulation', type: 'Simulator', path: '/simulation', icon: ShieldAlert, category: 'Simulation' },
  ].filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#0F1420] border border-[#232D42] rounded-2xl shadow-2xl overflow-hidden p-4">
        <div className="flex items-center gap-3 px-3 pb-3 border-b border-[#232D42]">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            placeholder="Search threats, URLs, transactions, users, incidents..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none text-base font-sans"
          />
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 max-h-96 overflow-y-auto space-y-1">
          {mockResults.length === 0 ? (
            <p className="p-6 text-center text-slate-500 text-sm">No matching telemetry or security events found.</p>
          ) : (
            mockResults.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(item.path)}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#161D2F] transition-all text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/10 text-cyan-400 group-hover:bg-sky-500 group-hover:text-white transition-all">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">{item.title}</p>
                    <p className="text-[11px] font-mono text-slate-400">{item.category}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
