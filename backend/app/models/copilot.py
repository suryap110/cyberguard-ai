import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, Text, JSON, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class CopilotConversation(Base):
    __tablename__ = "copilot_conversations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    title = Column(String(255), default="Security Investigation")
    created_at = Column(DateTime, default=datetime.utcnow)

    messages = relationship("CopilotMessage", back_populates="conversation", cascade="all, delete-orphan")

class CopilotMessage(Base):
    __tablename__ = "copilot_messages"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    conversation_id = Column(String(36), ForeignKey("copilot_conversations.id"), nullable=False)
    sender = Column(String(50), nullable=False) # USER, AI
    content = Column(Text, nullable=False)
    structured_card = Column(JSON, nullable=True) # Rich response card with evidence, recommendations
    created_at = Column(DateTime, default=datetime.utcnow)

    conversation = relationship("CopilotConversation", back_populates="messages")
