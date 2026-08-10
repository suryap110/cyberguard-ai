import random
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.transaction import Transaction
from app.schemas.transaction import TransactionCreateRequest
from app.ai_engine.fraud_detector import fraud_detector
from app.security.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.get("")
def list_transactions(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    txns = db.query(Transaction).order_by(Transaction.created_at.desc()).all()
    if not txns:
        # Return fallback demo transactions if database is fresh
        return [
            {
                "id": "1",
                "txn_code": "TXN-8291",
                "amount": 85000.0,
                "payee_name": "UNKNOWN_BANK_REMITTANCE",
                "payment_method": "BANK_TRANSFER",
                "status": "BLOCKED",
                "risk_score": 96,
                "severity": "CRITICAL",
                "location": "Chennai -> Remote Proxy",
                "is_anomaly": True,
                "ai_verdict": "Critical amount spike + unusual login location jump detected.",
                "created_at": "2 min ago"
            },
            {
                "id": "2",
                "txn_code": "TXN-4912",
                "amount": 2500.0,
                "payee_name": "FreshFoods Supermarket",
                "payment_method": "UPI",
                "status": "PASSED",
                "risk_score": 12,
                "severity": "SAFE",
                "location": "Chennai, IN",
                "is_anomaly": False,
                "ai_verdict": "Normal transaction pattern matching historical behavioral profile.",
                "created_at": "1 hour ago"
            }
        ]
    return txns

@router.post("/analyze")
def analyze_transaction(payload: TransactionCreateRequest, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    result = fraud_detector.analyze_transaction(
        amount=payload.amount,
        user_avg=4200.0,
        location=payload.location,
        is_new_device=payload.is_new_device
    )

    code = f"TXN-{random.randint(1000, 9999)}"
    db_txn = Transaction(
        txn_code=code,
        user_id=user.id,
        amount=payload.amount,
        payee_name=payload.payee_name,
        payment_method=payload.payment_method,
        status="BLOCKED" if result["risk_score"] >= 75 else "PASSED",
        risk_score=result["risk_score"],
        severity=result["severity"],
        location=payload.location,
        is_anomaly=result["is_anomaly"],
        risk_factors=result["risk_factors"],
        ai_verdict=result["ai_verdict"]
    )
    db.add(db_txn)
    db.commit()
    db.refresh(db_txn)

    return db_txn
