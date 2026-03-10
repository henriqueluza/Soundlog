import redis.asyncio as redis
from app.core.config import settings

redis_client: redis.Redis = None

async def connect_redis():
    global redis_client
    redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)
    print("Conectado ao Redis")


async def close_redis():
    await redis_client.aclose()
    print("Fechando conexão com Redis")


def get_redis():
    return redis_client
