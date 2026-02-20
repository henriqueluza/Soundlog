from fastapi import APIRouter, Depends, HTTPException
from app.db.mongodb import db
from app.models.user import UserResponse, UserPublicResponse
from app.utils import get_current_user, hash_password, verify_password, UserUpdate
from fastapi.security import OAuth2PasswordBearer

from backend.app.utils import oauth2_scheme

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/{username}/profile")
async def get_profile(username: str):
    existing_user = await db.users.find_one({"username": username})
    if existing_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return UserPublicResponse(
        username=existing_user["username"],
        followers=existing_user["followers"],
        following=existing_user["following"],
        favorite_genres=existing_user["favorite_genres"],
        created_at=existing_user["created_at"],
    )

@router.put("/{username}")
async def update_profile(username: str, user_data: UserUpdate, current_user: str = Depends(get_current_user)):
    if current_user != username:
        raise HTTPException(status_code=403, detail="Sem permissão.")

    update_fields = {k: v for k, v in user_data.model_dump().items() if v is not None}

    if not update_fields:
        raise HTTPException(status_code=400, detail="Nenhum campo para atualizar.")

    await db["users"].update_one({"username": username}, {"$set": update_fields})

    updated_user = await db["users"].find_one({"username": username})

    return UserResponse(
        username=updated_user["username"],
        email=updated_user["email"],
        followers=updated_user["followers"],
        following=updated_user["following"],
        favorite_genres=updated_user["favorite_genres"],
        created_at=updated_user["created_at"],

    )

# @router.put()
#
# @router.delete()