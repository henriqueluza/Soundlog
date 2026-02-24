from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
import os
from app.db.mongodb import db
from dotenv import load_dotenv
from fastapi import HTTPException, Depends, Request, Response
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

load_dotenv("/Users/henriqueluza/Coding/Projeto Soundlog/.env")

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__truncate_error=False
)

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=30)
    data["exp"] = expire
    return jwt.encode(data, key = SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(request: Request):
    token = request.cookies.get("access_token")

    if not token:
        raise HTTPException(status_code=400, detail="Token inválido ou expirado")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Token invalido ou expirado")
    username: str = payload.get("sub")

    user = await db["users"].find_one({"username": username})

    if user is None:
        raise HTTPException(status_code=401, detail="Usuário não encontrado")
    user["_id"] = str(user["_id"])
    return user

def set_auth_cookie(response: Response, token: str):
     return response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=False, # alterar durante deploy
        max_age=604800, # 7 dias
    )