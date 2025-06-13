from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db
from app.websocket_manager import manager

router = APIRouter(prefix="/{slug}/incidents", tags=["Incidents"])

@router.post("/", response_model=schemas.OrgIncidentSchema)
async def add_incident(slug: str, payload: schemas.CreateOrgIncidentSchema, db: Session = Depends(get_db)):
    org = crud.get_org_by_slug(db, slug)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    incident = models.OrgIncident(**payload.dict(), org_slug=slug)
    result = crud.add_incident_to_org(db, incident)
    await manager.broadcast("generic_update")
    return result

@router.put("/{incident_id}", response_model=schemas.OrgIncidentSchema)
async def update_incident(slug: str, incident_id: str, payload: schemas.UpdateOrgIncidentSchema, db: Session = Depends(get_db)):
    incident = models.OrgIncident(**payload.dict(), org_slug=slug)
    result = crud.update_incident(db, incident)
    await manager.broadcast("generic_update")
    return result

@router.delete("/{incident_id}")
async def delete_incident(slug: str, incident_id: str, db: Session = Depends(get_db)):
    crud.delete_incident(db, incident_id)
    await manager.broadcast("generic_update")
    return {"detail": "Incident deleted"}
