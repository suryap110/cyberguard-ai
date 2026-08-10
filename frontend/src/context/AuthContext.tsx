import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginAsPreset: (role: Role) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cyberguard_user');
    return saved ? JSON.parse(saved) : {
      id: 'demo-analyst-id',
      email: 'analyst@cyberguard.demo',
      full_name: 'SOC Lead Analyst',
      role: 'SECURITY_ANALYST',
      security_score: 98
    };
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('cyberguard_token') || 'demo_jwt_token_analyst';
  });

  const loginAsPreset = (role: Role) => {
    let presetUser: User;
    if (role === 'ADMIN') {
      presetUser = { id: 'demo-admin-id', email: 'admin@cyberguard.demo', full_name: 'System Admin', role: 'ADMIN', security_score: 99 };
    } else if (role === 'SECURITY_ANALYST') {
      presetUser = { id: 'demo-analyst-id', email: 'analyst@cyberguard.demo', full_name: 'SOC Lead Analyst', role: 'SECURITY_ANALYST', security_score: 98 };
    } else {
      presetUser = { id: 'demo-user-id', email: 'user@cyberguard.demo', full_name: 'Surya (Consumer)', role: 'USER', security_score: 92 };
    }

    const demoToken = `demo_jwt_token_${role.toLowerCase()}`;
    setUser(presetUser);
    setToken(demoToken);
    localStorage.setItem('cyberguard_user', JSON.stringify(presetUser));
    localStorage.setItem('cyberguard_token', demoToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('cyberguard_user');
    localStorage.removeItem('cyberguard_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAsPreset, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
