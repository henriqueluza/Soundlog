from fastapi import APIRouter, HTTPException, Response
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
        raise HTTPException(status_code=400, detail="Usuário já existe.")

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

@router.post("/login")
async def login(user: LoginRequest, response: Response):

    DUMMY_HASH = "$2b$12$KIXoLbMDKomFGZEYdEMnpuLbLqp8vKpDCLv0V6JpKZDm5T7X8kK3e" # hash dummy para proteger o sistema de ataques de timing

    if user.username is not None:
        found_user = await db["users"].find_one({"username": user.username})
    else:
        found_user = await db["users"].find_one({"email": user.email})

    password_to_check = found_user["password_hash"] if found_user else DUMMY_HASH
    is_valid = found_user is not None and verify_password(user.password, password_to_check)

    if not is_valid:
        raise HTTPException(status_code=401, detail="Usuário ou senha incorretos.") # mensagem genérica para evitar que descubram caso uma conta existe

    access_token = create_access_token({"sub": found_user["username"]}) # cria o token de acesso; sub é uma convenção de subject

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,# alterar quando subir o código
        samesite="lax", # proteção contra CSRF mas ainda permite acesso por links externos tipo email
        max_age=86400 # duração do cookie - 7 dias
    )
    return {"message": "Login realizado"}


