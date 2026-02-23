from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

    @field_validator("password")
    def validate_password(cls, v): # cls -> referencia à própria classe; v -> valor do campo
        if len(v) < 8:
            raise ValueError("Mínimo 8 caracteres")
        if not any (c.isdigit() for c in v):
            raise ValueError("Deve ter pelo menos um número")
        if not any (c in "!@#$%ˆ&*" for c in v):
            raise ValueError("Deve ter pelo menos um símbolo")
        return v

class UserInDB(UserBase):
    password_hash: str
    created_at: datetime
    followers: list = []
    following: list = []
    favorite_genres: list = []
    onboarding_complete: bool = False

class UserResponse(UserBase):
    followers: list = []
    following: list = []
    favorite_genres: list = []
    created_at: datetime
    avatar_url: Optional[str] = None

class UserPublicResponse(BaseModel):
    username: str
    followers: list = []
    following: list = []
    favorite_genres: list = []
    created_at: datetime

class LoginRequest(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    password: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    avatar_url: Optional[str] = None

class UserUpdatePassword(BaseModel):
    current_password: str
    new_password: str

class UserDelete(BaseModel):
    password: str