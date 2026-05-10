FROM node:24-slim AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# 装依赖 (workspace: apps/daemon + cli)
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/daemon/package.json ./apps/daemon/
COPY cli/package.json ./cli/

RUN pnpm install --frozen-lockfile=false --prod=false

# 复制源码 + build
COPY tsconfig.base.json tsconfig.json ./
COPY apps/daemon ./apps/daemon
COPY cli ./cli

RUN pnpm --filter @agent-runtime/daemon build

FROM node:24-slim AS runtime

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/daemon/package.json ./apps/daemon/
COPY cli/package.json ./cli/

RUN pnpm install --frozen-lockfile=false --prod=true

# 复制 daemon dist + cli source (cli 真 tsx 跑 · 不 build)
COPY --from=builder /app/apps/daemon/dist ./apps/daemon/dist
COPY --from=builder /app/cli ./cli

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

WORKDIR /app/apps/daemon
CMD ["node", "dist/server.js"]
