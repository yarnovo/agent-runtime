# agent-runtime

阿空 agent runtime · monorepo · 1 daemon app + 11 packages · 极致细分目录架构。

> Phase 0.5 (REQ-011) · monorepo + 11 packages stub · keep PI hello-world working · 后续各 package 真各 phase 真填业务 logic。

---

## 真目录 (架构主图 · 老板 ls 一眼看到)

```
agent-runtime/
├── apps/
│   └── daemon/                              fastify HTTP entry
│       ├── package.json                     @agent-runtime/daemon
│       ├── tsconfig.json
│       ├── vitest.config.ts
│       ├── src/
│       │   ├── server.ts                    fastify 启动 + register routes
│       │   ├── agent.ts                     hardcode SOUL · Phase 0 临时 · 真后续切 packages/core
│       │   ├── llm.ts                       DashScope Model · Phase 0 临时 · 真后续切 packages/llm
│       │   ├── pipeline/                    ⭐ 执行 pipeline · 1 step 1 file (stub)
│       │   │   ├── context.ts               PipelineContext 共享类型
│       │   │   ├── 01-auth.ts               TODO REQ-009 · 真接 packages/auth
│       │   │   ├── 02-tenant-resolve.ts
│       │   │   ├── 03-budget-check.ts       TODO REQ-010 · 真接 packages/budget
│       │   │   ├── 04-session-fetch.ts      TODO · 真接 packages/session
│       │   │   ├── 05-context-load.ts       TODO REQ-001 · 真接 packages/storage
│       │   │   ├── 06-sandbox-prepare.ts    TODO REQ-006 · 真接 packages/sandbox
│       │   │   ├── 07-llm-call.ts           TODO · 真接 packages/llm
│       │   │   └── 08-persist.ts            TODO REQ-002 · 真接 packages/storage
│       │   └── routes/
│       │       ├── chat.ts                  ✅ Phase 0 hello-world · POST /chat (SSE)
│       │       └── admin.ts                 stub · 后续挂 /admin/sandboxes 等
│       └── tests/
│           └── chat.test.ts                 vitest · faux provider · 2 case
│
├── packages/                                11 packages
│   ├── core/                                @agent-runtime/core · PI session 包装
│   │   └── src/
│   │       ├── session.ts
│   │       ├── agent.ts
│   │       └── index.ts
│   ├── auth/                                @agent-runtime/auth · TODO REQ-009 OIDC
│   │   └── src/
│   │       ├── oidc/{client,discovery,pkce}.ts
│   │       ├── cookie/{verify,set}.ts
│   │       ├── jwt/verify.ts
│   │       └── index.ts
│   ├── budget/                              @agent-runtime/budget · TODO REQ-010 token quota
│   │   └── src/
│   │       ├── quota/{token-budget,rate-limit}.ts
│   │       ├── tracking/{cost-track,per-user-meter}.ts
│   │       ├── guard/runaway-guard.ts
│   │       └── index.ts
│   ├── session/                             @agent-runtime/session · session 生命周期
│   │   └── src/
│   │       ├── store/{in-memory,redis}.ts
│   │       ├── lifecycle/{create,resume,delete}.ts
│   │       ├── tree/{fork,rewind}.ts
│   │       └── index.ts
│   ├── llm/                                 @agent-runtime/llm · LLM provider
│   │   └── src/
│   │       ├── providers/{interface,dashscope,openai,claude}.ts
│   │       ├── streaming/{sse,retry}.ts
│   │       ├── registry.ts
│   │       └── index.ts
│   ├── storage/                             @agent-runtime/storage · NAS / OSS / RDS
│   │   └── src/
│   │       ├── nas/{conversation,skill,data}.ts
│   │       ├── oss/{snapshot,avatar,tts-mp3}.ts
│   │       ├── rds/user-meta.ts
│   │       └── index.ts
│   ├── sandbox/                             @agent-runtime/sandbox · TODO REQ-006 warm pool
│   │   └── src/
│   │       ├── pool/{manager,pre-boot,return,health-check}.ts
│   │       ├── adapters/{interface,agentrun,e2b}.ts
│   │       ├── exec/{run-code,run-shell,upload-file,download-file}.ts
│   │       └── index.ts
│   ├── lifecycle/                           @agent-runtime/lifecycle · TODO REQ-008
│   │   └── src/
│   │       ├── ship.ts
│   │       ├── hire.ts
│   │       ├── evolve.ts
│   │       ├── snapshot.ts
│   │       ├── restore.ts
│   │       └── index.ts
│   ├── tools/                               @agent-runtime/tools · agent 内置 / 扩展 tool
│   │   └── src/
│   │       ├── base/{read,write,edit,bash}.ts
│   │       ├── ext/{sandbox-run,nas-read,nas-write,sms-send,sso-resolve}.ts
│   │       └── index.ts
│   ├── observability/                       @agent-runtime/observability · log + trace + cost
│   │   └── src/
│   │       ├── logger/{json,correlation-id}.ts
│   │       ├── tracer/{llm-call,tool-call,sandbox-call}.ts
│   │       ├── cost/{token-cost,runtime-cost}.ts
│   │       └── index.ts
│   └── channel-bridge/                      @agent-runtime/channel-bridge · webhook normalize
│       └── src/
│           ├── webhook/dispatcher.ts
│           ├── adapters/interface.ts
│           └── index.ts
│
├── pnpm-workspace.yaml                      apps/* + packages/*
├── tsconfig.base.json                       共享 compilerOptions
├── tsconfig.json                            root noEmit (workspace 各自 tsconfig)
├── package.json                             root scripts: build / typecheck / test / dev
├── Dockerfile                               2-stage · pnpm workspace 真 build
├── docker-compose.yml
├── issues/                                  仓内 issue · REQ-001..011
└── README.md
```

---

## Quick Start

### 0. 前置

- Node 24+ (推荐用 `nvm use`)
- pnpm 10+ (`corepack enable && corepack prepare pnpm@10.0.0 --activate`)
- Docker 24+ (跑容器时)
- 阿里云 DashScope API Key (https://dashscope.console.aliyun.com/apiKey)

### 1. 装依赖 + 跑 dev

```bash
cp .env.example .env
# 编辑 .env 填 DASHSCOPE_API_KEY

pnpm install
pnpm dev          # 真 tsx watch · 真 hot reload · 走 apps/daemon/src/server.ts
```

### 2. 跑测试 / 类型 / 构建

```bash
pnpm typecheck    # 真 tsc --noEmit · 全 12 workspace
pnpm test         # 真 vitest · daemon 2 case · packages 都 passWithNoTests
pnpm build        # 真 tsc · 全 12 workspace 真出 dist
```

### 3. Docker 跑

```bash
DASHSCOPE_API_KEY=sk-xxx docker compose up --build
# 或
docker build -t agent-runtime:dev .
docker run --rm -p 8080:8080 -e DASHSCOPE_API_KEY=sk-xxx agent-runtime:dev
```

### 4. 调 chat endpoint

```bash
curl -N -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{"msg":"你好"}'
```

预期 SSE 流:

```
event: token
data: {"text":"你"}

event: token
data: {"text":"好"}

event: done
data: {}
```

---

## API

### POST /chat

**Request:** `{ "msg": "你好" }`

**Response:** `text/event-stream`

| event | data | 说明 |
|-------|------|------|
| `token` | `{ "text": "..." }` | 1 chunk 文本增量 |
| `tool_call` | `{ "tool": "X", "args": {...} }` | LLM 发起 tool call (Phase 0 hardcode 无 tool) |
| `tool_result` | `{ "tool": "X", "result": {...}, "isError": false }` | tool 执行结果 |
| `error` | `{ "message": "..." }` | 出错 |
| `done` | `{}` | 流结束 |

### GET /health

返 `{"status":"ok"}` · 给 docker / k8s liveness probe。

### /admin/* (stub · 未挂)

留待 packages/observability + packages/sandbox 接入后真起。

---

## 执行 pipeline (8 step · 1 step 1 file)

```
Auth(REQ-009) → Tenant → Budget(REQ-010) → Session → Context(REQ-001) → Sandbox(REQ-006) → LLM → Persist(REQ-002)
```

每 step 真签名 `(ctx: PipelineContext) => Promise<PipelineContext>` · stub 真直接 pass-through · 真后续按 REQ 真填。

---

## UAT 测试用例 (老板手机自跑)

> 假设 docker compose 已起在 localhost:8080。

### UAT-1 · 健康检查

```bash
curl http://localhost:8080/health
```

期望: `{"status":"ok"}`

### UAT-2 · 1 句对话

```bash
curl -N -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{"msg":"你好"}'
```

期望:
- HTTP 200
- 看到至少 1 个 `event: token`
- 看到 1 个 `event: done`
- 没有 `event: error`

### UAT-3 · 空 msg 拒绝

```bash
curl -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{"msg":""}'
```

期望: HTTP 400 · body 含 schema 错误。

### UAT-4 · 没 API Key 友好失败

```bash
docker run --rm -p 8080:8080 yarnovo/agent-runtime:dev   # 不带 -e DASHSCOPE_API_KEY
```

然后跑 UAT-2 · 期望 SSE 收到 `event: error` (上游 401 / API Key 未设置)。

---

## Phase Roadmap

| Phase | 范围 | 仓内 issue |
|-------|------|------------|
| **0** ✅ | PoC · PI hello-world · hardcode SOUL · in-memory · 本地 docker run | (init) |
| **0.5** ✅ | monorepo + 11 packages stub · pipeline 8 step | REQ-011 |
| 1 | SOUL.md dynamic load · agents/<X>/soul.md | REQ-001 |
| 1 | OIDC client 接 platform-sso · pipeline 01-auth | REQ-009 |
| 1 | per-user token budget · pipeline 03-budget-check | REQ-010 |
| 2 | NAS 持久 conversation history | REQ-002 |
| 2.5 | ECS deploy + 自定义域名 | REQ-003 |
| 3 | ~~multi-agent routing~~ (砍 · 1 ECS 1 agent) | REQ-004 (dropped) |
| 4 | multi-channel webhook (iLink BOT 1st) | REQ-005 |
| 5 | sandbox 集成 · warm pool short-lived | REQ-006 |
| 6 | self-modify · LLM 写 skill (NAS) | REQ-007 |
| 7 | snapshot / rollback (lifecycle 5 stage) | REQ-008 |

---

## 不做 (Phase 0.5 本 PR · 留 follow-up REQ)

- ❌ 真 implement business logic (留 REQ-001 / 009 / 010 等真各自 task)
- ❌ channel-h5 (单独仓 / 单独 task)
- ❌ agents/X soul/hermes/tools (单独 task)
- ❌ ECS deploy (REQ-003)
