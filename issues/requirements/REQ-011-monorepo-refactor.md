---
id: REQ-011
title: monorepo 重构 · 11 packages + 极致细分目录
status: in-progress
phase: 0.5
priority: P0
created: 2026-05-10
parent_phase: phase-0-bootstrap
---

## 描述

老板 5-10 拍 "目录即架构 · 极致细分" 原则:
- 老板**不打开文件审阅** · 只看目录组织
- ls 一眼看到架构
- 1 module 1 package · 1 concern 1 sub-folder · 1 step 1 file

把 Phase 0 单仓 src/ 重构成 monorepo (pnpm workspace) + 1 app (apps/daemon) + 11 packages (packages/*) · 全部 stub interface · keep Phase 0 hello-world working。

## acceptance

- [x] pnpm-workspace.yaml 配 apps/* + packages/*
- [x] 现 src/ mv 到 apps/daemon/src/ · POST /chat SSE 真 keep working
- [x] apps/daemon/src/pipeline/ 8 step file (01-auth.ts ... 08-persist.ts) stub
- [x] apps/daemon/src/routes/{chat,admin}.ts (chat keep · admin stub)
- [x] packages/core/src/ · session.ts + agent.ts + index.ts (stub)
- [x] packages/auth/src/ · oidc/cookie/jwt 子目录 (stub)
- [x] packages/budget/src/ · quota/tracking/guard 子目录 (stub)
- [x] packages/session/src/ · store/lifecycle/tree 子目录 (stub)
- [x] packages/llm/src/ · providers/streaming + registry.ts (stub)
- [x] packages/storage/src/ · nas/oss/rds 子目录 (stub)
- [x] packages/sandbox/src/ · pool/adapters/exec 子目录 (stub)
- [x] packages/lifecycle/src/ · ship/hire/evolve/snapshot/restore.ts (stub)
- [x] packages/tools/src/ · base/ext 子目录 (stub)
- [x] packages/observability/src/ · logger/tracer/cost 子目录 (stub)
- [x] packages/channel-bridge/src/ · webhook + adapters 子目录 (stub)
- [x] 每 package 真 package.json (name `@agent-runtime/<name>`)
- [x] root package.json + tsconfig 配 monorepo
- [x] vitest 2/2 真 keep green
- [x] tsc --noEmit 0 error
- [x] docker build 真 keep green
- [x] README 顶部更新真目录树 (主图)

## 不做

- ❌ implement 真业务 logic (留 REQ-001..008 真各自 task)
- ❌ channel-h5 (单独 task)
- ❌ ECS deploy (REQ-003)

## 完工 4 问 (实施完报)

见 PR description。
