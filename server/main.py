from fastapi import FastAPI
from routers.image_router import ImageRouter
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
app.include_router(ImageRouter)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
