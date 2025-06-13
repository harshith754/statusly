from sqlalchemy import Column, String, ForeignKey, Enum, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from app.database import Base
import enum


# ------------------------ ENUMS ------------------------

class OrgServiceStatus(str, enum.Enum):
    Operational = "Operational"
    Degraded = "Degraded Performance"
    Partial = "Partial Outage"
    Major = "Major Outage"

class OrgIncidentStatus(str, enum.Enum):
    Ongoing = "Ongoing"
    Resolved = "Resolved"


# ------------------------ MODELS ------------------------

class Organization(Base):
    __tablename__ = "organizations"

    slug = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)

    services = relationship(
        "OrgService", back_populates="organization", cascade="all, delete-orphan"
    )
    incidents = relationship(
        "OrgIncident", back_populates="organization", cascade="all, delete-orphan"
    )


class OrgService(Base):
    __tablename__ = "org_services"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    status = Column(Enum(OrgServiceStatus), nullable=False)
    org_slug = Column(String, ForeignKey("organizations.slug", ondelete="CASCADE"), nullable=False)

    organization = relationship("Organization", back_populates="services")


class OrgIncident(Base):
    __tablename__ = "org_incidents"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    status = Column(Enum(OrgIncidentStatus), nullable=False)
    affected_services = Column(JSONB, nullable=False)
    org_slug = Column(String, ForeignKey("organizations.slug", ondelete="CASCADE"), nullable=False)

    updates = relationship(
        "IncidentUpdate",
        back_populates="incident",
        cascade="all, delete-orphan",
        passive_deletes=True
    )
    organization = relationship("Organization", back_populates="incidents")


class IncidentUpdate(Base):
    __tablename__ = "incident_updates"

    id = Column(String, primary_key=True)
    timestamp = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    incident_id = Column(String, ForeignKey("org_incidents.id", ondelete="CASCADE"), nullable=False)

    incident = relationship("OrgIncident", back_populates="updates")
