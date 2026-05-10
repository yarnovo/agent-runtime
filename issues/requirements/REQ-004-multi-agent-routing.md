---
id: REQ-004
title: Phase 3 · multi-agent routing
status: dropped
phase: 3
priority: P2
created: 2026-05-10
dropped: 2026-05-10
parent_phase: phase-0-bootstrap
depends_on: REQ-001
---

## 描述

Phase 0 只 hardcode 1 个 agent。Phase 3 (原计划) 支持仓内 `agents/<name>/` 多个 agent 实例 · 同 daemon 进程 host 多个 agent · 路由按 path / header 区分。

## status: dropped (2026-05-10)

老板 5-10 拍 · 1 ECS 1 容器 1 agent 真冗余 · daemon 内不再 routing N agent。

每 agent 起独立 daemon 容器 · 域名层 (m./chat./api.<role>.<team>.agentaily.com) 真做 routing · 简化 daemon 内部模型。

如未来真需共进程多 agent (eg cost 极敏) · 再起新 REQ。

## 不做 (原计划 · 已砍)

- 路由改 `POST /agents/:name/chat`
- 启动时扫 `agents/*/soul.md` · 每个起独立 Agent · 进程内 in-memory map
- vitest case ≥ 2 (2 个 agent 不串味)
