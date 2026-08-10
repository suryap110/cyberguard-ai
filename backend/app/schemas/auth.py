from pydantic import BaseModel, EmailStr
from typing import Optional

class UserLogin(BaseModel):
    email: str
    password: str

class UserRegister(BaseModel):
    email: str
    password: str
    full_name: str
    role: Optional[str] = "USER"

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict
