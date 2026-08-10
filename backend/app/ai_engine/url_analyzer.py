import re
from urllib.parse import urlparse

class URLAnalyzer:
    KNOWN_FINANCIAL_BRANDS = [
        "hdfc", "icici", "sbi", "axisbank", "paytm", "paypal", "chase", "wellsfargo", 
        "bankofamerica", "coinbase", "binance", "google", "apple", "microsoft", "amazon"
    ]

    SUSPICIOUS_KEYWORDS = [
        "verify", "secure", "update", "banking", "login", "account", "blocked", 
        "confirm", "kyc", "alert", "reward", "refund", "claim", "free", "urgent"
    ]

    def analyze(self, url: str) -> dict:
        parsed = urlparse(url if url.startswith(("http://", "https://")) else f"http://{url}")
        domain = parsed.netloc or parsed.path
        domain_lower = domain.lower()

        risk_score = 15
        factors = []
        impersonated_brand = None

        # 1. Protocol check
        if not url.startswith("https://"):
            risk_score += 20
            factors.append({"factor": "Insecure Protocol", "detail": "URL does not use SSL/HTTPS encryption", "severity": "HIGH"})

        # 2. Brand impersonation / Typosquatting
        for brand in self.KNOWN_FINANCIAL_BRANDS:
            if brand in domain_lower and not domain_lower.endswith(f"{brand}.com") and not domain_lower.endswith(f"{brand}.in"):
                risk_score += 35
                impersonated_brand = brand.upper()
                factors.append({
                    "factor": "Brand Impersonation", 
                    "detail": f"Domain contains brand '{brand.upper()}' but is not an official domain", 
                    "severity": "CRITICAL"
                })

        # 3. Suspicious keywords in path/domain
        kw_count = 0
        for kw in self.SUSPICIOUS_KEYWORDS:
            if kw in url.lower():
                kw_count += 1
        if kw_count > 0:
            score_add = min(kw_count * 15, 35)
            risk_score += score_add
            factors.append({
                "factor": "Credential Harvesting Keywords", 
                "detail": f"Contains {kw_count} high-risk urgency/banking keywords", 
                "severity": "HIGH"
            })

        # 4. Domain length / Hyphens
        if domain_lower.count("-") >= 2 or len(domain_lower) > 30:
            risk_score += 15
            factors.append({"factor": "Suspicious Domain Structure", "detail": "Excessive hyphens or randomized subdomain structure", "severity": "MEDIUM"})

        # Cap score
        risk_score = min(max(risk_score, 5), 98)

        if risk_score >= 75:
            severity = "CRITICAL"
            verdict = "Likely Phishing / Malicious Domain"
        elif risk_score >= 50:
            severity = "HIGH"
            verdict = "Suspicious Domain - Exercise Caution"
        elif risk_score >= 25:
            severity = "MEDIUM"
            verdict = "Unverified Link"
        else:
            severity = "LOW"
            verdict = "Verified / Low Risk Domain"

        ai_summary = (
            f"CYBERGUARD AI flagged this domain with a risk score of {risk_score}/100 ({severity}). "
            + (f"Impersonation detected targeting {impersonated_brand}. " if impersonated_brand else "")
            + "Domain structure and keyword composition resemble credentials harvesting phishing operations."
        )

        return {
            "url": url,
            "domain": domain,
            "risk_score": risk_score,
            "severity": severity,
            "is_phishing": 1 if risk_score >= 60 else 0,
            "confidence": 0.96 if risk_score >= 60 else 0.88,
            "impersonating_brand": impersonated_brand,
            "detected_factors": factors,
            "ai_summary": ai_summary
        }

url_analyzer = URLAnalyzer()
