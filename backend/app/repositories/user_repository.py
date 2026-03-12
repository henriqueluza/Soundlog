from app.db.mongodb import get_db

async def find_by_username(username: str):
    db = get_db()
    return await db["users"].find_one({"username": username})

async def find_by_email(email: str):
    db = get_db()
    return await db["users"].find_one({"email": email})

async def find_by_email_or_username(login: str):
    db = get_db()
    return await db["users"].find_one({"$or": [{"username": login}, {"email": login}]})

async def create_user(user_data: dict):
    db = get_db()
    return await db["users"].insert_one(user_data)

