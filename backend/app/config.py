import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "CYBERGUARD AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = "CYBERGUARD_AI_SUPER_SECRET_SECURITY_KEY_2026_PRODUCTION"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours
    
    # Database URL - Defaults to SQLite file for zero-config local run in VS Code
    # Set to postgresql://user:pass@localhost:5432/cyberguard for PostgreSQL
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./cyberguard.db")
    
    # CORS
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "*"
    ]
    
    # AI Engine parameters
    LLM_API_KEY: str = os.getenv("LLM_API_KEY", "demo_mode_key")

settings = Settings()
