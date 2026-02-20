from fastapi import APIRouter, Depends, HTTPException
from app.db.mongodb import db
from app.models.user import UserResponse
from app.utils import get_current_user, hash_password, verify_passwords

router = APIRouter(prefix="users", tags=["users"])

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

# @router.put()
#
# @router.put()
#
# @router.delete()