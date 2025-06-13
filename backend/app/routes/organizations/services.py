from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db

router = APIRouter(prefix="/{slug}/services", tags=["Services"])

@router.post("/", response_model=schemas.OrgServiceSchema)
def add_service(slug: str, payload: schemas.CreateOrgServiceSchema, db: Session = Depends(get_db)):
    org = crud.get_org_by_slug(db, slug)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    service = models.OrgService(**payload.dict(), org_slug=slug)
    return crud.add_service_to_org(db, service)

@router.put("/{service_id}", response_model=schemas.OrgServiceSchema)
def update_service(slug: str, service_id: str, payload: schemas.UpdateOrgServiceSchema, db: Session = Depends(get_db)):
    service = models.OrgService(**payload.dict(), org_slug=slug)
    return crud.update_service(db, service)

@router.delete("/{service_id}")
def delete_service(slug: str, service_id: str, db: Session = Depends(get_db)):
    crud.delete_service(db, service_id)
    return {"detail": "Service deleted"}
