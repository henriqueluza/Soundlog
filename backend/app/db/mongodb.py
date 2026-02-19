import motor.motor_asyncio
import os

url = os.getenv("MONGODB_URL")
name = os.getenv("MONGO_DB_NAME")

client = motor.motor_asyncio.AsyncIOMotorClient(url)

db = client[name]

async def connect_db():
    try:
        print("Conectado ao MongoDB")
    except Exception as e:
        print(f"Erro ao conectar: {e}")

async def close_db():
    try:
        client.close()
        print("Conexão com MongoDB encerrada")
    except Exception as e:
        print(f"Erro ao desconectar: {e}")