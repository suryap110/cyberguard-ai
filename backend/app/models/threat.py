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
