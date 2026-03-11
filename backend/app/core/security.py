from fastapi import Response, HTTPException
from passlib.context import CryptContext
from app.core.config import settings
from datetime import datetime, timedelta
from jose import jwt, JWTError

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password : str, hashed_password : str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(username: str) -> str:
    payload = {
        "sub": username,
        "exp": datetime.utcnow() + timedelta(days=settings.ACCESS_TOKEN_EXPIRES)
    }
    return jwt.encode(payload, settings.SECRET_KEY, settings.ALGORITHM)

def verify_token(token: str):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get("sub")
        if not username:
            raise HTTPException(status_code=401)
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

def set_auth_cookie(response: Response, token: str):
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=False,  # somente durante desenvolvimento
        samesite="lax",
        max_age = 7 * 24 * 3600
    )

def delete_auth_cookie(response: Response):
    response.delete_cookie(key="access_token")