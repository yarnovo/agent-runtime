FROM node:24-slim AS builder

WORKDIR /app

# 装 pnpm
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile=false --prod=false

COPY tsconfig.json vitest.config.ts ./
COPY src ./src
RUN pnpm build

FROM node:24-slim AS runtime

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile=false --prod=true

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/server.js"]
