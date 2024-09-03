from fastapi import FastAPI
from routers.image_router import ImageRouter

app = FastAPI()
app.include_router(ImageRouter)
