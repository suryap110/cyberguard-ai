from pydantic import BaseModel
from typing import Optional, List

class URLScanRequest(BaseModel):
    url: str

class MessageScanRequest(BaseModel):
    message: str

class QRScanRequest(BaseModel):
    payload: str
