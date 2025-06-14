from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db
from typing import List
from app.schemas import OrganizationSchema
from app.websocket_manager import manager


router = APIRouter()

@router.get("/", response_model=List[OrganizationSchema])
def get_organizations(db: Session = Depends(get_db)):
    return crud.get_all_organizations(db)

@router.post("/", response_model=schemas.OrganizationSchema)
async def create_organization(payload: schemas.CreateOrgSchema, db: Session = Depends(get_db)):
    org = models.Organization(**payload.dict())
    result = crud.create_organization(db, org)
    await manager.broadcast("generic_update")
    return result

@router.put("/{slug}", response_model=schemas.OrganizationSchema)
async def update_organization(slug: str, payload: schemas.CreateOrgSchema, db: Session = Depends(get_db)):
    result = crud.get_org_by_slug(db, slug,payload)
    await manager.broadcast("generic_update")
    return result

@router.delete("/{slug}", status_code=204)
async def delete_organization(slug: str, db: Session = Depends(get_db)):
    crud.delete_organization(db, slug)
    await manager.broadcast("generic_update")
    return None
