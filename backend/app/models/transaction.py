import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, Text, JSON, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    txn_code = Column(String(50), unique=True, index=True, nullable=False) # e.g. TXN-8291
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    amount = Column(Float, nullable=False)
    currency = Column(String(10), default="INR")
    payee_name = Column(String(255), nullable=False)
    payment_method = Column(String(50), nullable=False) # UPI, BANK_TRANSFER, CREDIT_CARD
    status = Column(String(50), default="ANALYZED") # ANALYZED, BLOCKED, FLAGGED, PASSED
    risk_score = Column(Integer, nullable=False) # 0 - 100
    severity = Column(String(50), nullable=False) # SAFE, WARNING, HIGH, CRITICAL
    location = Column(String(255))
    is_anomaly = Column(Boolean, default=False)
    risk_factors = Column(JSON, default=dict)
    ai_verdict = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="transactions")

class BehavioralProfile(Base):
    __tablename__ = "behavioral_profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), unique=True, nullable=False)
    avg_transaction_amount = Column(Float, default=4200.0)
    usual_login_hours = Column(JSON, default=list) # e.g. [9, 10, 11, 14, 15, 16, 17, 18, 19, 20]
    frequent_locations = Column(JSON, default=list) # e.g. ["Chennai, IN", "Bengaluru, IN"]
    failed_logins_24h = Column(Integer, default=0)
    last_login_deviation = Column(Boolean, default=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
