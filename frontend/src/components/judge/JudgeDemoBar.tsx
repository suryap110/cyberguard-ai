import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Play, Volume2, VolumeX, ShieldAlert, Zap, Mic, CreditCard, Radio, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audioSfx';
import { voiceSpeech } from '../../utils/voiceSpeech';
import { JudgeArchitectureModal } from './JudgeArchitectureModal';
import { DemoBarSpecificationModal } from './DemoBarSpecificationModal';

export const JudgeDemoBar: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [showArchModal, setShowArchModal] = useState(false);
  const [showSpecModal, setShowSpecModal] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(voiceSpeech.enabled);
  const [activeScenario, setActiveScenario] = useState<string | null>(null);

  const toggleVoice = () => {
    soundFx.playClick();
    voiceSpeech.enabled = !voiceEnabled;
    setVoiceEnabled(!voiceEnabled);
    if (!voiceEnabled) {
      voiceSpeech.speak("CyberGuard AI Speech Synthesis System Initialized.", true);
    } else {
      voiceSpeech.stop();
    }
  };

  const handleRunScenario = (id: string, name: string, path: string, speechText: string) => {
    soundFx.playLaserScan();
    setActiveScenario(id);
    navigate(path);
    voiceSpeech.speak(speechText, true);
    setTimeout(() => setActiveScenario(null), 3000);
  };

  return (
    <>
      <div className="bg-gradient-to-r from-purple-950 via-[#070C1A] to-cyan-950 border-b border-purple-500/50 px-4 py-2 text-xs font-mono relative z-40 text-slate-200 shadow-[0_0_25px_rgba(168,85,247,0.35)]">
        <div className="max-w-[1750px] mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Demo Bar Specification & Architecture */}
          <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => { soundFx.playClick(); setShowSpecModal(true); }}
              title="Click to view Live Product Demo Bar Specification & Capabilities"
              className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/50 font-orbitron font-extrabold text-[10px] flex items-center gap-1.5 shadow-cyber-glow hover:bg-purple-500/30 hover:border-purple-400 hover:scale-105 transition-all cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>LIVE PRODUCT DEMO BAR</span>
            </button>

            <button
              onClick={() => setShowArchModal(true)}
              className="px-3 py-1 rounded-xl bg-cyan-500/20 text-[#00F0FF] border border-cyan-500/40 font-orbitron font-bold text-[11px] hover:bg-cyan-500/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>🏛️ ARCHITECTURE BLUEPRINT</span>
            </button>
          </div>

          {/* Center: 4 1-Click Live Judge Scenarios */}
          {!collapsed && (
            <div className="hidden xl:flex items-center gap-2 font-orbitron">
              <span className="text-[10px] text-slate-400 uppercase font-bold mr-1">1-CLICK DEMO PRESETS:</span>

              <button
                onClick={() => handleRunScenario(
                  'sc-1', 
                  'Phishing URL Intercept', 
                  '/scanner/url', 
                  'Live Scenario 1 Executed: Phishing URL Interception. High risk typosquatting domain detected and blocked.'
                )}
                className={`px-3 py-1 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'sc-1' ? 'bg-[#00F0FF] text-black border-[#00F0FF] shadow-cyber-glow' : 'bg-[#0B1220] border-cyan-500/40 text-cyan-400 hover:border-cyan-400'
                }`}
              >
                <Zap className="w-3 h-3" />
                <span>1. Phishing URL</span>
              </button>

              <button
                onClick={() => handleRunScenario(
                  'sc-2', 
                  'Deepfake Voice Detector', 
                  '/deepfake-detector', 
                  'Live Scenario 2 Executed: Deepfake Voice Forensics. Synthetic vocal clone detected with 98.4% confidence.'
                )}
                className={`px-3 py-1 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'sc-2' ? 'bg-purple-500 text-white border-purple-500 shadow-cyber-glow' : 'bg-[#0B1220] border-purple-500/40 text-purple-300 hover:border-purple-400'
                }`}
              >
                <Mic className="w-3 h-3" />
                <span>2. Deepfake Voice</span>
              </button>

              <button
                onClick={() => handleRunScenario(
                  'sc-3', 
                  'UPI Fraud Shield', 
                  '/upi-guard', 
                  'Live Scenario 3 Executed: NPCI UPI Money-Mule Block. Unauthorized debit request intercepted.'
                )}
                className={`px-3 py-1 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'sc-3' ? 'bg-emerald-500 text-black border-emerald-500 shadow-cyber-glow' : 'bg-[#0B1220] border-emerald-500/40 text-emerald-400 hover:border-emerald-400'
                }`}
              >
                <CreditCard className="w-3 h-3" />
                <span>3. UPI Mule Block</span>
              </button>

              <button
                onClick={() => handleRunScenario(
                  'sc-4', 
                  'Ransomware Attack Sim', 
                  '/simulation', 
                  'Live Scenario 4 Executed: Multi-Stage Ransomware Attack Simulation. Automated SOAR playbooks engaged.'
                )}
                className={`px-3 py-1 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeScenario === 'sc-4' ? 'bg-red-500 text-white border-red-500 shadow-cyber-glow' : 'bg-[#0B1220] border-red-500/40 text-red-400 hover:border-red-400'
                }`}
              >
                <Radio className="w-3 h-3 animate-pulse" />
                <span>4. Ransomware Sim</span>
              </button>
            </div>
          )}

          {/* Right: AI Voice Toggle & Collapse */}
          <div className="flex items-center gap-3 shrink-0 font-orbitron">
            <button
              onClick={toggleVoice}
              title={voiceEnabled ? 'Disable AI Voice Speech Audio' : 'Enable AI Voice Speech Audio'}
              className={`px-3 py-1 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                voiceEnabled ? 'bg-purple-600/30 border-purple-500 text-purple-300 shadow-cyber-glow' : 'bg-[#0B1220] border-slate-700 text-slate-500'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-3.5 h-3.5 text-purple-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{voiceEnabled ? 'AI VOICE ON' : 'AI VOICE OFF'}</span>
            </button>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-lg text-slate-400 hover:text-white"
            >
              {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Architecture & Demo Bar Specification Modals */}
      <JudgeArchitectureModal isOpen={showArchModal} onClose={() => setShowArchModal(false)} />
      <DemoBarSpecificationModal isOpen={showSpecModal} onClose={() => setShowSpecModal(false)} />
    </>
  );
};
