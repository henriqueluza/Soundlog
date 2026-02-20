from pydantic import BaseModel

class TokenResponse(BaseModel):
    token: str
    token_type: str = "bearer"

