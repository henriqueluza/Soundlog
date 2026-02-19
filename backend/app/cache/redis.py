import os
import redis.asyncio

from dotenv import load_dotenv
from pathlib import Path
import os

load_dotenv("/Users/henriqueluza/Coding/Projeto Soundlog/.env")

url = os.getenv("REDIS_URL")

client = redis.asyncio.from_url(url)

async def connect_redis():
    try:
        print("Conectado ao Redis")
    except Exception as e:
        print(f"Erro ao conectar: {e}")

async def close_redis():
    try:
        client.close()
        print("Conexão encerrada com sucesso")
    except Exception as e:
        print(f"Erro ao desconectar: {e}")