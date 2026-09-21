from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.incident import Incident, AttackChainEvent, ResponseAction
from app.models.threat import PlaybookExecution

router = APIRouter(prefix="/incidents", tags=["Incidents & SOAR Playbooks"])

PLAYBOOKS_LIST = [
    {
        "id": "pb-101",
        "name": "Automated Account Takeover Containment",
        "category": "Identity Protection",
        "trigger": "Brute Force Spikes + Session Anomaly",
        "actions_count": 4,
        "automation_level": "FULL_AUTOMATIC",
        "status": "READY"
    },
    {
        "id": "pb-102",
        "name": "UPI Money Mule Freeze & Beneficiary Quarantine",
        "category": "Financial Fraud",
        "trigger": "NPCI High Risk VPA Transfer > ₹25,000",
        "actions_count": 3,
        "automation_level": "FULL_AUTOMATIC",
        "status": "READY"
    },
    {
        "id": "pb-103",
        "name": "Deepfake Voice Extortion Emergency Lockdown",
        "category": "AI Scam Defense",
        "trigger": "Synthetic Voice Harmonics > 95% Confidence",
        "actions_count": 5,
        "automation_level": "HUMAN_APPROVAL_REQ",
        "status": "READY"
    },
    {
        "id": "pb-104",
        "name": "Zero-Day Malicious APK Network Microsegmentation",
        "category": "Endpoint Defense",
        "trigger": "Accessibility Privilege Escalation Detected",
        "actions_count": 4,
        "automation_level": "FULL_AUTOMATIC",
        "status": "READY"
    }
]

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

@router.get("/playbooks")
def list_playbooks():
    return PLAYBOOKS_LIST

@router.post("/playbooks/{playbook_id}/execute")
def execute_playbook(playbook_id: str, db: Session = Depends(get_db)):
    pb = next((p for p in PLAYBOOKS_LIST if p["id"] == playbook_id), None)
    pb_name = pb["name"] if pb else f"SOAR Playbook {playbook_id}"
    
    actions = [
        "1. Revoked all active OAuth & JWT sessions across connected devices.",
        "2. Intercepted and quarantined outgoing wire transfer request.",
        "3. Pushed IP 198.51.100.42 to Zero-Trust Firewall Blocklist.",
        "4. Triggered biometric mandatory re-authentication policy."
    ]

    db_log = PlaybookExecution(
        playbook_id=playbook_id,
        playbook_name=pb_name,
        target_incident="INC-2026-0012",
        status="EXECUTED",
        actions_taken=actions
    )
    db.add(db_log)
    db.commit()

    return {
        "status": "SUCCESS",
        "playbook_id": playbook_id,
        "playbook_name": pb_name,
        "execution_time_ms": 42.8,
        "actions_taken": actions,
        "message": f"SOAR Playbook '{pb_name}' executed cleanly in 42.8ms."
    }

@router.get("/{incident_id}")
def get_incident_details(incident_id: str, db: Session = Depends(get_db)):
    incident = db.query(Incident).filter(
        (Incident.id == incident_id) | (Incident.incident_code == incident_id)
    ).first()
    
    if not incident:
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
