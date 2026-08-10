from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.scan import URLScanRequest, MessageScanRequest, QRScanRequest
from app.ai_engine.url_analyzer import url_analyzer
from app.ai_engine.message_analyzer import message_analyzer
from app.models.threat import URLScan, MessageScan, QRScan

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
    # QR scanner delegates to URL or payment inspector
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
