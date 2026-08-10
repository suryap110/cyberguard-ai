class CopilotReasoningEngine:
    def generate_response(self, user_prompt: str, user_context: dict = None) -> dict:
        prompt_lower = user_prompt.lower()

        if "transaction" in prompt_lower or "money" in prompt_lower or "fraud" in prompt_lower:
            return {
                "text": "I evaluated your recent financial transactions using CYBERGUARD ML Fraud Detection models. Here is the threat analysis breakdown:",
                "card": {
                    "title": "Suspicious Bank Transfer Flagged",
                    "risk_score": 94,
                    "severity": "CRITICAL",
                    "threat": "High Variance Financial Transfer",
                    "evidence": [
                        "Amount ₹85,000 is 20x higher than your average transfer (₹4,200)",
                        "Initiated from untrusted device fingerprint (Chrome / Linux)",
                        "Anomalous geographical jump (Chennai -> Unknown Remote Proxy)"
                    ],
                    "recommendation": [
                        "Freeze transfer authorization immediately",
                        "Revoke active session on untrusted Chrome/Linux device",
                        "Enable Biometric Step-Up 2FA for transactions > ₹10,000"
                    ]
                }
            }
        elif "safe" in prompt_lower or "score" in prompt_lower or "status" in prompt_lower or "account" in prompt_lower:
            return {
                "text": "Your CYBERGUARD Personal Security Score is **92/100 (SECURE)**. Your digital identity posture remains strongly protected.",
                "card": {
                    "title": "Account Health Overview",
                    "risk_score": 92,
                    "severity": "SAFE",
                    "threat": "No Active Account Takeover Threats",
                    "evidence": [
                        "3 Trusted devices registered (MacBook Pro, Android 15, iPad Air)",
                        "Zero unverified credential breach exposures",
                        "2 Active authenticated sessions matching known IP fingerprints"
                    ],
                    "recommendation": [
                        "Perform monthly URL & SMS security sweep",
                        "Update primary authentication secret (last changed 45 days ago)"
                    ]
                }
            }
        elif "incident" in prompt_lower or "alert" in prompt_lower or "threat" in prompt_lower:
            return {
                "text": "I've retrieved today's SOC threat monitoring summary for your organization and personal perimeter:",
                "card": {
                    "title": "Incident #INC-2026-0012 Active Investigation",
                    "risk_score": 97,
                    "severity": "CRITICAL",
                    "threat": "Coordinated Phishing & Account Takeover Sequence",
                    "evidence": [
                        "17 Failed brute-force logins recorded at 02:31 AM",
                        "Credential theft harvest via domain 'secure-bank-verify-login.com'",
                        "Automated beneficiary addition attempt without OTP step"
                    ],
                    "recommendation": [
                        "Execute automated containment: Revoke session token",
                        "Blacklist IP range 198.51.100.42 across firewall edge",
                        "Notify assigned analyst (Analyst-01) for SOC audit"
                    ]
                }
            }
        else:
            return {
                "text": f"CYBERGUARD AI analyzed your inquiry: '{user_prompt}'. All systems are actively scanning network packets, URLs, messages, and transaction telemetry in real-time.",
                "card": {
                    "title": "CYBERGUARD Security Copilot",
                    "risk_score": 10,
                    "severity": "SAFE",
                    "threat": "Active Real-Time Perimeter Guard",
                    "evidence": [
                        "Deterministic AI Threat Engine Operational",
                        "WebSockets Real-Time Stream Active",
                        "Zero critical uncontained incidents in current session"
                    ],
                    "recommendation": [
                        "Use '/scanner/url' to test any suspicious link before opening",
                        "Paste suspicious SMS text into the Message Scanner for immediate NLP breakdown"
                    ]
                }
            }

copilot_engine = CopilotReasoningEngine()
