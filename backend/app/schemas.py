from typing import List
from pydantic import BaseModel
from enum import Enum



class OrgServiceStatus(str, Enum):
    Operational = "Operational"
    Degraded = "Degraded Performance"
    Partial = "Partial Outage"
    Major = "Major Outage"

class OrgIncidentStatus(str, Enum):
    Ongoing = "Ongoing"
    Resolved = "Resolved"



class IncidentUpdateSchema(BaseModel):
    id: str
    timestamp: str
    message: str

    class Config:
        orm_mode = True

class OrgServiceSchema(BaseModel):
    id: str
    name: str
    status: OrgServiceStatus

    class Config:
        orm_mode = True

class OrgIncidentSchema(BaseModel):
    id: str
    title: str
    description: str
    status: OrgIncidentStatus
    updates: List[IncidentUpdateSchema] = []
    affected_services: List[str]

    class Config:
        orm_mode = True

class OrganizationSchema(BaseModel):
    slug: str
    name: str
    services: List[OrgServiceSchema] = []
    incidents: List[OrgIncidentSchema] = []

    class Config:
        orm_mode = True



class CreateOrgSchema(BaseModel):
    slug: str
    name: str

    class Config:
        orm_mode = True

class CreateOrgServiceSchema(BaseModel):
    id: str  
    name: str
    status: OrgServiceStatus

    class Config:
        orm_mode = True

class UpdateOrgServiceSchema(CreateOrgServiceSchema):
    pass

class CreateOrgIncidentSchema(BaseModel):
    id: str
    title: str
    description: str
    status: OrgIncidentStatus
    affected_services: List[str]

    class Config:
        orm_mode = True

class UpdateOrgIncidentSchema(CreateOrgIncidentSchema):
    pass

class AddIncidentUpdateSchema(BaseModel):
    id: str
    timestamp: str
    message: str

    class Config:
        orm_mode = True
