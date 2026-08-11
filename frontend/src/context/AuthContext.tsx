import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginAsPreset: (role: Role) => void;
  loginCustom: (email: string, password?: string) => Promise<boolean>;
  signupCustom: (fullName: string, email: string, password?: string, role?: Role) => Promise<boolean>;
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

  const loginCustom = async (email: string, password?: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ username: email, password: password || 'password123' })
      });
      if (response.ok) {
        const data = await response.json();
        const customUser: User = {
          id: data.user?.id || `user-${Date.now()}`,
          email: email,
          full_name: data.user?.full_name || email.split('@')[0],
          role: data.user?.role || 'SECURITY_ANALYST',
          security_score: 96
        };
        setUser(customUser);
        setToken(data.access_token);
        localStorage.setItem('cyberguard_user', JSON.stringify(customUser));
        localStorage.setItem('cyberguard_token', data.access_token);
        return true;
      }
    } catch (e) {
      console.warn("Backend auth offline, using local sign in fallback");
    }

    // Local authentication fallback
    const role: Role = email.includes('admin') ? 'ADMIN' : email.includes('analyst') ? 'SECURITY_ANALYST' : 'USER';
    const fallbackUser: User = {
      id: `user-${Date.now()}`,
      email: email,
      full_name: email.split('@')[0],
      role: role,
      security_score: 95
    };
    const demoToken = `jwt_token_${Date.now()}`;
    setUser(fallbackUser);
    setToken(demoToken);
    localStorage.setItem('cyberguard_user', JSON.stringify(fallbackUser));
    localStorage.setItem('cyberguard_token', demoToken);
    return true;
  };

  const signupCustom = async (fullName: string, email: string, password?: string, role: Role = 'USER'): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password: password || 'password123', role })
      });
      if (response.ok) {
        return await loginCustom(email, password);
      }
    } catch (e) {
      console.warn("Backend register offline, using local registration fallback");
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: email,
      full_name: fullName,
      role: role,
      security_score: 95
    };
    const demoToken = `jwt_token_signup_${Date.now()}`;
    setUser(newUser);
    setToken(demoToken);
    localStorage.setItem('cyberguard_user', JSON.stringify(newUser));
    localStorage.setItem('cyberguard_token', demoToken);
    return true;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('cyberguard_user');
    localStorage.removeItem('cyberguard_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAsPreset, loginCustom, signupCustom, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
