class BehavioralAnalyzer:
    def analyze_login_behavior(
        self, 
        failed_attempts: int, 
        hour: int, 
        is_known_device: bool, 
        is_known_ip: bool
    ) -> dict:
        risk_score = 10
        anomalies = []

        if failed_attempts >= 10:
            risk_score += 50
            anomalies.append({
                "type": "Brute Force Attack",
                "detail": f"{failed_attempts} failed login attempts detected within 5 minutes",
                "severity": "CRITICAL"
            })
        elif failed_attempts >= 3:
            risk_score += 20
            anomalies.append({
                "type": "Multiple Failed Logins",
                "detail": f"{failed_attempts} failed attempts recorded",
                "severity": "MEDIUM"
            })

        if hour >= 1 and hour <= 4:
            risk_score += 15
            anomalies.append({
                "type": "Unusual Time Window",
                "detail": f"Authentication attempt during unusual hour ({hour}:00 AM)",
                "severity": "MEDIUM"
            })

        if not is_known_device:
            risk_score += 15
            anomalies.append({
                "type": "New Device Fingerprint",
                "detail": "Session established from untrusted browser / hardware",
                "severity": "MEDIUM"
            })

        risk_score = min(max(risk_score, 5), 97)
        severity = "CRITICAL" if risk_score >= 75 else ("HIGH" if risk_score >= 50 else ("MEDIUM" if risk_score >= 25 else "LOW"))

        return {
            "risk_score": risk_score,
            "severity": severity,
            "anomalies": anomalies,
            "is_account_takeover_risk": risk_score >= 70
        }

behavioral_analyzer = BehavioralAnalyzer()
