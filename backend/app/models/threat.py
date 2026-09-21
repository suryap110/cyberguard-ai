import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, Text, JSON, ForeignKey
from app.database import Base

class ThreatEvent(Base):
    __tablename__ = "threat_events"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    threat_code = Column(String(50), unique=True, index=True, nullable=False) # e.g. TRT-1023
    category = Column(String(100), nullable=False) # Phishing, Scam, Transaction Fraud, Account Takeover
    title = Column(String(255), nullable=False)
    source = Column(String(255)) # URL, SMS, IP, User ID
    risk_score = Column(Integer, nullable=False) # 0 - 100
    severity = Column(String(50), nullable=False) # LOW, MEDIUM, HIGH, CRITICAL
    status = Column(String(50), default="DETECTED") # DETECTED, CONTAINED, BLOCKED, INVESTIGATING
    ai_explanation = Column(Text)
    evidence_data = Column(JSON, default=dict)
    detected_at = Column(DateTime, default=datetime.utcnow)

class URLScan(Base):
    __tablename__ = "url_scans"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    url = Column(String(1000), nullable=False)
    domain = Column(String(255), nullable=False)
    risk_score = Column(Integer, nullable=False)
    severity = Column(String(50), nullable=False)
    is_phishing = Column(Integer, default=0) # 0 or 1
    confidence = Column(Float, default=0.95)
    domain_age_days = Column(Integer, default=5)
    impersonating_brand = Column(String(100), nullable=True)
    detected_factors = Column(JSON, default=list)
    ai_summary = Column(Text)
    scanned_at = Column(DateTime, default=datetime.utcnow)

class MessageScan(Base):
    __tablename__ = "message_scans"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    raw_message = Column(Text, nullable=False)
    risk_score = Column(Integer, nullable=False)
    severity = Column(String(50), nullable=False)
    detected_intent = Column(String(100)) # Bank Scams, OTP Harvesting, Urgency Scam
    suspicious_phrases = Column(JSON, default=list) # Array of highlighted text
    explanation = Column(Text)
    scanned_at = Column(DateTime, default=datetime.utcnow)

class QRScan(Base):
    __tablename__ = "qr_scans"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    payload = Column(Text, nullable=False)
    type = Column(String(50), default="URL") # URL, UPI_PAYMENT, VPA
    risk_score = Column(Integer, nullable=False)
    severity = Column(String(50), nullable=False)
    analysis = Column(Text)
    scanned_at = Column(DateTime, default=datetime.utcnow)

class DeepfakeScan(Base):
    __tablename__ = "deepfake_scans"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    filename = Column(String(255), nullable=False)
    scan_type = Column(String(50), default="VOICE") # VOICE, DOCUMENT
    risk_score = Column(Integer, nullable=False)
    confidence = Column(Float, default=0.98)
    verdict = Column(String(100), nullable=False) # DEEPFAKE_SYNTHETIC, GENUINE
    synthetic_harmonics = Column(JSON, default=list)
    spectral_summary = Column(Text)
    scanned_at = Column(DateTime, default=datetime.utcnow)

class APKScan(Base):
    __tablename__ = "apk_scans"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    filename = Column(String(255), nullable=False)
    package_name = Column(String(255), nullable=False)
    risk_score = Column(Integer, nullable=False)
    severity = Column(String(50), nullable=False) # SAFE, HIGH, CRITICAL
    dangerous_permissions = Column(JSON, default=list)
    malware_family = Column(String(100))
    summary = Column(Text)
    scanned_at = Column(DateTime, default=datetime.utcnow)

class SimGuardScan(Base):
    __tablename__ = "sim_guard_scans"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    phone_number = Column(String(50), nullable=False)
    sim_status = Column(String(50), default="ACTIVE") # ACTIVE, SWAP_ALERT, SUSPICIOUS
    imsi_changed = Column(Integer, default=0) # 0 or 1
    sim_age_days = Column(Integer, default=450)
    risk_score = Column(Integer, nullable=False)
    carrier = Column(String(100))
    alert_summary = Column(Text)
    scanned_at = Column(DateTime, default=datetime.utcnow)

class DarkWebIntel(Base):
    __tablename__ = "dark_web_intel"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    target_query = Column(String(255), nullable=False)
    breach_count = Column(Integer, default=0)
    passwords_leaked = Column(Integer, default=0)
    highest_severity = Column(String(50), default="MEDIUM")
    matched_databases = Column(JSON, default=list)
    summary = Column(Text)
    searched_at = Column(DateTime, default=datetime.utcnow)

class SandboxScan(Base):
    __tablename__ = "sandbox_scans"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    transaction_amount = Column(Float, nullable=False)
    payee = Column(String(255), nullable=False)
    location = Column(String(255))
    risk_score = Column(Integer, nullable=False)
    is_anomaly = Column(Integer, default=0)
    anomaly_reasons = Column(JSON, default=list)
    ai_verdict = Column(Text)
    scanned_at = Column(DateTime, default=datetime.utcnow)

class ZeroTrustPolicy(Base):
    __tablename__ = "zero_trust_policies"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    policy_code = Column(String(50), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    enforcement_level = Column(String(50), default="HIGH") # STRICT, BALANCED, MONITOR
    is_active = Column(Integer, default=1)
    description = Column(Text)
    updated_at = Column(DateTime, default=datetime.utcnow)

class PlaybookExecution(Base):
    __tablename__ = "playbook_executions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    playbook_id = Column(String(50), nullable=False)
    playbook_name = Column(String(255), nullable=False)
    target_incident = Column(String(100))
    status = Column(String(50), default="EXECUTED") # EXECUTED, IN_PROGRESS, FAILED
    actions_taken = Column(JSON, default=list)
    executed_at = Column(DateTime, default=datetime.utcnow)

