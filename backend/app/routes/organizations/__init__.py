from fastapi import APIRouter

from .base import router as base_router
from .services import router as services_router
from .incidents import router as incidents_router
from .incident_updates import router as updates_router

router = APIRouter()
router.include_router(base_router)
router.include_router(services_router)
router.include_router(incidents_router)
router.include_router(updates_router)
