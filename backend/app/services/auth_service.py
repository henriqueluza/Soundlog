from fastapi import HTTPException
from app.models.user import UserRegister, UserLogin
from app.core.security import hash_password, verify_password, create_access_token
from app.repositories.user_repository import find_by_username, find_by_email, create_user, find_by_email_or_username
from datetime import datetime

async def register(user : UserRegister):                                        # precisa receber os dados enviado pelo user  (user no formato UserRegister)
    existing = await find_by_username(user.username)
    if existing:                                                                # verifica se o username já existe
       raise HTTPException(status_code=409, detail="Username já existe")

    existing_email = await find_by_email(user.email)
    if existing_email:                                                          # verifica se o email já existe
        raise HTTPException(status_code=409, detail="Email já está em uso")

    hashed_password = hash_password(user.password)                              # hasheia a senha

    user_data = {                                                               # cria o dicionário para passar no create_user
        "username": user.username,
        "email": user.email,
        "password": hashed_password,
        'created_at': datetime.utcnow(),
    }

    await create_user(user_data)                                                # chama create_user e manda os dados para o banco de dados

async def login(user: UserLogin):
    existing = await find_by_email_or_username(user.login)
    if existing is None:                                                        # verifica se o user existe
        raise HTTPException(status_code=401, detail="Credenciais inválidas")

    password_boolean = verify_password(user.password, existing["password"])
    if not password_boolean:                                                    # verifica se a senha está correta
        raise HTTPException(status_code=403, detail="Credenciais inválidas. Tente novamente.")
    token = create_access_token(existing["username"])                           # cria o token
    return token                                                                # retorna o token
