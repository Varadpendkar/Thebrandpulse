from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import contact, leads, chat

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="High-performance backend for BrandPulse agency"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(contact.router, prefix=settings.API_PREFIX, tags=["Contact"])
app.include_router(leads.router, prefix=settings.API_PREFIX, tags=["Leads"])
app.include_router(chat.router, prefix=settings.API_PREFIX, tags=["Chat"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "app": "BrandPulse API", "version": settings.VERSION}

@app.get("/")
async def root():
    return {
        "message": "BrandPulse API is operational",
        "documentation": "/docs"
    }
