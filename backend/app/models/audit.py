import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Text, JSON, Float
from app.database import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_email = Column(String(255), nullable=False)
    action = Column(String(100), nullable=False)
    resource = Column(String(255), nullable=False)
    status = Column(String(50), default="SUCCESS")
    ip_address = Column(String(45))
    details = Column(JSON, default=dict)
    timestamp = Column(DateTime, default=datetime.utcnow)

class SystemHealth(Base):
    __tablename__ = "system_health"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    component = Column(String(100), nullable=False) # API, Database, AI Engine, WebSocket, Threat Engine
    status = Column(String(50), nullable=False) # Operational, Degraded, Down
    latency_ms = Column(Float, default=12.5)
    uptime_percentage = Column(Float, default=99.98)
    last_checked = Column(DateTime, default=datetime.utcnow)
