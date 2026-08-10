import re

class MessageAnalyzer:
    SCAM_PATTERNS = [
        {"pattern": r"\b(blocked today|account suspended|deactivated|action required)\b", "phrase": "blocked today / account suspended", "reason": "Urgency & Fear Tactic", "risk": 25},
        {"pattern": r"\b(otp|password|pin|cvv)\b", "phrase": "OTP / Security PIN", "reason": "Credential Harvesting", "risk": 30},
        {"pattern": r"\b(click here|bit\.ly|tinyurl|verify-account|login-update)\b", "phrase": "suspicious verification link", "reason": "Phishing Redirect Link", "risk": 20},
        {"pattern": r"\b(electricity bill|lottery|reward points|refund|cashback|prize)\b", "phrase": "unsolicited reward / bill threat", "reason": "Social Engineering Hook", "risk": 20},
        {"pattern": r"\b(send immediately|within 2 hours|urgent|immediately)\b", "phrase": "send immediately / urgent deadline", "reason": "Artificial Time Pressure", "risk": 15}
    ]

    def analyze(self, message: str) -> dict:
        risk_score = 10
        suspicious_phrases = []

        for item in self.SCAM_PATTERNS:
            matches = re.findall(item["pattern"], message, flags=re.IGNORECASE)
            if matches:
                risk_score += item["risk"]
                matched_text = matches[0] if isinstance(matches[0], str) else matches[0][0]
                suspicious_phrases.append({
                    "phrase": matched_text,
                    "reason": item["reason"],
                    "risk_boost": item["risk"]
                })

        risk_score = min(max(risk_score, 5), 98)

        if risk_score >= 75:
            severity = "CRITICAL"
            intent = "High-Risk Banking / OTP Scam"
        elif risk_score >= 50:
            severity = "HIGH"
            intent = "Phishing / Social Engineering Scam"
        elif risk_score >= 25:
            severity = "MEDIUM"
            intent = "Spam / Marketing Threat"
        else:
            severity = "LOW"
            intent = "Safe Message"

        explanation = (
            f"Message analyzed with CYBERGUARD NLP Engine. Risk score is {risk_score}/100 ({severity}). "
            f"Detected intent: '{intent}'. Identified {len(suspicious_phrases)} high-threat scam indicators."
        )

        return {
            "raw_message": message,
            "risk_score": risk_score,
            "severity": severity,
            "detected_intent": intent,
            "suspicious_phrases": suspicious_phrases,
            "explanation": explanation
        }

message_analyzer = MessageAnalyzer()
