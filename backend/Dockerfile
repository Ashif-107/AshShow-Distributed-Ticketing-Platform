FROM node:20-slim AS builder
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl wget && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --include=dev

COPY prisma ./prisma
COPY tsconfig.json ./
COPY prisma.config.ts ./
COPY src ./src

RUN npx prisma generate
RUN npm run build


FROM node:20-slim AS runner
WORKDIR /app


COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

# Prisma generated client needs to be at the expected relative path
COPY --from=builder /app/src/generated ./dist/src/generated
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./

EXPOSE 8000

CMD sh -c "npx prisma migrate deploy && node dist/src/server.js"