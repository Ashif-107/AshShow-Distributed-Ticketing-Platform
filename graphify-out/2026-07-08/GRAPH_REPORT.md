# Graph Report - Distributed Ticketing Platform  (2026-07-08)

## Corpus Check
- 65 files · ~40,431 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 978 nodes · 1087 edges · 33 communities (17 shown, 16 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ae560201`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- prismaNamespace.ts
- Show.ts
- Booking.ts
- Seat.ts
- User.ts
- Event.ts
- api.ts
- commonInputTypes.ts
- app.ts
- auth.route.ts
- dependencies
- devDependencies
- compilerOptions
- PrismaClient
- BookingDelegate
- EventDelegate
- SeatDelegate
- ShowDelegate
- UserDelegate
- compilerOptions
- Prisma__BookingClient
- Prisma__ShowClient
- Prisma__SeatClient
- Prisma__EventClient
- Prisma__UserClient
- booking.dto.ts
- eslint.config.mjs
- next.config.ts
- next-env.d.ts
- postcss.config.mjs
- booking.schema.ts
- booking.controller.ts

## God Nodes (most connected - your core abstractions)
1. `BookingDelegate` - 18 edges
2. `EventDelegate` - 18 edges
3. `SeatDelegate` - 18 edges
4. `ShowDelegate` - 18 edges
5. `UserDelegate` - 18 edges
6. `compilerOptions` - 16 edges
7. `PrismaClient` - 15 edges
8. `useAuth()` - 9 edges
9. `compilerOptions` - 8 edges
10. `getOrSet()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `BookPage()` --calls--> `getEvents()`  [EXTRACTED]
  ashshow/src/app/book/page.tsx → ashshow/lib/api.ts
- `Home()` --calls--> `getEvents()`  [EXTRACTED]
  ashshow/src/app/page.tsx → ashshow/lib/api.ts
- `LoginPage()` --calls--> `useAuth()`  [EXTRACTED]
  ashshow/src/app/login/page.tsx → ashshow/src/context/AuthContext.tsx
- `Page()` --calls--> `useAuth()`  [EXTRACTED]
  ashshow/src/app/profile/page.tsx → ashshow/src/context/AuthContext.tsx
- `SignupPage()` --calls--> `useAuth()`  [EXTRACTED]
  ashshow/src/app/signup/page.tsx → ashshow/src/context/AuthContext.tsx

## Import Cycles
- 3-file cycle: `backend/src/generated/prisma/commonInputTypes.ts -> backend/src/generated/prisma/internal/prismaNamespace.ts -> backend/src/generated/prisma/models.ts -> backend/src/generated/prisma/commonInputTypes.ts`
- 3-file cycle: `backend/src/generated/prisma/internal/prismaNamespace.ts -> backend/src/generated/prisma/models.ts -> backend/src/generated/prisma/models/Booking.ts -> backend/src/generated/prisma/internal/prismaNamespace.ts`
- 3-file cycle: `backend/src/generated/prisma/internal/prismaNamespace.ts -> backend/src/generated/prisma/models.ts -> backend/src/generated/prisma/models/Event.ts -> backend/src/generated/prisma/internal/prismaNamespace.ts`
- 3-file cycle: `backend/src/generated/prisma/internal/prismaNamespace.ts -> backend/src/generated/prisma/models.ts -> backend/src/generated/prisma/models/Seat.ts -> backend/src/generated/prisma/internal/prismaNamespace.ts`
- 3-file cycle: `backend/src/generated/prisma/internal/prismaNamespace.ts -> backend/src/generated/prisma/models.ts -> backend/src/generated/prisma/models/Show.ts -> backend/src/generated/prisma/internal/prismaNamespace.ts`
- 3-file cycle: `backend/src/generated/prisma/internal/prismaNamespace.ts -> backend/src/generated/prisma/models.ts -> backend/src/generated/prisma/models/User.ts -> backend/src/generated/prisma/internal/prismaNamespace.ts`

## Communities (33 total, 16 thin omitted)

### Community 0 - "prismaNamespace.ts"
Cohesion: 0.02
Nodes (106): Args, At, AtLeast, AtLoose, AtStrict, BatchPayload, BookingScalarFieldEnum, Boolean (+98 more)

### Community 1 - "Show.ts"
Cohesion: 0.02
Nodes (106): AggregateShow, GetShowAggregateType, GetShowGroupByPayload, IntFieldUpdateOperationsInput, Show$bookingsArgs, Show$seatsArgs, ShowAggregateArgs, ShowAvgAggregateInputType (+98 more)

### Community 2 - "Booking.ts"
Cohesion: 0.02
Nodes (100): AggregateBooking, BookingAggregateArgs, BookingCountAggregateInputType, BookingCountAggregateOutputType, BookingCountArgs, BookingCountOrderByAggregateInput, BookingCreateArgs, BookingCreateInput (+92 more)

### Community 3 - "Seat.ts"
Cohesion: 0.02
Nodes (86): AggregateSeat, EnumSeatStatusFieldUpdateOperationsInput, GetSeatAggregateType, GetSeatGroupByPayload, Seat$bookingArgs, SeatAggregateArgs, SeatCountAggregateInputType, SeatCountAggregateOutputType (+78 more)

### Community 4 - "User.ts"
Cohesion: 0.03
Nodes (72): AggregateUser, DateTimeFieldUpdateOperationsInput, GetUserAggregateType, GetUserGroupByPayload, StringFieldUpdateOperationsInput, User$bookingsArgs, UserAggregateArgs, UserCountAggregateInputType (+64 more)

### Community 5 - "Event.ts"
Cohesion: 0.03
Nodes (71): AggregateEvent, Event$showsArgs, EventAggregateArgs, EventCountAggregateInputType, EventCountAggregateOutputType, EventCountArgs, EventCountOrderByAggregateInput, EventCountOutputType (+63 more)

### Community 6 - "api.ts"
Cohesion: 0.06
Nodes (39): bookSeats(), confirmBooking(), getEvent(), getEvents(), getMe(), getSeats(), getShow(), getTickets() (+31 more)

### Community 7 - "commonInputTypes.ts"
Cohesion: 0.04
Nodes (41): Booking, $Enums, Event, Seat, Show, User, DateTimeFilter, DateTimeWithAggregatesFilter (+33 more)

### Community 8 - "app.ts"
Cohesion: 0.07
Nodes (29): events, allowedOrigins, app, getEvent(), getEvents(), getSeats(), getShow(), Booking (+21 more)

### Community 9 - "auth.route.ts"
Cohesion: 0.13
Nodes (22): getMe(), login(), logout(), signup(), AuthResponse, UserResponse, authenticate(), Express (+14 more)

### Community 10 - "dependencies"
Cohesion: 0.05
Nodes (38): author, dependencies, bcrypt, cookie-parser, cors, dotenv, express, express-rate-limit (+30 more)

### Community 11 - "devDependencies"
Cohesion: 0.09
Nodes (21): dependencies, next, react, react-dom, devDependencies, eslint, eslint-config-next, tailwindcss (+13 more)

### Community 12 - "compilerOptions"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 13 - "PrismaClient"
Cohesion: 0.10
Nodes (4): config, LogOptions, PrismaClient, PrismaClientConstructor

### Community 19 - "compilerOptions"
Cohesion: 0.22
Nodes (8): compilerOptions, esModuleInterop, module, outDir, rootDir, skipLibCheck, strict, target

### Community 32 - "booking.controller.ts"
Cohesion: 0.42
Nodes (8): bookSeats(), confirmBooking(), getTickets(), lockSeatsHandler(), unlockSeatsHandler(), lockSeats(), unlockSeats(), verifyLock()

## Knowledge Gaps
- **700 isolated node(s):** `name`, `version`, `description`, `main`, `dev` (+695 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `BookingDelegate` connect `BookingDelegate` to `Booking.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `EventDelegate` connect `EventDelegate` to `Event.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `SeatDelegate` connect `SeatDelegate` to `Seat.ts`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **What connects `name`, `version`, `description` to the rest of the system?**
  _701 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `prismaNamespace.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.018691588785046728 - nodes in this community are weakly interconnected._
- **Should `Show.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.018691588785046728 - nodes in this community are weakly interconnected._
- **Should `Booking.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.019801980198019802 - nodes in this community are weakly interconnected._