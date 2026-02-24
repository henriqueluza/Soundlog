from fastapi import APIRouter, HTTPException, Response
from app.models.user import UserResponse, UserCreate, UserInDB
from app.db.mongodb import db
from app.utils import hash_password, set_auth_cookie
from datetime import datetime
from app.models.token import TokenResponse
from app.utils import create_access_token, verify_password
from app.models.user import LoginRequest


router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register")
async def register(user: UserCreate, response: Response):

    existing_user = await db["users"].find_one({
        "$or": [
            {"username": user.username},
            {"email": user.email}
        ]
    })

    if existing_user:
        raise HTTPException(status_code=400, detail="Usuário já existe.")

    hashed_password = hash_password(user.password)

    new_user = UserInDB(
        username=user.username,
        email=user.email,
        password_hash=hashed_password,
        created_at=datetime.now()
    )

    await db["users"].insert_one(new_user.model_dump())

    access_token = create_access_token({"sub": new_user.username})

    set_auth_cookie(response, access_token)

    return {"message": "Cadastro realizado!"}

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

    set_auth_cookie(response, access_token)

    return {"message": "Login realizado"}

@router.post("/logout")
def logout(response: Response):

    response.delete_cookie(key="access_token")

    return {"message": "Logout realizado!"}

@router.get("/me")
async def me(response: Response):
