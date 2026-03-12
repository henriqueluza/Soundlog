from fastapi import APIRouter, Response
from app.models.user import UserResponse, UserRegister, UserLogin
from app.services import auth_service

from backend.app.core.security import set_auth_cookie

router = APIRouter(prefix="/auth", tags=["auth"]) # tags agrupo as rotas no swagger

@router.post('/register', status_code=201)
async def register(user : UserRegister):
    await auth_service.register(user)
    return {"message": "Conta criada com sucesso"}

@router.post('/login', status_code=200)
async def login(user: UserLogin, response: Response):
    token = await auth_service.login(user)
    set_auth_cookie(response, token)
    return {"message": "Login feito com sucesso"}

@router.post('/logout')
async def logout():


@router.get('/me')
async def me(user : UserResponse):
    return {"username": user.username}
