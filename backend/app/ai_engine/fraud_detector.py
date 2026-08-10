class TransactionFraudDetector:
    def analyze_transaction(
        self, 
        amount: float, 
        user_avg: float = 4200.0, 
        location: str = "Unknown Location", 
        user_locations: list = None,
        is_new_device: bool = False
    ) -> dict:
        user_locations = user_locations or ["Chennai, IN", "Bengaluru, IN"]
        risk_score = 15
        risk_factors = []

        # 1. Amount variance check
        amount_ratio = amount / max(user_avg, 1.0)
        if amount_ratio > 10.0:
            risk_score += 45
            risk_factors.append({
                "factor": "Extreme Amount Variance",
                "detail": f"Current transaction (₹{amount:,.2f}) is {amount_ratio:.1f}x higher than user average (₹{user_avg:,.2f})",
                "severity": "CRITICAL"
            })
        elif amount_ratio > 4.0:
            risk_score += 25
            risk_factors.append({
                "factor": "High Transaction Amount",
                "detail": f"Amount is {amount_ratio:.1f}x higher than average",
                "severity": "HIGH"
            })

        # 2. Location anomaly check
        if location not in user_locations and "Unknown" in location:
            risk_score += 30
            risk_factors.append({
                "factor": "Geographic Anomaly",
                "detail": f"Transaction initiated from unverified location: {location}",
                "severity": "HIGH"
            })

        # 3. Device novelty check
        if is_new_device:
            risk_score += 20
            risk_factors.append({
                "factor": "Unrecognized Device",
                "detail": "Initiated from a newly registered untrusted device",
                "severity": "MEDIUM"
            })

        risk_score = min(max(risk_score, 5), 98)

        if risk_score >= 75:
            severity = "CRITICAL"
            verdict = "Fraudulent Transaction Attempt - Recommended Immediate Block"
        elif risk_score >= 50:
            severity = "HIGH"
            verdict = "High Risk Anomaly - 2FA Verification Required"
        elif risk_score >= 25:
            severity = "WARNING"
            verdict = "Mild Deviation - Monitor"
        else:
            severity = "SAFE"
            verdict = "Normal Transaction Pattern"

        ai_verdict = (
            f"CYBERGUARD Fraud Engine assigned risk score {risk_score}/100 ({severity}). "
            f"{verdict}. Factors identified: {len(risk_factors)} anomalies."
        )

        return {
            "amount": amount,
            "user_avg": user_avg,
            "risk_score": risk_score,
            "severity": severity,
            "is_anomaly": risk_score >= 50,
            "risk_factors": risk_factors,
            "ai_verdict": ai_verdict
        }

fraud_detector = TransactionFraudDetector()
