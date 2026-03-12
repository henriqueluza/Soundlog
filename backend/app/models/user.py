from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional, List
from datetime import datetime

class UserRegister(BaseModel):
    email: EmailStr
    username: str
    password: str

    @field_validator("username")
    def validate_username(cls, v):
        if len(v) < 3:
            raise ValueError("Username deve ter no mínimo 3 caracteres")
        if len(v) > 20:
            raise ValueError("Username deve ter no máximo 20 caracteres")
        if not v.replace("_", "").isalnum():
            raise ValueError("Username só pode ter letras, números e underscore")
        return v.lower()

    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 8:
            raise ValueError("Senha deve ter no mínimo 8 caracteres")
        if not any(c.isdigit() for c in v):
            raise ValueError("Senha deve ter pelo menos um número")
        if not any(c in "!@#$%^&*" for c in v):
            raise ValueError("Senha deve ter pelo menos um caractere especial")
        return v

class UserLogin(BaseModel):
    login: str
    password: str

class UserResponse(BaseModel):
    username: str
    profile_pic_url: Optional[str] = None
    followers: List[str] = []
    following: List[str] = []
    created_at: datetime
    favorite_genres: List[str] = []
