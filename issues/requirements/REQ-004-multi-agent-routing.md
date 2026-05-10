---
id: REQ-004
title: Phase 3 · multi-agent routing
status: open
phase: 3
priority: P2
created: 2026-05-10
parent_phase: phase-0-bootstrap
depends_on: REQ-001
---

## 描述

Phase 0 只 hardcode 1 个 agent。Phase 3 支持仓内 `agents/<name>/` 多个 agent 实例 · 同 daemon 进程 host 多个 agent · 路由按 path / header 区分。

## acceptance

- [ ] 路由改 `POST /agents/:name/chat`
- [ ] 启动时扫 `agents/*/soul.md` · 每个起独立 Agent · 进程内 in-memory map
- [ ] vitest case ≥ 2 (2 个 agent 不串味)

## 不做

- agent 间共享 memory (Phase 6+)
- agent fs 隔离 (留 REQ-006 sandbox)
