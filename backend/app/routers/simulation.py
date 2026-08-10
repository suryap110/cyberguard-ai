import asyncio
from fastapi import APIRouter, BackgroundTasks
from app.websocket_manager import ws_manager

router = APIRouter(prefix="/simulation", tags=["Simulation Center"])

SIMULATION_STEPS = [
    {"step": 1, "type": "PHISHING_GENERATED", "title": "Phishing message generated & sent via SMS", "risk": 75, "delay": 1.0},
    {"step": 2, "type": "SUSPICIOUS_URL_CLICKED", "title": "User clicked malicious URL: secure-bank-verify-login.com", "risk": 91, "delay": 1.2},
    {"step": 3, "type": "CREDENTIAL_COMPROMISE", "title": "Credential harvesting form detected on fake portal", "risk": 95, "delay": 1.2},
    {"step": 4, "type": "UNKNOWN_LOGIN_ATTEMPT", "title": "17 Brute-force login attempts from IP 198.51.100.42", "risk": 96, "delay": 1.2},
    {"step": 5, "type": "BEHAVIORAL_ANOMALY", "title": "Abnormal midnight login deviation confirmed by AI engine", "risk": 96, "delay": 1.2},
    {"step": 6, "type": "FRAUD_TRANSACTION_ATTEMPT", "title": "Attempted wire transfer of ₹85,000 to flagged account", "risk": 98, "delay": 1.2},
    {"step": 7, "type": "ATTACK_CHAIN_CORRELATED", "title": "CYBERGUARD correlated 6 signals into incident #INC-2026-0012", "risk": 98, "delay": 1.0},
    {"step": 8, "type": "THREAT_CONTAINED", "title": "THREAT CONTAINED! Account locked & transaction blocked automatically.", "risk": 98, "delay": 0.5}
]

async def run_attack_simulation_task():
    for event in SIMULATION_STEPS:
        await asyncio.sleep(event["delay"])
        await ws_manager.broadcast({
            "event_type": "SIMULATION_STEP",
            "data": {
                "step": event["step"],
                "type": event["type"],
                "title": event["title"],
                "risk_score": event["risk"],
                "timestamp": "Just now"
            }
        })
    
    # Broadcast final contained summary card
    await ws_manager.broadcast({
        "event_type": "SIMULATION_COMPLETE",
        "data": {
            "incident_code": "INC-2026-0012",
            "title": "MULTI-STAGE CYBER FRAUD CONTAINED",
            "risk_score": 98,
            "severity": "CRITICAL",
            "events_correlated": 7,
            "incidents_created": 1,
            "transactions_blocked": 1
        }
    })

@router.post("/run-attack")
async def trigger_full_attack(background_tasks: BackgroundTasks):
    background_tasks.add_task(run_attack_simulation_task)
    return {
        "status": "SIMULATION_STARTED",
        "message": "Multi-stage cyber attack simulation launched. Real-time events broadcasting over WebSockets.",
        "steps_count": len(SIMULATION_STEPS)
    }
