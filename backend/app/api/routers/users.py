from fastapi import APIRouter, Depends, HTTPException
from app.db.mongodb import db
from app.models.user import UserResponse, UserPublicResponse, UserUpdate, UserUpdatePassword, UserDelete
from app.utils import get_current_user, hash_password, verify_password

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
        avatar_url=updated_user["avatar_url"],

    )

@router.put("/{username}/password")
async def update_password(username: str, user_data: UserUpdatePassword, current_user: str = Depends(get_current_user)):
    if current_user != username:
        raise HTTPException(status_code=403, detail="Sem permissão.")

    found_user = await db["users"].find_one({"username": username})
    if found_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    if not verify_password(user_data.current_password, found_user["password_hash"]):
        raise HTTPException(status_code=401, detail="Senha atual incorreta.")

    new_hash = hash_password(user_data.new_password)
    await db["users"].update_one({"username": username}, {"$set": {"password_hash": new_hash}})

    return {"detail": "Senha atualizada com sucesso!"}


@router.delete("/{username}")
async def delete_password(username: str, user_data: UserDelete, current_user: str = Depends(get_current_user)):
    if current_user != username:
        raise HTTPException(status_code=403, detail="Sem permissão.")

    found_user = await db["users"].find_one({"username": username})
    if found_user is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")

    if not verify_password(user_data.password, found_user["password_hash"]):
        raise HTTPException(status_code=401, detail="Senha atual incorreta.")

    await db["users"].delete_one({"username": username})

    return {"detail": "Conta apagada. Te vemos na próxima!"}

@router.post("/{username}/follow")
async def follow_user(username: str, current_user: str = Depends(get_current_user)):
    if current_user == username:
        raise HTTPException(status_code=400, detail="Você não pode seguir a si mesmo.")

    found_user = await db["users"].find_one({"username": current_user})
    if username in found_user["following"]:
        raise HTTPException(status_code=400, detail="Você já segue este usuário.")

    await db["users"].update_one(
        {"username": current_user},
        {"$push": {"following": username}}
    )

    await db["users"].update_one(
        {"username": username},
        {"$push": {"followers": current_user}}
    )

    return {"detail": f"Você agora está seguindo {username}!"}

@router.delete("/{username}/follow")
async def unfollow_user(username: str, current_user: str = Depends(get_current_user)):

    if current_user == username:
        raise HTTPException(status_code=400, detail="Você não pode seguir a si mesmo.")

    found_user = await db["users"].find_one({"username": current_user})
    if username not in found_user["following"]:
        raise HTTPException(status_code=400, detail="Você já não segue este usuário.")

    await db["users"].update_one(
        {"username": current_user},
        {"$pull": {"following": username}}
    )

    await db["users"].update_one(
        {"username": username},
        {"$pull": {"followers": current_user}}
    )

    return {"detail": f"Você não está mais seguindo {username}!"}