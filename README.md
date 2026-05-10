# agent-runtime

阿空 agent runtime · 跑在 ECS+Docker 的 agent daemon · 走 [@earendil-works/pi-*](https://github.com/badlogic/pi-mono) 框架 (PI · Armin Ronacher 出 · `@mariozechner/pi-*` 已迁名 `@earendil-works/pi-*`)。

> Phase 0 PoC · 只跑通 PI hello-world 1 句对话 · 后续 phase 见底部 roadmap。

---

## Quick Start

### 0. 前置

- Node 24+ (推荐用 `nvm use`)
- pnpm 10+ (`corepack enable && corepack prepare pnpm@10.0.0 --activate`)
- Docker 24+ (跑容器时)
- 阿里云 DashScope API Key (https://dashscope.console.aliyun.com/apiKey)

### 1. 本地起 dev server

```bash
cp .env.example .env
# 编辑 .env 填 DASHSCOPE_API_KEY

pnpm install
pnpm dev          # tsx watch · 自动 reload
```

### 2. 跑测试

```bash
pnpm test         # vitest · 用 faux provider · 不真打 API
pnpm typecheck    # tsc --noEmit
```

### 3. Docker 跑

```bash
# 用 docker-compose (推荐)
DASHSCOPE_API_KEY=sk-xxx docker compose up --build

# 或纯 docker
docker build -t agent-runtime:dev .
docker run --rm -p 8080:8080 -e DASHSCOPE_API_KEY=sk-xxx agent-runtime:dev
```

### 4. 调 chat endpoint

```bash
curl -N -X POST http://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{"msg":"你好"}'
```

预期看到 SSE 流:

```
event: token
data: {"text":"你"}

event: token
data: {"text":"好"}

event: done
data: {}
```

---

## 架构 (Phase 0)

```
                    POST /chat (SSE)
                          |
                          v
                  +---------------+
                  |  fastify HTTP |
                  |  (server.ts)  |
                  +---------------+
                          |
                          v
                  +---------------+
                  | Agent (PI)    |
                  | hardcode SOUL |
                  | (agent.ts)    |
                  +---------------+
                          |
                          v
                  +---------------+
                  | dashscope     |
                  | (llm.ts)      |
                  | OpenAI compat |
                  +---------------+
                          |
                          v
                  https://dashscope.aliyuncs.com/compatible-mode/v1
```

| 文件 | 职责 |
|------|------|
| `src/server.ts` | fastify 启动 + register routes + /health |
| `src/agent.ts` | hardcode SOUL · 创建 PI Agent 实例 |
| `src/llm.ts` | 构造 DashScope OpenAI-compat Model |
| `src/routes/chat.ts` | POST /chat · subscribe agent events · 转 SSE |
| `tests/chat.test.ts` | e2e · faux provider · 不打真 API |

---

## API

### POST /chat

**Request:**
```json
{ "msg": "你好" }
```

**Response:** `text/event-stream`

| event | data | 说明 |
|-------|------|------|
| `token` | `{ "text": "..." }` | 1 chunk 文本增量 |
| `tool_call` | `{ "tool": "X", "args": {...} }` | LLM 发起 tool call (Phase 0 hardcode 无 tool · 永不触发) |
| `tool_result` | `{ "tool": "X", "result": {...}, "isError": false }` | tool 执行结果 |
| `error` | `{ "message": "..." }` | 出错 |
| `done` | `{}` | 流结束 |

### GET /health

返 `{"status":"ok"}` · 给 docker / k8s liveness probe。

---

## UAT 测试用例 (老板手机自跑)

> 假设 docker compose 已起在 localhost:8080。

### UAT-1 · 健康检查

```bash
curl https://localhost:8080/health
```

期望: `{"status":"ok"}`

### UAT-2 · 1 句对话

```bash
curl -N -X POST https://localhost:8080/chat \
  -H "Content-Type: application/json" \
  -d '{"msg":"你好"}'
```

期望:
- HTTP 200
- 看到至少 1 个 `event: token` (内容是 LLM 流式吐出的字)
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
# 然后 UAT-2 那条 curl
```

期望: SSE 里收到 `event: error · data: { "message": "DASHSCOPE_API_KEY 环境变量未设置..." }`

---

## Phase Roadmap

| Phase | 范围 | 仓内 issue |
|-------|------|------------|
| **0** ✅ | PoC · PI hello-world · hardcode SOUL · in-memory · 本地 docker run | (本 PR) |
| 1 | SOUL.md dynamic load · agents/<X>/soul.md | REQ-001 |
| 2 | NAS 持久 conversation history | REQ-002 |
| 2.5 | ECS deploy + 自定义域名 daemon.agentaily.com | REQ-003 |
| 3 | multi-agent routing | REQ-004 |
| 4 | multi-channel webhook (iLink BOT 1st) | REQ-005 |
| 5 | sandbox 集成 · per-user named long-lived | REQ-006 |
| 6 | self-modify · LLM 写 skill 落 sandbox fs | REQ-007 |
| 7 | snapshot / rollback (lifecycle 5 stage) | REQ-008 |

---

## 不做 (Phase 0)

- 不接 sandbox / multi-channel / multi-agent / NAS
- 不 deploy ECS · 只本地 docker run
- 不接 vault.json · 只 env var 注入
- 不 dynamic load SOUL · hardcode 在 agent.ts
- 不 self-modify · 不 snapshot

每条都拆成上面 roadmap 里的 follow-up REQ。
