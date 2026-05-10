---
id: REQ-006
title: Phase 5 · sandbox 集成 · per-user named long-lived
status: open
phase: 5
priority: P2
created: 2026-05-10
parent_phase: phase-0-bootstrap
---

## 描述

Phase 0 不接 sandbox。Phase 5 接开源 sandbox (e2b / nsjail / Firecracker · 老板 5-9 拍砍 ACS sandbox 改 ECS+开源 · feedback_fc_only_agent_runtime.md)。

每用户 1 个 named sandbox · long-lived · agent 调 sandbox 跑动态代码。

## acceptance

- [ ] 决定具体 sandbox 选型 (e2b OS / nsjail / Firecracker · council 起 subagent 评)
- [ ] sandbox lifecycle: create → mount user fs → attach agent → keep-alive
- [ ] PI tool: `sandbox.run(code)` · 走 daemon 转发到对应 sandbox
- [ ] vitest case ≥ 1 (用 mock sandbox)

## 不做

- 跨用户 sandbox 共享 (隔离是核心)
- snapshot / rollback (留 REQ-008)
