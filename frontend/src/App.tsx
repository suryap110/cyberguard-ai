import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { WebSocketProvider } from './context/WebSocketContext';
import { GamificationProvider } from './context/GamificationContext';

import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { CyberBackground } from './components/layout/CyberBackground';
import { BottomStatusDock } from './components/layout/BottomStatusDock';
import { CyberBootSequence } from './components/layout/CyberBootSequence';
import { JudgeDemoBar } from './components/judge/JudgeDemoBar';

import { LandingPage } from './pages/LandingPage';
import { ConsumerDashboard } from './pages/ConsumerDashboard';
import { URLScannerPage } from './pages/URLScannerPage';
import { MessageScannerPage } from './pages/MessageScannerPage';
import { QRScannerPage } from './pages/QRScannerPage';
import { TransactionPage } from './pages/TransactionPage';
import { IdentityPage } from './pages/IdentityPage';
import { DeviceSecurityPage } from './pages/DeviceSecurityPage';
import { AlertsPage } from './pages/AlertsPage';
import { AICopilotPage } from './pages/AICopilotPage';
import { SOCDashboardPage } from './pages/SOCDashboardPage';
import { IncidentResponsePage } from './pages/IncidentResponsePage';
import { IncidentDetailPage } from './pages/IncidentDetailPage';
import { AttackGraphView } from './components/security/AttackGraphView';
import { SimulationPage } from './pages/SimulationPage';
import { AdminHealthPage } from './pages/AdminHealthPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { SecurityReportPage } from './pages/SecurityReportPage';
import { DarkWebIntelPage } from './pages/DarkWebIntelPage';
import { PlaybooksPage } from './pages/PlaybooksPage';
import { EnterpriseRiskPage } from './pages/EnterpriseRiskPage';
import { ZeroTrustPage } from './pages/ZeroTrustPage';
import { FraudSandboxPage } from './pages/FraudSandboxPage';
import { AutonomousAgentPage } from './pages/AutonomousAgentPage';
import { UPIProtectionPage } from './pages/UPIProtectionPage';
import { DeepfakeDetectorPage } from './pages/DeepfakeDetectorPage';
import { ApkScannerPage } from './pages/ApkScannerPage';
import { SimGuardPage } from './pages/SimGuardPage';

const NetworkMonitoringWrapper: React.FC = () => (
  <div className="p-6 md:p-8 max-w-[1600px] mx-auto space-y-6">
    <div className="border-b border-slate-800/60 pb-4">
      <h1 className="text-2xl font-extrabold text-[#F8FAFC]">Network Topology & Monitoring</h1>
      <p className="text-xs text-[#94A3B8] mt-1">Interactive topology visualization, connection vectors, and attack path tracing</p>
    </div>
    <AttackGraphView />
  </div>
);

const LayoutContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isLandingPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

  if (isLandingPage || isLoginPage) {
    return (
      <>
        <CyberBackground />
        <JudgeDemoBar />
        <div className="relative z-10">{children}</div>
      </>
    );
  }

  return (
    <div className="flex h-screen bg-transparent text-[#F8FAFC] overflow-hidden relative font-sans">
      <CyberBackground />
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <JudgeDemoBar />
        <Header onOpenSearch={() => setIsSearchOpen(true)} />
        <main className="flex-1 overflow-y-auto cyber-entry-animate">
          {children}
        </main>
        <BottomStatusDock />
        <MobileNav />
      </div>
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  const [showBoot, setShowBoot] = useState(() => {
    return !sessionStorage.getItem('cyberguard_boot_seen');
  });

  const handleBootComplete = () => {
    sessionStorage.setItem('cyberguard_boot_seen', 'true');
    setShowBoot(false);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <WebSocketProvider>
          <GamificationProvider>
            {showBoot && <CyberBootSequence onComplete={handleBootComplete} />}
            <BrowserRouter>
              <LayoutContainer>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/dashboard" element={<ProtectedRoute><ConsumerDashboard /></ProtectedRoute>} />
                  <Route path="/upi-guard" element={<ProtectedRoute><UPIProtectionPage /></ProtectedRoute>} />
                  <Route path="/deepfake-detector" element={<ProtectedRoute><DeepfakeDetectorPage /></ProtectedRoute>} />
                  <Route path="/apk-scanner" element={<ProtectedRoute><ApkScannerPage /></ProtectedRoute>} />
                  <Route path="/sim-guard" element={<ProtectedRoute><SimGuardPage /></ProtectedRoute>} />
                  <Route path="/scanner/url" element={<ProtectedRoute><URLScannerPage /></ProtectedRoute>} />
                  <Route path="/scanner/message" element={<ProtectedRoute><MessageScannerPage /></ProtectedRoute>} />
                  <Route path="/scanner/qr" element={<ProtectedRoute><QRScannerPage /></ProtectedRoute>} />
                  <Route path="/transactions" element={<ProtectedRoute><TransactionPage /></ProtectedRoute>} />
                  <Route path="/identity" element={<ProtectedRoute><IdentityPage /></ProtectedRoute>} />
                  <Route path="/devices" element={<ProtectedRoute><DeviceSecurityPage /></ProtectedRoute>} />
                  <Route path="/alerts" element={<ProtectedRoute><AlertsPage /></ProtectedRoute>} />
                  <Route path="/copilot" element={<ProtectedRoute><AICopilotPage /></ProtectedRoute>} />
                  <Route path="/soc" element={<ProtectedRoute><SOCDashboardPage /></ProtectedRoute>} />
                  <Route path="/threat-intel" element={<ProtectedRoute><DarkWebIntelPage /></ProtectedRoute>} />
                  <Route path="/playbooks" element={<ProtectedRoute><PlaybooksPage /></ProtectedRoute>} />
                  <Route path="/enterprise-risk" element={<ProtectedRoute><EnterpriseRiskPage /></ProtectedRoute>} />
                  <Route path="/zero-trust" element={<ProtectedRoute><ZeroTrustPage /></ProtectedRoute>} />
                  <Route path="/fraud-sandbox" element={<ProtectedRoute><FraudSandboxPage /></ProtectedRoute>} />
                  <Route path="/autonomous-agent" element={<ProtectedRoute><AutonomousAgentPage /></ProtectedRoute>} />
                  <Route path="/network" element={<ProtectedRoute><NetworkMonitoringWrapper /></ProtectedRoute>} />
                  <Route path="/incidents" element={<ProtectedRoute><IncidentResponsePage /></ProtectedRoute>} />
                  <Route path="/incidents/:id" element={<ProtectedRoute><IncidentDetailPage /></ProtectedRoute>} />
                  <Route path="/simulation" element={<ProtectedRoute><SimulationPage /></ProtectedRoute>} />
                  <Route path="/admin/health" element={<ProtectedRoute><AdminHealthPage /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                  <Route path="/reports" element={<ProtectedRoute><SecurityReportPage /></ProtectedRoute>} />
                  <Route path="/security-report" element={<ProtectedRoute><SecurityReportPage /></ProtectedRoute>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </LayoutContainer>
            </BrowserRouter>
          </GamificationProvider>
        </WebSocketProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
