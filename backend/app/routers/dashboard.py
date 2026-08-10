from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, Device, UserSession
from app.models.threat import ThreatEvent
from app.models.transaction import Transaction
from app.models.incident import Incident
from app.security.dependencies import get_current_user

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/user-stats")
def get_user_dashboard(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    trusted_devices = db.query(Device).filter(Device.user_id == user.id, Device.is_trusted == True).count()
    active_sessions = db.query(UserSession).filter(UserSession.user_id == user.id, UserSession.is_active == True).count()
    recent_txns = db.query(Transaction).filter(Transaction.user_id == user.id).count()
    
    return {
        "user_name": user.full_name,
        "security_score": user.security_score,
        "status": "SECURE" if user.security_score >= 80 else ("WARNING" if user.security_score >= 60 else "CRITICAL"),
        "breakdown": {
            "account_security": 95,
            "device_security": 88,
            "transaction_safety": 94,
            "threat_exposure": 91,
            "behavioral_security": 90
        },
        "metrics": {
            "trusted_devices": trusted_devices or 3,
            "active_sessions": active_sessions or 2,
            "analyzed_transactions": recent_txns or 12,
            "critical_threats": 0
        }
    }

@router.get("/soc-stats")
def get_soc_dashboard(db: Session = Depends(get_db)):
    total_threats = db.query(ThreatEvent).count()
    critical_threats = db.query(ThreatEvent).filter(ThreatEvent.severity == "CRITICAL").count()
    active_incidents = db.query(Incident).filter(Incident.status == "INVESTIGATING").count()
    blocked_threats = db.query(ThreatEvent).filter(ThreatEvent.status == "BLOCKED").count()

    return {
        "system_status": "OPERATIONAL",
        "total_threats": total_threats or 328,
        "critical_threats": critical_threats or 17,
        "active_incidents": active_incidents or 12,
        "blocked_attacks": blocked_threats or 84,
        "threat_trend": [
            {"time": "00:00", "threats": 12, "risk": 22},
            {"time": "04:00", "threats": 45, "risk": 88},
            {"time": "08:00", "threats": 28, "risk": 45},
            {"time": "12:00", "threats": 65, "risk": 91},
            {"time": "16:00", "threats": 38, "risk": 52},
            {"time": "20:00", "threats": 52, "risk": 74}
        ],
        "threat_distribution": [
            {"category": "Phishing URLs", "value": 42},
            {"category": "Scam Messages", "value": 28},
            {"category": "Payment Fraud", "value": 18},
            {"category": "Account Takeover", "value": 12}
        ]
    }
