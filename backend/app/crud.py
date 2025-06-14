from sqlalchemy.orm import Session
from app import models

def get_all_organizations(db: Session):
    return db.query(models.Organization).all()

def create_organization(db: Session, org: models.Organization):
    db.add(org)
    db.commit()
    db.refresh(org)
    return org

def get_org_by_slug(db: Session, slug: str):
    return db.query(models.Organization).filter(models.Organization.slug == slug).first()

def add_service_to_org(db: Session, service: models.OrgService):
    db.add(service)
    db.commit()
    db.refresh(service)
    return service

def update_service(db: Session, service: models.OrgService):
    db.merge(service)
    db.commit()
    return service

def delete_service(db: Session, service_id: str):
    db.query(models.OrgService).filter(models.OrgService.id == service_id).delete()
    db.commit()

def add_incident_to_org(db: Session, incident: models.OrgIncident):
    db.add(incident)
    db.commit()
    db.refresh(incident)
    return incident

def update_incident(db: Session, incident: models.OrgIncident):
    db.merge(incident)
    db.commit()
    return incident

def delete_incident(db: Session, incident_id: str):
    db.query(models.OrgIncident).filter(models.OrgIncident.id == incident_id).delete()
    db.commit()

def add_incident_update(db: Session, update: models.IncidentUpdate):
    db.add(update)
    db.commit()
    db.refresh(update)
    return update

def update_organization(db: Session, slug: str, payload):
    org = get_org_by_slug(db, slug)
    if not org:
        return None
    org.name = payload.name
    org.slug = payload.slug
    db.commit()
    db.refresh(org)
    return org

def delete_organization(db: Session, slug: str):
    org = get_org_by_slug(db, slug)
    if org:
        db.delete(org)
        db.commit()

def seed_demo_data(db: Session):
    if db.query(Organization).filter_by(slug="demo-org").first():
        return {"message": "Demo data already exists."}

    org = Organization(
        slug="demo-org",
        name="Demo Org"
    )

    services = [
        OrgService(id="1", name="API Gateway", status=OrgServiceStatus.Operational, organization=org),
        OrgService(id="2", name="Database", status=OrgServiceStatus.Degraded, organization=org),
        OrgService(id="3", name="Frontend", status=OrgServiceStatus.Operational, organization=org),
        OrgService(id="4", name="Auth", status=OrgServiceStatus.Major, organization=org),
        OrgService(id="5", name="Email", status=OrgServiceStatus.Operational, organization=org),
    ]

    incident = OrgIncident(
        id="inc1",
        title="Database Outage",
        description="Database is currently unreachable.",
        status=OrgIncidentStatus.Ongoing,
        affected_services=["2"],
        organization=org,
    )

    update = IncidentUpdate(
        id="u1",
        timestamp="2024-01-01T12:00:00Z",
        message="Investigating the issue.",
        incident=incident,
    )

    db.add(org)
    db.add_all(services)
    db.add(incident)
    db.add(update)
    db.commit()
    return {"message": "Demo data seeded successfully."}
