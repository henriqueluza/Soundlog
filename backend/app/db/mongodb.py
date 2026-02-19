import motor.motor_asyncio
from dotenv import load_dotenv
from pathlib import Path
import os

load_dotenv("/Users/henriqueluza/Coding/Projeto Soundlog/.env")

url = os.getenv("MONGO_URL")
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