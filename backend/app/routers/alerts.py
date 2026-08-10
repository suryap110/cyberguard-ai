from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.alert import Alert

router = APIRouter(prefix="/alerts", tags=["Alerts"])

@router.get("")
def list_alerts(db: Session = Depends(get_db)):
    alerts = db.query(Alert).order_by(Alert.created_at.desc()).all()
    if not alerts:
        return [
            {
                "id": "a1",
                "title": "Account Takeover Detected",
                "message": "17 failed login attempts recorded followed by unusual device login from untrusted IP.",
                "severity": "CRITICAL",
                "category": "ACCOUNT_TAKEOVER",
                "is_read": False,
                "created_at": "2 mins ago"
            },
            {
                "id": "a2",
                "title": "Suspicious Transaction Intercepted",
                "message": "₹85,000 wire transfer attempt blocked due to high risk score (96/100).",
                "severity": "HIGH",
                "category": "PAYMENT_FRAUD",
                "is_read": False,
                "created_at": "12 mins ago"
            },
            {
                "id": "a3",
                "title": "Phishing URL Blocked",
                "message": "Domain impersonating primary bank institution detected and contained.",
                "severity": "MEDIUM",
                "category": "PHISHING",
                "is_read": True,
                "created_at": "1 hour ago"
            }
        ]
    return alerts

@router.post("/{alert_id}/read")
def mark_read(alert_id: str, db: Session = Depends(get_db)):
    alert = db.query(Alert).filter(Alert.id == alert_id).first()
    if alert:
        alert.is_read = True
        db.commit()
    return {"message": "Alert marked as read", "alert_id": alert_id}
