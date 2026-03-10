from fastapi import Response

def hash_password(password: str) -> str:

def verify_password(plain_password : str, hashed_password : str) -> bool:

def create_access_token(username: str) -> str:

def verify_token(token: str):

def set_auth_cookie(response: Response, token: str):

def delete_auth_cookie(response: Response):