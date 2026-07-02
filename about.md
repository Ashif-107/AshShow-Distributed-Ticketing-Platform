# Project: Distributed Flash-Sale Event Ticketing Platform

## Tech Stack
- Frontend: Next.js (App Router)
- Backend: Express + TypeScript
- DB: PostgreSQL + Prisma
- Auth: JWT (HttpOnly cookies)
- Planned: Redis, RabbitMQ, WebSockets, Docker, K8s, Prometheus/Grafana

## Current Phase
Phase 1 — Basic Booking System (in progress)

## Completed
- Project scaffolded (Next.js + Express + Prisma)
- DB schema defined (User, Event, Show, Seat, Booking)
- Supabase PostgreSQL connected
- Events listing page (/book) — neobrutalism UI
- Event detail page (/book/[eventId]) — lists shows
- Show detail page (/book/[eventId]/[showId]) — seat grid
- Seats API: GET /shows/:showId/seats → { rows: [...] }
- Neobrutalism theme applied across all pages
- Seat selection interactivity (multi-select, summary, confirm button)
- User Authentication with middleware and security measures done

## Currently Working On
- Booking endpoint (POST /bookings)

## Key Decisions Made
- JWT stored in HttpOnly cookies (not localStorage)
- bcrypt for password hashing (12 rounds)
- Seat data returned grouped by rows from backend
- express-rate-limit for auth endpoints (10 req/15 min)
- helmet for security headers
- Zod for request validation

## Open / Known Issues
- Seat sorting fixed (numeric sort within each row)

## Next Steps
6. Connect Confirm Booking → POST /bookings
7. Build My Tickets page

## Architecture
Frontend (Next.js) ←→ Backend (Express :8000) ←→ PostgreSQL (Supabase)