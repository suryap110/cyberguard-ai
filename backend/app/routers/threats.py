from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.threat import ThreatEvent

router = APIRouter(prefix="/threats", tags=["Threats"])

@router.get("")
def list_threats(
    severity: str = Query(None), 
    category: str = Query(None), 
    db: Session = Depends(get_db)
):
    query = db.query(ThreatEvent)
    if severity:
        query = query.filter(ThreatEvent.severity == severity.upper())
    if category:
        query = query.filter(ThreatEvent.category == category)
    
    threats = query.order_by(ThreatEvent.detected_at.desc()).all()
    
    if not threats:
        # Fallback synthetic threats for demonstration
        return [
            {
                "id": "t1",
                "threat_code": "TRT-1023",
                "category": "Account Takeover",
                "title": "Abnormal Midnight Login & Password Change",
                "source": "IP 198.51.100.42",
                "risk_score": 97,
                "severity": "CRITICAL",
                "status": "INVESTIGATING",
                "ai_explanation": "17 consecutive failed login attempts followed by credential reset from untrusted geographic region.",
                "detected_at": "2 mins ago"
            },
            {
                "id": "t2",
                "threat_code": "TRT-1024",
                "category": "Phishing",
                "title": "Credential Harvest Domain Impersonation",
                "source": "https://secure-bank-login-update.com",
                "risk_score": 91,
                "severity": "CRITICAL",
                "status": "BLOCKED",
                "ai_explanation": "Brand impersonation targeting major financial institution. SSL certificate issued 3 days ago.",
                "detected_at": "8 mins ago"
            },
            {
                "id": "t3",
                "threat_code": "TRT-1025",
                "category": "Payment Fraud",
                "title": "High-Value Transaction Anomaly",
                "source": "TXN-8291",
                "risk_score": 94,
                "severity": "CRITICAL",
                "status": "BLOCKED",
                "ai_explanation": "Amount (₹85,000) exceeds normal profile baseline by 2,000%. Destination account flagged.",
                "detected_at": "15 mins ago"
            }
        ]
    return threats
