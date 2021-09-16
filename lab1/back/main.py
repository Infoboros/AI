from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from router import router

app = FastAPI(
    title='Лабораторная работа №1',
    description="Метод отжига",
    version="0.0.1"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins='*',
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(router, prefix="/solution", tags=["Решение"])
