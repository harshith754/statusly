from fastapi import APIRouter, Depends, HTTPException, Body
import requests
import os

router = APIRouter(tags=["Admin Users"])

CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

@router.get("/users")
def get_clerk_users():
    response = requests.get(
        "https://api.clerk.com/v1/users",
        headers={"Authorization": f"Bearer {CLERK_SECRET_KEY}"}
    )
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to fetch users from Clerk")

    users = response.json()
    return users

@router.post("/users/{user_id}/orgs")
def update_user_orgs(user_id: str, orgs: list[str] = Body(...)):
    url = f"https://api.clerk.com/v1/users/{user_id}"
    payload = {"public_metadata": {"allowedOrgs": orgs}}
    response = requests.patch(
        url,
        json=payload,
        headers={"Authorization": f"Bearer {CLERK_SECRET_KEY}"}
    )
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Failed to update user orgs in Clerk")
    return response.json()
