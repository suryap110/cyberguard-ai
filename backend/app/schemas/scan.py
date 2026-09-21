from pydantic import BaseModel
from typing import Optional, List

class URLScanRequest(BaseModel):
    url: str

class MessageScanRequest(BaseModel):
    message: str

class QRScanRequest(BaseModel):
    payload: str

class DeepfakeScanRequest(BaseModel):
    filename: Optional[str] = "audio_sample.wav"
    scan_type: Optional[str] = "VOICE" # VOICE or DOCUMENT

class APKScanRequest(BaseModel):
    filename: Optional[str] = "sample.apk"
    package_name: Optional[str] = "com.untrusted.financial.app"

class SimGuardScanRequest(BaseModel):
    phone_number: str

class DarkWebSearchRequest(BaseModel):
    query: str

class SandboxScanRequest(BaseModel):
    transaction_amount: float
    payee: str
    location: Optional[str] = "Chennai, IN"
