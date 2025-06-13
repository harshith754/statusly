from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db
from app.websocket_manager import manager


router = APIRouter(prefix="/{slug}/services", tags=["Services"])

@router.post("/", response_model=schemas.OrgServiceSchema)
async def add_service(slug: str, payload: schemas.CreateOrgServiceSchema, db: Session = Depends(get_db)):
    org = crud.get_org_by_slug(db, slug)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    service = models.OrgService(**payload.dict(), org_slug=slug)
    result = crud.add_service_to_org(db, service)
    await manager.broadcast("generic_update")
    return result

@router.put("/{service_id}", response_model=schemas.OrgServiceSchema)
async def update_service(slug: str, service_id: str, payload: schemas.UpdateOrgServiceSchema, db: Session = Depends(get_db)):
    service = models.OrgService(**payload.dict(), org_slug=slug)
    result = crud.update_service(db, service)
    await manager.broadcast("generic_update")
    return result

@router.delete("/{service_id}")
async def delete_service(slug: str, service_id: str, db: Session = Depends(get_db)):
    crud.delete_service(db, service_id)
    await manager.broadcast("generic_update")
    return {"detail": "Service deleted"}
