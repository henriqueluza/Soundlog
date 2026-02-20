from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(UserBase):
    password: str

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