from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserRegister(BaseModel):
    email: EmailStr
    username: str
    password: str

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
