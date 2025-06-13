from fastapi import FastAPI
from app.database import Base, engine
from app.routes import organizations_router
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(organizations_router, prefix="/api/organizations", tags=["Organizations"])

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://statusly.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] for all, but not recommended in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
