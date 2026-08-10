from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter(prefix="/admin", tags=["Admin & System Health"])

@router.get("/system-health")
def get_system_health():
    return {
        "overall_status": "OPERATIONAL",
        "services": [
            {"name": "API Service", "status": "OPERATIONAL", "latency": "12ms", "uptime": "99.98%"},
            {"name": "PostgreSQL / Database", "status": "OPERATIONAL", "latency": "4ms", "uptime": "99.99%"},
            {"name": "AI Threat Engine", "status": "OPERATIONAL", "latency": "45ms", "uptime": "99.95%"},
            {"name": "WebSockets Real-Time Feed", "status": "OPERATIONAL", "latency": "8ms", "uptime": "100.00%"},
            {"name": "Redis Event Cache", "status": "OPERATIONAL", "latency": "2ms", "uptime": "99.99%"}
        ],
        "system_load": {
            "cpu_usage": "14%",
            "memory_usage": "38%",
            "active_connections": 124
        }
    }

@router.get("/audit-logs")
def list_audit_logs():
    return [
        {"id": "l1", "user_email": "analyst@cyberguard.demo", "action": "INCIDENT_STATUS_UPDATE", "resource": "INC-2026-0012", "status": "SUCCESS", "timestamp": "5 mins ago"},
        {"id": "l2", "user_email": "user@cyberguard.demo", "action": "URL_SCAN_REQUEST", "resource": "https://secure-bank-login-update.com", "status": "SUCCESS", "timestamp": "12 mins ago"},
        {"id": "l3", "user_email": "SYSTEM_AUTOMATION", "action": "TRANSACTION_BLOCKED", "resource": "TXN-8291", "status": "SUCCESS", "timestamp": "15 mins ago"}
    ]
