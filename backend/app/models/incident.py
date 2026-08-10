import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Incident(Base):
    __tablename__ = "incidents"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    incident_code = Column(String(50), unique=True, index=True, nullable=False) # INC-2026-0012
    title = Column(String(255), nullable=False)
    threat_type = Column(String(100), nullable=False) # Account Takeover, Phishing Campaign, Multi-Stage Fraud
    risk_score = Column(Integer, nullable=False)
    severity = Column(String(50), nullable=False) # LOW, MEDIUM, HIGH, CRITICAL
    status = Column(String(50), default="INVESTIGATING") # INVESTIGATING, CONTAINED, CLOSED
    assigned_analyst = Column(String(255), default="Analyst-01")
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    summary = Column(Text)
    evidence = Column(JSON, default=list)
    ai_recommendation = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="incidents")
    attack_chain = relationship("AttackChainEvent", back_populates="incident", cascade="all, delete-orphan")

class AttackChainEvent(Base):
    __tablename__ = "attack_chain_events"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    incident_id = Column(String(36), ForeignKey("incidents.id"), nullable=False)
    step_number = Column(Integer, nullable=False)
    event_type = Column(String(100), nullable=False) # PHISHING, CREDENTIAL_LEAK, UNKNOWN_LOGIN, FRAUD_TXN
    description = Column(String(255), nullable=False)
    risk_score = Column(Integer, default=50)
    timestamp = Column(DateTime, default=datetime.utcnow)

    incident = relationship("Incident", back_populates="attack_chain")

class ResponseAction(Base):
    __tablename__ = "response_actions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    incident_id = Column(String(36), ForeignKey("incidents.id"), nullable=False)
    action_type = Column(String(100), nullable=False) # BLOCK_TRANSACTION, REVOKE_SESSION, LOCK_ACCOUNT, FLAG_IP
    status = Column(String(50), default="EXECUTED") # EXECUTED, PENDING
    performed_by = Column(String(255), default="CYBERGUARD AI AUTOMATION")
    timestamp = Column(DateTime, default=datetime.utcnow)
