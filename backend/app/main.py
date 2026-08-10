import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base, SessionLocal
from app.seed.seed_data import seed_initial_data
from app.routers import (
    auth, dashboard, scans, transactions, threats, 
    incidents, identity, alerts, copilot, simulation, admin, websocket
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("cyberguard.main")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing CYBERGUARD AI Database Schema...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        seed_initial_data(db)
    finally:
        db.close()
        
    logger.info("CYBERGUARD AI Full-Stack Security Engine is Operational!")
    yield
    logger.info("Shutting down CYBERGUARD AI Engine...")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="CYBERGUARD AI — Proactive AI-Powered Cyber Fraud, Scam & Identity Protection Platform",
    lifespan=lifespan
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Router Registrations
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(dashboard.router, prefix=settings.API_V1_STR)
app.include_router(scans.router, prefix=settings.API_V1_STR)
app.include_router(transactions.router, prefix=settings.API_V1_STR)
app.include_router(threats.router, prefix=settings.API_V1_STR)
app.include_router(incidents.router, prefix=settings.API_V1_STR)
app.include_router(identity.router, prefix=settings.API_V1_STR)
app.include_router(alerts.router, prefix=settings.API_V1_STR)
app.include_router(copilot.router, prefix=settings.API_V1_STR)
app.include_router(simulation.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)
app.include_router(websocket.router)

@app.get("/")
def root_status():
    return {
        "status": "OPERATIONAL",
        "system": "CYBERGUARD AI",
        "tagline": "Detect. Explain. Prevent.",
        "version": settings.VERSION,
        "docs": "/docs"
    }
