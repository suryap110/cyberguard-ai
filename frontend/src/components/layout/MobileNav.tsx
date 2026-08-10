import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Link2, Bell, Bot, UserCheck, Terminal } from 'lucide-react';

export const MobileNav: React.FC = () => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0F1420]/95 backdrop-blur-lg border-t border-[#232D42] flex items-center justify-around z-40 px-2">
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
            isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`
        }
      >
        <LayoutDashboard className="w-5 h-5" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/scanner/url"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
            isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`
        }
      >
        <div className="p-2 -mt-6 rounded-full bg-gradient-to-tr from-sky-500 to-cyan-400 text-white shadow-cyber-glow border-4 border-[#080B11]">
          <Link2 className="w-5 h-5" />
        </div>
        <span className="mt-1">Scan</span>
      </NavLink>

      <NavLink
        to="/alerts"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
            isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`
        }
      >
        <Bell className="w-5 h-5" />
        <span>Alerts</span>
      </NavLink>

      <NavLink
        to="/copilot"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
            isActive ? 'text-cyan-400 font-bold' : 'text-slate-400'
          }`
        }
      >
        <Bot className="w-5 h-5" />
        <span>Copilot</span>
      </NavLink>

      <NavLink
        to="/soc"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 text-[11px] font-medium transition-all ${
            isActive ? 'text-amber-400 font-bold' : 'text-slate-400'
          }`
        }
      >
        <Terminal className="w-5 h-5" />
        <span>SOC</span>
      </NavLink>
    </nav>
  );
};
