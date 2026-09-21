import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Role } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loginAsPreset: (role: Role) => void;
  loginCustom: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signupCustom: (fullName: string, email: string, password?: string, role?: Role) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  getRegisteredUsers: () => any[];
}

const DEFAULT_USERS: (User & { password?: string })[] = [
  { id: 'demo-analyst-id', email: 'analyst@cyberguard.demo', password: 'password123', full_name: 'SOC Lead Analyst', role: 'SECURITY_ANALYST', security_score: 98 },
  { id: 'demo-admin-id', email: 'admin@cyberguard.demo', password: 'password123', full_name: 'System Admin', role: 'ADMIN', security_score: 99 },
  { id: 'demo-user-id', email: 'user@cyberguard.demo', password: 'password123', full_name: 'Surya (Consumer)', role: 'USER', security_score: 92 },
  { id: 'surya-lead-id', email: 'surya@cyberguard.ai', password: 'password123', full_name: 'Surya Cyber Lead', role: 'SECURITY_ANALYST', security_score: 98 }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Database of Registered Users in LocalStorage
  const [registeredUsers, setRegisteredUsers] = useState<any[]>(() => {
    const saved = localStorage.getItem('cyberguard_registered_users');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    localStorage.setItem('cyberguard_registered_users', JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  });

  const [user, setUser] = useState<User | null>(() => {
    const isLoggedOut = localStorage.getItem('cyberguard_logged_out') === 'true';
    if (isLoggedOut) return null;

    const saved = localStorage.getItem('cyberguard_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { localStorage.removeItem('cyberguard_user'); }
    }
    // Default demo user on fresh application load
    localStorage.setItem('cyberguard_user', JSON.stringify(DEFAULT_USERS[0]));
    localStorage.setItem('cyberguard_token', 'demo_jwt_token_analyst');
    return DEFAULT_USERS[0];
  });

  const [token, setToken] = useState<string | null>(() => {
    const isLoggedOut = localStorage.getItem('cyberguard_logged_out') === 'true';
    if (isLoggedOut) return null;

    return localStorage.getItem('cyberguard_token') || 'demo_jwt_token_analyst';
  });

  const getRegisteredUsers = () => registeredUsers;

  const loginAsPreset = (role: Role) => {
    let presetUser: User;
    if (role === 'ADMIN') {
      presetUser = DEFAULT_USERS[1];
    } else if (role === 'SECURITY_ANALYST') {
      presetUser = DEFAULT_USERS[0];
    } else {
      presetUser = DEFAULT_USERS[2];
    }

    const demoToken = `demo_jwt_token_${role.toLowerCase()}`;
    localStorage.removeItem('cyberguard_logged_out');
    setUser(presetUser);
    setToken(demoToken);
    localStorage.setItem('cyberguard_user', JSON.stringify(presetUser));
    localStorage.setItem('cyberguard_token', demoToken);
  };

  const loginCustom = async (email: string, password: string = 'password123'): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try FastAPI Backend Endpoint
    try {
      const response = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: password })
      });

      if (response.ok) {
        const data = await response.json();
        const customUser: User = {
          id: data.user?.id || `user-${Date.now()}`,
          email: data.user?.email || cleanEmail,
          full_name: data.user?.full_name || cleanEmail.split('@')[0],
          role: data.user?.role || 'SECURITY_ANALYST',
          security_score: data.user?.security_score || 96
        };
        localStorage.removeItem('cyberguard_logged_out');
        setUser(customUser);
        setToken(data.access_token);
        localStorage.setItem('cyberguard_user', JSON.stringify(customUser));
        localStorage.setItem('cyberguard_token', data.access_token);
        return { success: true };
      } else if (response.status === 401) {
        const errData = await response.json().catch(() => ({}));
        return { success: false, error: errData.detail || "Invalid email or password." };
      }
    } catch (e) {
      console.warn("Backend auth offline, checking registered accounts database");
    }

    // 2. Client-Side Registered Accounts Database Verification
    const currentUsers = JSON.parse(localStorage.getItem('cyberguard_registered_users') || JSON.stringify(registeredUsers));
    const found = currentUsers.find((u: any) => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      return { 
        success: false, 
        error: `Account not found! '${cleanEmail}' is not signed up yet. Please Sign Up first!` 
      };
    }

    // Password validation supporting demo variations
    const isPasswordValid = 
      !found.password || 
      found.password === password || 
      found.password.toLowerCase() === password.toLowerCase() ||
      (password === 'Password123!' && found.password === 'password123') ||
      (password === 'password123' && found.password === 'Password123!');

    if (!isPasswordValid) {
      return { 
        success: false, 
        error: `Incorrect password for account '${cleanEmail}'. Please try again!` 
      };
    }

    const authenticatedUser: User = {
      id: found.id || `user-${Date.now()}`,
      email: found.email,
      full_name: found.full_name || cleanEmail.split('@')[0],
      role: found.role || 'USER',
      security_score: found.security_score || 95
    };

    const demoToken = `jwt_token_${Date.now()}`;
    localStorage.removeItem('cyberguard_logged_out');
    setUser(authenticatedUser);
    setToken(demoToken);
    localStorage.setItem('cyberguard_user', JSON.stringify(authenticatedUser));
    localStorage.setItem('cyberguard_token', demoToken);
    return { success: true };
  };

  const signupCustom = async (fullName: string, email: string, password: string = 'password123', role: Role = 'USER'): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();

    // Check if ALREADY registered in local database
    const currentUsers = JSON.parse(localStorage.getItem('cyberguard_registered_users') || JSON.stringify(registeredUsers));
    const existing = currentUsers.find((u: any) => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      return { 
        success: false, 
        error: `Account already exists! '${cleanEmail}' is already registered. Please Sign In.` 
      };
    }

    // Register with FastAPI backend
    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email: cleanEmail, password: password, role: role })
      });
      if (response.ok) {
        const newUserObj = {
          id: `user-${Date.now()}`,
          email: cleanEmail,
          password: password,
          full_name: fullName,
          role: role,
          security_score: 95
        };
        const updatedUsers = [...currentUsers, newUserObj];
        setRegisteredUsers(updatedUsers);
        localStorage.setItem('cyberguard_registered_users', JSON.stringify(updatedUsers));
        return await loginCustom(cleanEmail, password);
      }
    } catch (e) {
      console.warn("Backend register offline, using local database register");
    }

    // Register locally
    const newUserObj = {
      id: `user-${Date.now()}`,
      email: cleanEmail,
      password: password,
      full_name: fullName,
      role: role,
      security_score: 95
    };
    const updatedUsers = [...currentUsers, newUserObj];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('cyberguard_registered_users', JSON.stringify(updatedUsers));

    const newUser: User = {
      id: newUserObj.id,
      email: cleanEmail,
      full_name: fullName,
      role: role,
      security_score: 95
    };

    const demoToken = `jwt_token_signup_${Date.now()}`;
    localStorage.removeItem('cyberguard_logged_out');
    setUser(newUser);
    setToken(demoToken);
    localStorage.setItem('cyberguard_user', JSON.stringify(newUser));
    localStorage.setItem('cyberguard_token', demoToken);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('cyberguard_user');
    localStorage.removeItem('cyberguard_token');
    localStorage.setItem('cyberguard_logged_out', 'true');
  };

  return (
    <AuthContext.Provider value={{ user, token, loginAsPreset, loginCustom, signupCustom, logout, isAuthenticated: !!user, getRegisteredUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
