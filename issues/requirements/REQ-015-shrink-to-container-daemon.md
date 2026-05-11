---
id: REQ-015
title: agent-runtime 整仓瘦身 → 容器 daemon + Layer 1 hermes CLI
status: in-progress
owner: lead-claude
parent_scenario: blueprint-2026-05-11
created: 2026-05-11
---

# REQ-015 · agent-runtime 整仓瘦身

## 描述

老板 5-11 蓝图 anchor：agent-runtime = 容器 daemon 单仓 + Layer 1 runtime hermes CLI · 不 own 业务/SOUL/chat.

## acceptance

- [x] 砍 11 stub packages (auth/budget/lifecycle/channel-bridge/session/storage/observability/llm/tools/sandbox/core)
- [x] 砍 apps/daemon/src/pipeline/ (8 step 全 stub)
- [x] 砍 apps/daemon/src/{agent.ts, llm.ts, routes/chat.ts, routes/admin.ts}
- [x] 改写 apps/daemon/src/server.ts 为容器调度器 (启/停/list 容器 · 不 /chat)
- [x] 新增 cli/{container.ts, channel-qrcode.ts} (Layer 1 runtime hermes · package.json bin)
- [x] 砍 8 老 REQ (001/002/004/006/007/008/009/010)
- [x] README 整篇重写
- [x] pnpm-workspace.yaml 砍 packages/ 加 cli
- [x] daemon package.json 砍 11 workspace deps
- [ ] pnpm install + tsc 通

## 实施

- daemon 容器 API: GET/POST /containers + DELETE /containers/:slug + /health
- cli 用 #!/usr/bin/env node --import tsx · TS 真可执行
- channel-qrcode.ts 当前 stub · 等 channel 包真 export qrCode() 后 dynamic import

## 完工标准

pnpm install + pnpm typecheck 全通 · GHA build 绿.
