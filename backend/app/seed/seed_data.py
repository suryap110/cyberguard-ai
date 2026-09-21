import logging
from sqlalchemy.orm import Session
from app.models.user import User, Device
from app.models.threat import ThreatEvent, URLScan, ZeroTrustPolicy
from app.models.transaction import Transaction
from app.models.incident import Incident
from app.models.audit import SystemHealth
from app.security.auth import get_password_hash

logger = logging.getLogger("cyberguard.seed")

def seed_initial_data(db: Session):
    # Check if data already exists
    if db.query(User).filter(User.email == "user@cyberguard.demo").first():
        logger.info("Database already seeded. Skipping initial seed.")
        return

    logger.info("Seeding CYBERGUARD AI initial demo accounts & synthetic threat data...")

    # 1. Create Demo Users
    user_pass = get_password_hash("Password123!")
    
    demo_user = User(
        email="user@cyberguard.demo",
        hashed_password=user_pass,
        full_name="Surya (Consumer)",
        role="USER",
        security_score=92
    )
    demo_analyst = User(
        email="analyst@cyberguard.demo",
        hashed_password=user_pass,
        full_name="SOC Lead Analyst",
        role="SECURITY_ANALYST",
        security_score=98
    )
    demo_admin = User(
        email="admin@cyberguard.demo",
        hashed_password=user_pass,
        full_name="System Administrator",
        role="ADMIN",
        security_score=99
    )

    db.add_all([demo_user, demo_analyst, demo_admin])
    db.commit()
    db.refresh(demo_user)

    # 2. Devices
    d1 = Device(user_id=demo_user.id, device_name="MacBook Pro 16\"", device_type="Desktop", operating_system="macOS Sonoma", ip_address="103.28.45.12", location="Chennai, IN", is_trusted=True)
    d2 = Device(user_id=demo_user.id, device_name="Samsung S24 Ultra", device_type="Mobile", operating_system="Android 15", ip_address="103.28.45.14", location="Chennai, IN", is_trusted=True)
    d3 = Device(user_id=demo_user.id, device_name="Linux Remote Proxy", device_type="Desktop", operating_system="Ubuntu 22.04", ip_address="198.51.100.42", location="Unknown Location", is_trusted=False)
    db.add_all([d1, d2, d3])

    # 3. Threat Events
    t1 = ThreatEvent(
        threat_code="TRT-1023",
        category="Account Takeover",
        title="17 Failed Logins & Password Change Spike",
        source="IP 198.51.100.42",
        risk_score=97,
        severity="CRITICAL",
        status="INVESTIGATING",
        ai_explanation="Brute force login surge followed by unauthorized password modification."
    )
    t2 = ThreatEvent(
        threat_code="TRT-1024",
        category="Phishing",
        title="Financial Brand Impersonation Domain",
        source="https://secure-bank-login-update.com",
        risk_score=91,
        severity="CRITICAL",
        status="BLOCKED",
        ai_explanation="Phishing domain containing credential harvesting payload."
    )
    db.add_all([t1, t2])

    # 4. Incident
    inc = Incident(
        incident_code="INC-2026-0012",
        title="Coordinated Phishing & Account Takeover Sequence",
        threat_type="Account Takeover",
        risk_score=97,
        severity="CRITICAL",
        status="INVESTIGATING",
        assigned_analyst="Analyst-01",
        user_id=demo_user.id,
        summary="Multi-stage attack vector starting with SMS phishing link, credential harvesting, brute force login, and attempted wire transfer.",
        evidence=["Phishing SMS received", "17 failed login attempts", "Session hijack attempt", "₹85,000 transaction request"],
        ai_recommendation="Revoke active sessions, block IP range, freeze outbound transactions."
    )
    db.add(inc)

    # 5. System Health
    h1 = SystemHealth(component="API Service", status="Operational", latency_ms=12.0, uptime_percentage=99.98)
    h2 = SystemHealth(component="Database", status="Operational", latency_ms=4.0, uptime_percentage=99.99)
    h3 = SystemHealth(component="AI Engine", status="Operational", latency_ms=45.0, uptime_percentage=99.95)
    h4 = SystemHealth(component="WebSockets", status="Operational", latency_ms=8.0, uptime_percentage=100.00)
    db.add_all([h1, h2, h3, h4])

    # 6. Zero-Trust Default Policies
    zt1 = ZeroTrustPolicy(policy_code="ZT-001", name="Strict Device Fingerprint Verification", category="Identity", enforcement_level="HIGH", is_active=1, description="Require hardware token for any new browser fingerprint.")
    zt2 = ZeroTrustPolicy(policy_code="ZT-002", name="Real-Time IMSI Swap Detection", category="Mobile Security", enforcement_level="STRICT", is_active=1, description="Block OTP logins if SIM card swapped within 48 hours.")
    zt3 = ZeroTrustPolicy(policy_code="ZT-003", name="Geographic Velocity Anomaly Block", category="Transactions", enforcement_level="STRICT", is_active=1, description="Auto-freeze funds if login distance velocity exceeds 800km/h.")
    zt4 = ZeroTrustPolicy(policy_code="ZT-004", name="Zero-Trust Microsegmentation Sandbox", category="Infrastructure", enforcement_level="BALANCED", is_active=1, description="Isolate untrusted API calls in ephemeral container sandbox.")
    db.add_all([zt1, zt2, zt3, zt4])

    db.commit()
    logger.info("CYBERGUARD AI seed data successfully committed!")
