# AshShow

**High-concurrency ticket booking platform for live events.**  
AshShow is a full-stack concert booking system built around one hard problem: letting many users reserve seats at the same time without double booking.

## Why It Exists

Ticketing systems are race-condition magnets. Two users can click the same seat at nearly the same time, caches can go stale, and slow payment/ticket workflows can block the booking path.

AshShow handles that with:

- Redis locks for temporary seat reservations
- Prisma transactions for final booking consistency
- Redis caching for read-heavy event and seat-map data
- A containerized frontend/backend/Redis setup
- An architecture ready for async workers, CI/CD, and production observability

## Architecture

```text
Next.js Frontend
      |
      | HTTP
      v
Express API
      |
      | Prisma
      v
PostgreSQL / Supabase

Redis
- event/show/seat-map cache
- temporary seat locks
```

Production-oriented extension:

```text
Load Balancer
   |
Frontend + API Containers
   |
   +-- PostgreSQL / RDS
   +-- Redis / ElastiCache
   +-- RabbitMQ -> ticket/email workers
   +-- Prometheus + Grafana + CloudWatch
   +-- GitHub Actions -> ECR/ECS deployment
```

## Core Features

- Event browsing and show details
- Interactive seat map and seat selection
- JWT cookie authentication
- My Tickets page for booked seats
- Maximum 5 seats per booking
- Redis-backed event/show/seat caching
- Redis distributed seat locking
- Atomic Prisma booking transactions
- Cache invalidation after booking
- Docker Compose setup for frontend, backend, and Redis

## Booking Flow

```text
Select seats
   -> lock seats in Redis
   -> verify lock ownership
   -> update AVAILABLE seats to BOOKED in a Prisma transaction
   -> create booking records
   -> invalidate cached event/show/seat data
   -> release temporary locks
```

Redis locks expire after 5 minutes. PostgreSQL remains the source of truth, so even if two users race, only seats still marked `AVAILABLE` can be booked.

## Cache Keys

```text
cache:events
cache:show:<showId>
cache:seats:<showId>
lock:seat:<seatId>
lock:user:<userId>
```

## Tech Stack

**Frontend:** Next.js, React, TypeScript, Tailwind CSS  
**Backend:** Node.js, Express, TypeScript  
**Database:** PostgreSQL, Prisma, Supabase
**Infra:** Redis, Docker, Docker Compose  
**Planned/production layer:** RabbitMQ, Kubernetes/ECS, AWS, GitHub Actions, Prometheus, Grafana

## Run Locally

Create `.env` in the project root:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
```

Start Redis:

```bash
docker compose up redis
```

Start backend:

```bash
cd backend
npm install
npm run dev
```

Start frontend:

```bash
cd ashshow
npm install
npm run dev
```

## Run With Docker

```bash
docker compose up --build
```

| Service | URL |
| --- | --- |
| Frontend | `http://localhost:3000` |
| Backend | `http://localhost:8000` |
| Health | `http://localhost:8000/api/health` |
| Redis | `localhost:6379` |

## Resume Summary

**AshShow - High-Concurrency Distributed Ticketing Platform**

- Built a distributed ticket booking platform with Next.js, Node.js, TypeScript, PostgreSQL, Prisma, Redis, and Docker.
- Prevented double-booking with Redis-based distributed locks and atomic database transactions.
- Added Redis caching and cache invalidation for event, show, and seat-map reads.
- Designed the system for async RabbitMQ pipelines, CI/CD deployment, and production monitoring with Prometheus/Grafana.
