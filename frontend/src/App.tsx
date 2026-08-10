import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { WebSocketProvider } from './context/WebSocketContext';

import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { MobileNav } from './components/layout/MobileNav';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';

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
import { IncidentDetailPage } from './pages/IncidentDetailPage';
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

const LayoutContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isLandingPage = location.pathname === '/';
  const isLoginPage = location.pathname === '/login';

  if (isLandingPage || isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#080B11] text-[#F8FAFC] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onOpenSearch={() => setIsSearchOpen(true)} />
        <main className="flex-1 overflow-y-auto pb-20 md:pb-8">
          {children}
        </main>
        <MobileNav />
      </div>
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <WebSocketProvider>
          <BrowserRouter>
            <LayoutContainer>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<ConsumerDashboard />} />
                <Route path="/upi-guard" element={<UPIProtectionPage />} />
                <Route path="/deepfake-detector" element={<DeepfakeDetectorPage />} />
                <Route path="/apk-scanner" element={<ApkScannerPage />} />
                <Route path="/sim-guard" element={<SimGuardPage />} />
                <Route path="/scanner/url" element={<URLScannerPage />} />
                <Route path="/scanner/message" element={<MessageScannerPage />} />
                <Route path="/scanner/qr" element={<QRScannerPage />} />
                <Route path="/transactions" element={<TransactionPage />} />
                <Route path="/identity" element={<IdentityPage />} />
                <Route path="/devices" element={<DeviceSecurityPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/copilot" element={<AICopilotPage />} />
                <Route path="/soc" element={<SOCDashboardPage />} />
                <Route path="/threat-intel" element={<DarkWebIntelPage />} />
                <Route path="/playbooks" element={<PlaybooksPage />} />
                <Route path="/enterprise-risk" element={<EnterpriseRiskPage />} />
                <Route path="/zero-trust" element={<ZeroTrustPage />} />
                <Route path="/fraud-sandbox" element={<FraudSandboxPage />} />
                <Route path="/autonomous-agent" element={<AutonomousAgentPage />} />
                <Route path="/incidents" element={<SOCDashboardPage />} />
                <Route path="/incidents/:id" element={<IncidentDetailPage />} />
                <Route path="/simulation" element={<SimulationPage />} />
                <Route path="/admin/health" element={<AdminHealthPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/security-report" element={<SecurityReportPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </LayoutContainer>
          </BrowserRouter>
        </WebSocketProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
