from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.copilot import CopilotQueryRequest
from app.ai_engine.copilot_reasoning import copilot_engine

router = APIRouter(prefix="/copilot", tags=["AI Copilot"])

@router.post("/query")
def ask_copilot(payload: CopilotQueryRequest):
    response = copilot_engine.generate_response(payload.message)
    return {
        "text": response["text"],
        "card": response.get("card"),
        "conversation_id": payload.conversation_id or "conv-demo-101"
    }
