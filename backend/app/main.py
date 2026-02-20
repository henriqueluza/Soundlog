import os
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.db.mongodb import connect_db, close_db
from app.cache.redis import connect_redis, close_redis
from app.api.routers.auth import router as auth_router
from app.utils import get_current_user
from app.api.routers.users import router as users_router


@asynccontextmanager
async def lifespan(app):
    await connect_db()
    await connect_redis()
    yield
    await close_db()
    await close_redis()

app = FastAPI(
    lifespan=lifespan,
    title="soundlog",
    version="0.1.0",
    description="API do Soundlog - plataforma social de música"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

app.include_router(users_router)

@app.get("/health")
def get_health():
    return {"status": "ok"}

