# Statusly

A modern status and incident tracking platform for organizations.

---

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Clerk (authentication), shadcn/ui, Redux Toolkit
- **Backend:** FastAPI, SQLAlchemy, Alembic, PostgreSQL, WebSockets
- **Other:** Clerk API, WebSocket real-time updates, Docker (optional), Netlify/Render deployment

---

## Features

- **Real-Time Live Updates:**
  - Uses WebSockets for instant, live updates across all connected clients. Any change to incidents, services, or organizations is broadcast in real time—no need to refresh.
  - Supports multiple clients viewing and editing data simultaneously, with all changes reflected instantly.

- **User Management Panel:**
  - Admins can view all users, see their email and allowed organizations, and update which organizations a user can access.
  - Provides/revokes access to certain users by updating their allowed organizations in Clerk's public metadata.

- **Authentication with Clerk:**
  - Uses Clerk for secure authentication, supporting both email and username/password login.
  - Clerk integration provides robust user management, session handling, and easy integration with frontend components.

- **Organization, Service, and Incident Management:**
  - Create, edit, and delete organizations, services, and incidents.
  - Assign incidents to one or more services and track their status (Ongoing, Resolved, etc.).

- **Incident Timeline:**
  - Each incident has a timeline of updates, showing the full history of status changes and messages.
  - Timeline UI is built with shadcn/ui for a modern, accessible look.

- **Frontend-Backend Synchronization:**
  - Uses Redux Toolkit and Redux Thunks for state management and async actions.
  - All backend changes (via REST or WebSocket) are synchronized to the frontend state, ensuring all users see the latest data.

- **Modern UI/UX:**
  - Built with shadcn/ui and Tailwind CSS for a beautiful, responsive, and accessible interface.
  - Timeline, cards, modals, and forms all use shadcn/ui components for consistency.

- **Database Migrations:**
  - Uses Alembic for safe, versioned database schema migrations.

- **Secure Environment Handling:**
  - All secrets and sensitive config are managed via environment variables and .env files (never committed to git).

- **Multi-Client Support:**
  - Designed for organizations with multiple users and clients, supporting concurrent access and updates.

---

## Setup Instructions

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (local or cloud)

### Backend (FastAPI)

1. **Clone the repo and enter the backend folder:**
   ```powershell
   cd backend
   ```
2. **Create and activate a virtual environment:**
   ```powershell
   python -m venv env
   .\env\Scripts\activate
   ```
3. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```
4. **Configure environment variables:**
   - Create a `.env` file in `backend/` with:
     ```env
     DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
     CLERK_SECRET_KEY=sk_test_...
     ```
5. **Run Alembic migrations:**
   ```powershell
   alembic upgrade head
   ```
6. **Start the FastAPI server:**
   ```powershell
   uvicorn main:app --reload
   ```

### Frontend (React)

1. **Enter the frontend folder:**
   ```powershell
   cd frontend
   ```
2. **Install dependencies:**
   ```powershell
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file in `frontend/` with:
     ```env
     VITE_API_URL=http://localhost:8000/api
     VITE_WS_URL=ws://localhost:8000/ws
     VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
     ```
4. **Start the frontend dev server:**
   ```powershell
   npm run dev
   ```

---

## Deployment
- Set environment variables in your deployment platform (Netlify, Render, etc.)
- Use `wss://` for `VITE_WS_URL` in production
- Make sure CORS and allowed origins are set correctly in FastAPI

---

## License
MIT
