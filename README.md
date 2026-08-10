# 🚀 CYBERGUARD AI — Detect. Explain. Prevent.

> **AI-Powered Proactive Cyber Fraud, Scam & Identity Protection Platform**

CYBERGUARD AI is a commercial-grade cybersecurity platform built with a **FastAPI** backend, **PostgreSQL/SQLite** database with **SQLAlchemy ORM**, real-time **WebSockets**, deterministic **AI Threat Engines**, and a futuristic **React + TypeScript + Vite + Tailwind CSS + Framer Motion** frontend.

---

## 🌟 Key Product Features

### 1. Consumer Cyber-Protection App
- **Personal Security Score**: Animated circular gauge with 5 sub-score risk breakdowns.
- **Deep URL Phishing Scanner**: Multi-stage inspection animation evaluating brand typosquatting, SSL age, and credential harvesting keywords.
- **Scam Message NLP Scanner**: Highlights dangerous phrases inline with risk tooltips.
- **Transaction Fraud Baseline**: Evaluates transfer amounts, device novelty, and geographic jump anomalies.
- **AI Security Copilot Analyst**: Conversational assistant providing natural-language evidence breakdowns.

### 2. Enterprise Security Operations Center (SOC)
- **SOC Command Center**: Real-time event velocity counters and threat distribution metrics.
- **React Flow Attack Graph**: Visualizes multi-stage attack chains from initial phishing vector to financial wire transfer.
- **Real-time WebSockets Stream**: Live threat ticker broadcasting incoming signals.

### 3. Hackathon Signature Feature
- **1-Click "RUN FULL ATTACK SIMULATION"**: Launches a multi-stage cyber fraud attack, streams WebSockets in real-time, updates SOC stats, and triggers automated AI threat containment.

---

## 🔑 Demo Accounts

| Role | Email | Password |
|---|---|---|
| **SOC Analyst** | `analyst@cyberguard.demo` | `Password123!` |
| **Consumer User** | `user@cyberguard.demo` | `Password123!` |
| **System Admin** | `admin@cyberguard.demo` | `Password123!` |

---

## 🛠️ Step-by-Step Guide to Run in VS Code

### Step 1: Open Project in VS Code
Open VS Code and navigate to the project directory:
```bash
cd C:\Users\surya\.gemini\antigravity\scratch\cyberguard-ai
```

### Step 2: Set Up & Run FastAPI Backend
1. Open a terminal in VS Code:
```bash
cd backend
python -m venv venv
```
2. Activate virtual environment:
   - **Windows**: `venv\Scripts\activate`
   - **Mac/Linux**: `source venv/bin/activate`
3. Install dependencies:
```bash
pip install -r requirements.txt
```
4. Start the FastAPI server (it auto-creates `cyberguard.db` & seeds demo data):
```bash
python -m uvicorn app.main:app --reload --port 8000
```
Backend will be live at `http://localhost:8000` (API Docs at `http://localhost:8000/docs`).

---

### Step 3: Set Up & Run React Frontend
1. Open a **second terminal window** in VS Code:
```bash
cd frontend
```
2. Install Node dependencies:
```bash
npm install
```
3. Start Vite dev server:
```bash
npm run dev
```
Frontend will be live at `http://localhost:5173`.

---

## 🐳 Docker Setup (Optional)
To run backend, frontend, PostgreSQL, and Redis together using Docker:
```bash
docker compose up --build
```
