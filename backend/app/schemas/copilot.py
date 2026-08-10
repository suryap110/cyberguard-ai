from pydantic import BaseModel
from typing import Optional

class CopilotQueryRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
