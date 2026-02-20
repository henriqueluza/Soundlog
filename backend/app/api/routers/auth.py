from fastapi import APIRouter, HTTPException
from app.models.user import UserResponse, UserCreate, UserInDB
from app.db.mongodb import db
from app.utils import hash_password
from datetime import datetime
from app.models.token import TokenResponse
from app.utils import create_access_token, verify_password
from app.models.user import LoginRequest


router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
async def register(user: UserCreate):

    existing_user = await db["users"].find_one({"username": user.username})
    existing_email = await db["users"].find_one({"email": user.email})

    if existing_user is not None or existing_email is not None:
        raise HTTPException(status_code=400, detail="Usuário já existe")

    hashed_password = hash_password(user.password)

    new_user = UserInDB(
        username=user.username,
        email=user.email,
        password_hash=hashed_password,
        created_at=datetime.now()
    )

    await db["users"].insert_one(new_user.model_dump())

    return UserResponse(
        username=new_user.username,
        email=new_user.email,
        followers=new_user.followers,
        following=new_user.following,
        favorite_genres=new_user.favorite_genres,
        created_at=new_user.created_at
    )