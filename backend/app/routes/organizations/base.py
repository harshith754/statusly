from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.database import get_db
from typing import List
from app.schemas import OrganizationSchema

router = APIRouter()
@router.get("/", response_model=List[OrganizationSchema])
def get_organizations(db: Session = Depends(get_db)):
    return crud.get_all_organizations(db)

@router.post("/", response_model=schemas.OrganizationSchema)
def create_organization(payload: schemas.CreateOrgSchema, db: Session = Depends(get_db)):
    org = models.Organization(**payload.dict())
    return crud.create_organization(db, org)
