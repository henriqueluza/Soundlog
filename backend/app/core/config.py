from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str = 'HS256'
    ACCESS_TOKEN_EXPIRES: int = 7

    MONGO_URL: str
    MONGO_DB_NAME: str = 'soundlog'
    MONGO_USERNAME: str
    MONGO_PASSWORD: str

    REDIS_URL : str = 'redis://localhost:6379'

    # Spotify API
    SPOTIFY_CLIENT_ID: str
    SPOTIFY_CLIENT_SECRET: str

    model_config = {
        'env_file': Path(__file__).resolve().parents[3] / '.env',
    }

settings = Settings()