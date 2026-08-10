from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.incident import Incident, AttackChainEvent, ResponseAction

router = APIRouter(prefix="/incidents", tags=["Incidents"])

@router.get("")
def list_incidents(db: Session = Depends(get_db)):
    incidents = db.query(Incident).order_by(Incident.created_at.desc()).all()
    if not incidents:
        return [
            {
                "id": "inc-001",
                "incident_code": "INC-2026-0012",
                "title": "Coordinated Phishing & Account Takeover Sequence",
                "threat_type": "Account Takeover",
                "risk_score": 97,
                "severity": "CRITICAL",
                "status": "INVESTIGATING",
                "assigned_analyst": "Analyst-01",
                "summary": "Multi-stage attack vector starting with SMS phishing link, credential compromise, brute force login, and attempted high-value wire transfer.",
                "created_at": "3 minutes ago"
            }
        ]
    return incidents

@router.get("/{incident_id}")
def get_incident_details(incident_id: str, db: Session = Depends(get_db)):
    incident = db.query(Incident).filter(
        (Incident.id == incident_id) | (Incident.incident_code == incident_id)
    ).first()
    
    if not incident:
        # Fallback interactive mock structure for instant demo
        return {
            "id": "inc-001",
            "incident_code": "INC-2026-0012",
            "title": "Coordinated Phishing & Account Takeover Sequence",
            "threat_type": "Account Takeover",
            "risk_score": 97,
            "severity": "CRITICAL",
            "status": "INVESTIGATING",
            "assigned_analyst": "Analyst-01",
            "summary": "Multi-stage attack vector starting with SMS phishing link, credential compromise, brute force login, and attempted high-value wire transfer.",
            "evidence": [
                "Phishing SMS received with domain 'secure-bank-login-update.com'",
                "17 failed brute-force attempts from IP 198.51.100.42",
                "Session hijacked from untrusted browser fingerprint",
                "₹85,000 wire transfer requested to unverified beneficiary"
            ],
            "ai_recommendation": "1. Revoke active session\n2. Freeze outbound transactions\n3. Require in-person identity verification",
            "attack_graph": {
                "nodes": [
                    {"id": "1", "type": "phishing", "data": {"label": "Phishing SMS Received", "risk": 75, "time": "02:30 AM"}, "position": {"x": 50, "y": 150}},
                    {"id": "2", "type": "malicious_url", "data": {"label": "Malicious Domain Clicked", "risk": 91, "time": "02:31 AM"}, "position": {"x": 250, "y": 150}},
                    {"id": "3", "type": "credential_compromise", "data": {"label": "Credential Harvesting", "risk": 95, "time": "02:33 AM"}, "position": {"x": 450, "y": 150}},
                    {"id": "4", "type": "unknown_login", "data": {"label": "17 Failed Login Spikes", "risk": 96, "time": "02:35 AM"}, "position": {"x": 650, "y": 150}},
                    {"id": "5", "type": "account_takeover", "data": {"label": "Account Takeover Event", "risk": 97, "time": "02:37 AM"}, "position": {"x": 850, "y": 150}},
                    {"id": "6", "type": "fraud_txn", "data": {"label": "₹85,000 Wire Transfer", "risk": 98, "time": "02:38 AM"}, "position": {"x": 1050, "y": 150}}
                ],
                "edges": [
                    {"id": "e1-2", "source": "1", "target": "2", "animated": True},
                    {"id": "e2-3", "source": "2", "target": "3", "animated": True},
                    {"id": "e3-4", "source": "3", "target": "4", "animated": True},
                    {"id": "e4-5", "source": "4", "target": "5", "animated": True},
                    {"id": "e5-6", "source": "5", "target": "6", "animated": True}
                ]
            }
        }
        
    return incident
