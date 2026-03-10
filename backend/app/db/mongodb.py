from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client: AsyncIOMotorClient = None
db = None

async def connect_db():
    global client, db
    client = AsyncIOMotorClient(settings.MONGO_URL)
    db = client[settings.MONGO_DB_NAME]
    print("Conectado ao MongoDB")

async def close_db():
    client.close()
    print("Conexão MongoDB encerrada")

def get_db():
    return db