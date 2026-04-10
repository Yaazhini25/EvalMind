from fastapi import FastAPI
from app.routes.interview import router as interview_router

app = FastAPI()

app.include_router(interview_router)

@app.get("/")
def home():
    return {"message": "Backend is running successfully"}