export type Role = 'USER' | 'SECURITY_ANALYST' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  security_score: number;
}

export interface Threat {
  id: string;
  threat_code: string;
  category: string;
  title: string;
  source: string;
  risk_score: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'DETECTED' | 'CONTAINED' | 'BLOCKED' | 'INVESTIGATING';
  ai_explanation: string;
  detected_at: string;
}

export interface Incident {
  id: string;
  incident_code: string;
  title: string;
  threat_type: string;
  risk_score: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'INVESTIGATING' | 'CONTAINED' | 'CLOSED';
  assigned_analyst: string;
  summary: string;
  evidence?: string[];
  ai_recommendation?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  txn_code: string;
  amount: number;
  payee_name: string;
  payment_method: string;
  status: 'ANALYZED' | 'BLOCKED' | 'FLAGGED' | 'PASSED';
  risk_score: number;
  severity: 'SAFE' | 'WARNING' | 'HIGH' | 'CRITICAL';
  location: string;
  is_anomaly: boolean;
  ai_verdict: string;
  created_at: string;
}

export interface URLScanResult {
  url: string;
  domain: string;
  risk_score: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  is_phishing: number;
  confidence: number;
  impersonating_brand?: string;
  detected_factors: Array<{ factor: string; detail: string; severity: string }>;
  ai_summary: string;
}

export interface MessageScanResult {
  raw_message: string;
  risk_score: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  detected_intent: string;
  suspicious_phrases: Array<{ phrase: string; reason: string; risk_boost: number }>;
  explanation: string;
}

export interface CopilotCard {
  title: string;
  risk_score: number;
  severity: 'SAFE' | 'WARNING' | 'HIGH' | 'CRITICAL';
  threat: string;
  evidence: string[];
  recommendation: string[];
}

export interface CopilotResponse {
  text: string;
  card?: CopilotCard;
  conversation_id: string;
}
