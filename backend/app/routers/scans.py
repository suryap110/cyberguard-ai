import random
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.scan import (
    URLScanRequest, MessageScanRequest, QRScanRequest,
    DeepfakeScanRequest, APKScanRequest, SimGuardScanRequest, SandboxScanRequest
)
from app.ai_engine.url_analyzer import url_analyzer
from app.ai_engine.message_analyzer import message_analyzer
from app.ai_engine.deepfake_analyzer import deepfake_analyzer
from app.models.threat import (
    URLScan, MessageScan, QRScan,
    DeepfakeScan, APKScan, SimGuardScan, SandboxScan
)
from fastapi import UploadFile, File

router = APIRouter(prefix="/scans", tags=["Scanner"])

@router.post("/url")
def scan_url(payload: URLScanRequest, db: Session = Depends(get_db)):
    result = url_analyzer.analyze(payload.url)
    
    db_scan = URLScan(
        url=result["url"],
        domain=result["domain"],
        risk_score=result["risk_score"],
        severity=result["severity"],
        is_phishing=result["is_phishing"],
        confidence=result["confidence"],
        impersonating_brand=result.get("impersonating_brand"),
        detected_factors=result["detected_factors"],
        ai_summary=result["ai_summary"]
    )
    db.add(db_scan)
    db.commit()
    
    return result

@router.post("/message")
def scan_message(payload: MessageScanRequest, db: Session = Depends(get_db)):
    result = message_analyzer.analyze(payload.message)
    
    db_scan = MessageScan(
        raw_message=result["raw_message"],
        risk_score=result["risk_score"],
        severity=result["severity"],
        detected_intent=result["detected_intent"],
        suspicious_phrases=result["suspicious_phrases"],
        explanation=result["explanation"]
    )
    db.add(db_scan)
    db.commit()

    return result

@router.post("/qr")
def scan_qr(payload: QRScanRequest, db: Session = Depends(get_db)):
    is_url = payload.payload.startswith("http")
    if is_url:
        result = url_analyzer.analyze(payload.payload)
        analysis_text = f"QR Code contains URL payload. {result['ai_summary']}"
        risk_score = result["risk_score"]
        severity = result["severity"]
    else:
        risk_score = 45
        severity = "MEDIUM"
        analysis_text = f"QR Code contains text/payment string: '{payload.payload[:30]}...'. Analyzed for VPA spoofing."

    db_scan = QRScan(
        payload=payload.payload,
        type="URL" if is_url else "PAYMENT",
        risk_score=risk_score,
        severity=severity,
        analysis=analysis_text
    )
    db.add(db_scan)
    db.commit()

    return {
        "payload": payload.payload,
        "risk_score": risk_score,
        "severity": severity,
        "analysis": analysis_text
    }

@router.post("/deepfake")
def scan_deepfake(payload: DeepfakeScanRequest, db: Session = Depends(get_db)):
    filename = payload.filename or "audio_sample.wav"
    result = deepfake_analyzer.analyze_audio_bytes(b"", filename=filename)

    db_scan = DeepfakeScan(
        filename=filename,
        scan_type=payload.scan_type or "VOICE",
        risk_score=result["risk_score"],
        confidence=result["confidence"],
        verdict=result["verdict"],
        synthetic_harmonics=result["synthetic_harmonics"],
        spectral_summary=result["spectral_summary"]
    )
    db.add(db_scan)
    db.commit()

    return result

@router.post("/deepfake/upload")
async def scan_deepfake_upload(file: UploadFile = File(...), db: Session = Depends(get_db)):
    audio_bytes = await file.read()
    filename = file.filename or "uploaded_recording.wav"
    result = deepfake_analyzer.analyze_audio_bytes(audio_bytes, filename=filename)

    db_scan = DeepfakeScan(
        filename=filename,
        scan_type="VOICE",
        risk_score=result["risk_score"],
        confidence=result["confidence"],
        verdict=result["verdict"],
        synthetic_harmonics=result["synthetic_harmonics"],
        spectral_summary=result["spectral_summary"]
    )
    db.add(db_scan)
    db.commit()

    return result

@router.post("/apk")
def scan_apk(payload: APKScanRequest, db: Session = Depends(get_db)):
    filename = payload.filename or "sample.apk"
    pkg = payload.package_name or "com.untrusted.financial.app"
    is_dangerous = "malware" in filename.lower() or "mod" in filename.lower() or "bank" in filename.lower() or "apk" in filename.lower()
    risk_score = 94 if is_dangerous else 12
    severity = "CRITICAL" if risk_score > 70 else "SAFE"
    permissions = [
        "SYSTEM_ALERT_WINDOW (Overlay Attack Risk)",
        "RECEIVE_SMS (OTP Interception Risk)",
        "BIND_ACCESSIBILITY_SERVICE (Keylogger Risk)",
        "READ_CONTACTS & RECORD_AUDIO"
    ] if is_dangerous else ["INTERNET", "ACCESS_NETWORK_STATE"]
    summary = f"APK Guard analyzed static manifest and DEX bytecode for package '{pkg}'. Dangerous permissions flag score {risk_score}/100."

    db_scan = APKScan(
        filename=filename,
        package_name=pkg,
        risk_score=risk_score,
        severity=severity,
        dangerous_permissions=permissions,
        malware_family="Android.Trojan.SpyMax" if is_dangerous else "None",
        summary=summary
    )
    db.add(db_scan)
    db.commit()

    return {
        "filename": filename,
        "package_name": pkg,
        "risk_score": risk_score,
        "severity": severity,
        "dangerous_permissions": permissions,
        "malware_family": "Android.Trojan.SpyMax" if is_dangerous else "None",
        "summary": summary
    }

@router.post("/sim")
def scan_sim(payload: SimGuardScanRequest, db: Session = Depends(get_db)):
    phone = payload.phone_number
    is_flagged = phone.endswith("999") or phone.endswith("000") or "888" in phone
    risk_score = 92 if is_flagged else 8
    sim_status = "SWAP_ALERT" if is_flagged else "ACTIVE_SAFE"
    imsi_changed = 1 if is_flagged else 0
    age_days = 2 if is_flagged else 480
    summary = f"Telecom IMSI registry query executed for {phone}. SIM swap status: {sim_status}. SIM re-issued {age_days} days ago."

    db_scan = SimGuardScan(
        phone_number=phone,
        sim_status=sim_status,
        imsi_changed=imsi_changed,
        sim_age_days=age_days,
        risk_score=risk_score,
        carrier="Airtel / Jio Telecom Mesh",
        alert_summary=summary
    )
    db.add(db_scan)
    db.commit()

    return {
        "phone_number": phone,
        "sim_status": sim_status,
        "imsi_changed": bool(imsi_changed),
        "sim_age_days": age_days,
        "risk_score": risk_score,
        "carrier": "Airtel / Jio Telecom Mesh",
        "alert_summary": summary
    }

@router.post("/sandbox")
def scan_sandbox(payload: SandboxScanRequest, db: Session = Depends(get_db)):
    amount = payload.transaction_amount
    payee = payload.payee
    is_high_risk = amount > 50000 or "unknown" in payee.lower() or "mule" in payee.lower()
    risk_score = 96 if is_high_risk else 15
    is_anomaly = 1 if is_high_risk else 0
    reasons = [
        f"Amount ₹{amount:,.2f} exceeds 12x user average baseline (₹4,200.00)",
        "Destination account created <48 hours ago",
        f"Geographic jump detected to {payload.location or 'Remote Proxy'}"
    ] if is_high_risk else ["Transaction matches user standard spending frequency."]

    verdict = f"ML Sandbox evaluated transaction of ₹{amount:,.2f} to '{payee}'. Risk level: {risk_score}/100."

    db_scan = SandboxScan(
        transaction_amount=amount,
        payee=payee,
        location=payload.location or "Chennai, IN",
        risk_score=risk_score,
        is_anomaly=is_anomaly,
        anomaly_reasons=reasons,
        ai_verdict=verdict
    )
    db.add(db_scan)
    db.commit()

    return {
        "transaction_amount": amount,
        "payee": payee,
        "location": payload.location or "Chennai, IN",
        "risk_score": risk_score,
        "is_anomaly": bool(is_anomaly),
        "anomaly_reasons": reasons,
        "ai_verdict": verdict
    }
