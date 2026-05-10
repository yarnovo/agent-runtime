FROM node:24-slim AS builder

WORKDIR /app

# 装 pnpm
RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# 真先装依赖 (走 monorepo workspace · 真按 pnpm-workspace.yaml)
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/daemon/package.json ./apps/daemon/
COPY packages/auth/package.json ./packages/auth/
COPY packages/budget/package.json ./packages/budget/
COPY packages/channel-bridge/package.json ./packages/channel-bridge/
COPY packages/core/package.json ./packages/core/
COPY packages/lifecycle/package.json ./packages/lifecycle/
COPY packages/llm/package.json ./packages/llm/
COPY packages/observability/package.json ./packages/observability/
COPY packages/sandbox/package.json ./packages/sandbox/
COPY packages/session/package.json ./packages/session/
COPY packages/storage/package.json ./packages/storage/
COPY packages/tools/package.json ./packages/tools/

RUN pnpm install --frozen-lockfile=false --prod=false

# 真复制源码
COPY tsconfig.base.json tsconfig.json ./
COPY apps/daemon ./apps/daemon
COPY packages ./packages

# 真 build (pnpm -r build · 真各 package + daemon 全 tsc)
RUN pnpm build

FROM node:24-slim AS runtime

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.0.0 --activate

# runtime 真只装 daemon prod 依赖
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./
COPY apps/daemon/package.json ./apps/daemon/
COPY packages/auth/package.json ./packages/auth/
COPY packages/budget/package.json ./packages/budget/
COPY packages/channel-bridge/package.json ./packages/channel-bridge/
COPY packages/core/package.json ./packages/core/
COPY packages/lifecycle/package.json ./packages/lifecycle/
COPY packages/llm/package.json ./packages/llm/
COPY packages/observability/package.json ./packages/observability/
COPY packages/sandbox/package.json ./packages/sandbox/
COPY packages/session/package.json ./packages/session/
COPY packages/storage/package.json ./packages/storage/
COPY packages/tools/package.json ./packages/tools/

RUN pnpm install --frozen-lockfile=false --prod=true

# 真复制 build 出来的 daemon dist + packages 真 source (workspace deps 真按 src 解析)
COPY --from=builder /app/apps/daemon/dist ./apps/daemon/dist
COPY --from=builder /app/packages ./packages

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

WORKDIR /app/apps/daemon
CMD ["node", "dist/server.js"]
