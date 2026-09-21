import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundFx } from '../utils/audioSfx';

export interface Mission {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  progress: number;
  maxProgress: number;
  completed: boolean;
  claimed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  rewardXp: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface RankInfo {
  level: number;
  title: string;
  minXp: number;
  maxXp: number;
  badgeColor: string;
}

const RANKS: RankInfo[] = [
  { level: 1, title: 'ROOKIE DEFENDER', minXp: 0, maxXp: 1000, badgeColor: 'text-slate-400 border-slate-500' },
  { level: 5, title: 'CYBER SCOUT', minXp: 1000, maxXp: 5000, badgeColor: 'text-cyan-400 border-cyan-500' },
  { level: 10, title: 'THREAT HUNTER', minXp: 5000, maxXp: 15000, badgeColor: 'text-blue-400 border-blue-500' },
  { level: 20, title: 'SECURITY OPERATIVE', minXp: 15000, maxXp: 35000, badgeColor: 'text-emerald-400 border-emerald-500' },
  { level: 30, title: 'CYBER GUARDIAN', minXp: 35000, maxXp: 70000, badgeColor: 'text-purple-400 border-purple-500' },
  { level: 50, title: 'DIGITAL SENTINEL', minXp: 70000, maxXp: 120000, badgeColor: 'text-pink-400 border-pink-500' },
  { level: 75, title: 'CYBER COMMANDER', minXp: 120000, maxXp: 200000, badgeColor: 'text-amber-400 border-amber-500' },
  { level: 100, title: 'DEFENSE ARCHITECT', minXp: 200000, maxXp: 500000, badgeColor: 'text-red-400 border-red-500' }
];

interface GamificationContextType {
  xp: number;
  level: number;
  rankTitle: string;
  nextLevelXp: number;
  currentRankInfo: RankInfo;
  streakDays: number;
  cyberCredits: number;
  missions: Mission[];
  achievements: Achievement[];
  soundEnabled: boolean;
  particlesEnabled: boolean;
  crtEnabled: boolean;
  addXp: (amount: number, reason: string) => void;
  claimMissionReward: (missionId: string) => void;
  updateMissionProgress: (missionId: string, delta: number) => void;
  toggleSound: () => void;
  toggleParticles: () => void;
  toggleCrt: () => void;
  triggerLevelUpAnimation: boolean;
  recentXpEvent: { amount: number; reason: string } | null;
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined);

export const GamificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('cyberguard_xp');
    return saved ? parseInt(saved, 10) : 148500;
  });

  const [streakDays, setStreakDays] = useState<number>(12);
  const [cyberCredits, setCyberCredits] = useState<number>(45820);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(true);
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);
  const [triggerLevelUpAnimation, setTriggerLevelUpAnimation] = useState<boolean>(false);
  const [recentXpEvent, setRecentXpEvent] = useState<{ amount: number; reason: string } | null>(null);

  const [missions, setMissions] = useState<Mission[]>([
    { id: 'm1', title: 'MISSION 01: Analyze Suspicious Domain', description: 'Run Phishing URL Hunter on a high-risk URL', rewardXp: 150, progress: 1, maxProgress: 1, completed: true, claimed: false },
    { id: 'm2', title: 'MISSION 02: Review Live Security Radar', description: 'Inspect 3 active threat nodes on the tactical radar', rewardXp: 200, progress: 2, maxProgress: 3, completed: false, claimed: false },
    { id: 'm3', title: 'MISSION 03: Phishing Awareness Challenge', description: 'Complete automated threat simulation in War Room', rewardXp: 350, progress: 0, maxProgress: 1, completed: false, claimed: false },
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'a1', title: 'PHISHING HUNTER', description: 'Intercepted 10+ phishing links', iconName: 'Globe', rewardXp: 250, unlocked: true, unlockedAt: 'Today' },
    { id: 'a2', title: 'SCAM SLAYER', description: 'Identified 25+ fraudulent SMS messages', iconName: 'FileText', rewardXp: 300, unlocked: true, unlockedAt: 'Yesterday' },
    { id: 'a3', title: 'DIGITAL SENTINEL', description: 'Maintained a 12-day defense streak', iconName: 'ShieldCheck', rewardXp: 500, unlocked: true, unlockedAt: '3 days ago' },
    { id: 'a4', title: 'THREAT MASTER', description: 'Investigated 100+ telemetry incidents', iconName: 'Target', rewardXp: 750, unlocked: false },
    { id: 'a5', title: 'INCIDENT COMMANDER', description: 'Resolved 25+ threat tickets', iconName: 'Terminal', rewardXp: 1000, unlocked: false },
    { id: 'a6', title: 'ZERO TRUST OVERLORD', description: 'Completed all security recommendations', iconName: 'Lock', rewardXp: 1500, unlocked: false },
  ]);

  // Calculate Level and Rank from XP
  let currentRankInfo = RANKS[0];
  for (let r of RANKS) {
    if (xp >= r.minXp) currentRankInfo = r;
  }
  const level = currentRankInfo.level + Math.floor((xp - currentRankInfo.minXp) / 2000);
  const rankTitle = currentRankInfo.title;
  const nextLevelXp = currentRankInfo.maxXp;

  useEffect(() => {
    localStorage.setItem('cyberguard_xp', xp.toString());
  }, [xp]);

  const addXp = (amount: number, reason: string) => {
    setXp(prev => {
      const next = prev + amount;
      if (Math.floor(next / 5000) > Math.floor(prev / 5000)) {
        soundFx.playLevelUp();
        setTriggerLevelUpAnimation(true);
        setTimeout(() => setTriggerLevelUpAnimation(false), 3500);
      } else {
        soundFx.playShieldBlock();
      }
      return next;
    });

    setCyberCredits(prev => prev + Math.floor(amount / 5));
    setRecentXpEvent({ amount, reason });
    setTimeout(() => setRecentXpEvent(null), 3000);
  };

  const updateMissionProgress = (missionId: string, delta: number) => {
    setMissions(prev => prev.map(m => {
      if (m.id === missionId && !m.completed) {
        const nextProgress = Math.min(m.maxProgress, m.progress + delta);
        const isCompleted = nextProgress >= m.maxProgress;
        if (isCompleted) soundFx.playLevelUp();
        return { ...m, progress: nextProgress, completed: isCompleted };
      }
      return m;
    }));
  };

  const claimMissionReward = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (mission && mission.completed && !mission.claimed) {
      soundFx.playLevelUp();
      addXp(mission.rewardXp, `Completed Mission: ${mission.title}`);
      setMissions(prev => prev.map(m => m.id === missionId ? { ...m, claimed: true } : m));
    }
  };

  const toggleSound = () => {
    soundFx.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) soundFx.playClick();
  };

  const toggleParticles = () => {
    soundFx.playClick();
    setParticlesEnabled(prev => !prev);
  };

  const toggleCrt = () => {
    soundFx.playClick();
    setCrtEnabled(prev => !prev);
  };

  return (
    <GamificationContext.Provider value={{
      xp, level, rankTitle, nextLevelXp, currentRankInfo, streakDays, cyberCredits,
      missions, achievements, soundEnabled, particlesEnabled, crtEnabled,
      addXp, claimMissionReward, updateMissionProgress, toggleSound, toggleParticles, toggleCrt,
      triggerLevelUpAnimation, recentXpEvent
    }}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) throw new Error('useGamification must be used within GamificationProvider');
  return context;
};
