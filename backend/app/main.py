from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from app.api.routers import auth, users, ratings, reviews
from contextlib import asynccontextmanager
from app.db.mongodb import connect_db, close_db
from app.cache.redis import connect_redis, close_redis

@asynccontextmanager
async def lifespan(app: FastAPI):
    await connect_db()
    await connect_redis()
    print("App inicializado")

    yield

    await close_db()
    await close_redis()
    print("App encerrado")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# app.include_router(auth.router, prefix="/auth", tags=["auth"])
# app.include_router(users.router, prefix="/users", tags=["users"])
# app.include_router(ratings.router, prefix="/ratings", tags=["ratings"])
# app.include_router(reviews.router, prefix="/reviews", tags=["reviews"])


@app.get("/")
async def root():
    return {"message": "Hello World"}