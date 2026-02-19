import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="soundlog",
    version="0.1.0",
    description="API do Soundlog - plataforma social de música"
)