FROM oven/bun:1-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=5173

COPY --from=builder /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY server.mjs ./

EXPOSE 5173

CMD ["bun", "run", "server.mjs"]
