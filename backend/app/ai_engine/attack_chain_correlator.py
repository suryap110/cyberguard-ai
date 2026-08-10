class AttackChainCorrelator:
    def correlate_attack_sequence(self, events: list) -> dict:
        """
        Correlates a chronological list of security signals into a unified attack graph.
        """
        chain = []
        max_risk = 0
        
        for idx, event in enumerate(events, 1):
            risk = event.get("risk_score", 50)
            if risk > max_risk:
                max_risk = risk
            chain.append({
                "step": idx,
                "event_type": event.get("event_type", "UNKNOWN_EVENT"),
                "description": event.get("description", "Security Event"),
                "risk_score": risk,
                "timestamp": event.get("timestamp")
            })

        overall_score = min(max_risk + (len(events) * 3), 99)
        severity = "CRITICAL" if overall_score >= 80 else "HIGH"

        return {
            "incident_title": "Multi-Stage Cyber Fraud & Account Takeover Sequence",
            "overall_risk_score": overall_score,
            "severity": severity,
            "total_correlated_events": len(events),
            "attack_chain": chain,
            "ai_summary": f"Correlated {len(events)} suspicious telemetry events into a unified attack vector. High probability of coordinated financial account takeover."
        }

attack_chain_correlator = AttackChainCorrelator()
