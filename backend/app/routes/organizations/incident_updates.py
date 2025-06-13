from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db
from app.websocket_manager import manager


router = APIRouter(prefix="/{slug}/incidents/{incident_id}/updates", tags=["Incident Updates"])

@router.post("/", response_model=schemas.IncidentUpdateSchema)
async def add_update(slug: str, incident_id: str, payload: schemas.AddIncidentUpdateSchema, db: Session = Depends(get_db)):
    update = models.IncidentUpdate(**payload.dict(), incident_id=incident_id)
    result = crud.add_incident_update(db, update)
    await manager.broadcast("generic_update")
    return result
