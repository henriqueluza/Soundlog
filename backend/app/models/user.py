from pydantic import BaseModel
from datetime import datetime

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
