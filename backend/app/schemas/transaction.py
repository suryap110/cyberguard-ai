from pydantic import BaseModel
from typing import Optional

class TransactionCreateRequest(BaseModel):
    amount: float
    payee_name: str
    payment_method: str = "UPI"
    location: Optional[str] = "Chennai, IN"
    is_new_device: Optional[bool] = False
