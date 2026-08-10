from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User, Device, UserSession
from app.security.dependencies import get_current_user

router = APIRouter(prefix="/identity", tags=["Identity & Devices"])

@router.get("/devices")
def list_devices(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    devices = db.query(Device).filter(Device.user_id == user.id).all()
    if not devices:
        return [
            {"id": "d1", "device_name": "MacBook Pro 16\"", "device_type": "Desktop", "operating_system": "macOS Sonoma", "ip_address": "103.28.45.12", "location": "Chennai, IN", "is_trusted": True, "last_active": "2 mins ago"},
            {"id": "d2", "device_name": "Samsung Galaxy S24 Ultra", "device_type": "Mobile", "operating_system": "Android 15", "ip_address": "103.28.45.14", "location": "Chennai, IN", "is_trusted": True, "last_active": "5 mins ago"},
            {"id": "d3", "device_name": "Linux Unknown Proxy", "device_type": "Desktop", "operating_system": "Ubuntu 22.04", "ip_address": "198.51.100.42", "location": "Unknown Location", "is_trusted": False, "last_active": "Just now"}
        ]
    return devices

@router.get("/sessions")
def list_sessions(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return [
        {"id": "s1", "ip_address": "103.28.45.12", "location": "Chennai, IN", "user_agent": "Chrome 122.0 / macOS", "is_active": True, "risk_level": "LOW", "login_time": "2 hours ago"},
        {"id": "s2", "ip_address": "198.51.100.42", "location": "Unknown Proxy", "user_agent": "Python-urllib/3.10", "is_active": True, "risk_level": "CRITICAL", "login_time": "3 mins ago"}
    ]

@router.post("/sessions/{session_id}/revoke")
def revoke_session(session_id: str):
    return {"message": f"Session {session_id} revoked successfully.", "status": "REVOKED"}
