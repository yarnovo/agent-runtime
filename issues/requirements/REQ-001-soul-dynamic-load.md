---
id: REQ-001
title: Phase 1 · SOUL.md dynamic load
status: open
phase: 1
priority: P1
created: 2026-05-10
parent_phase: phase-0-bootstrap
---

## 描述

Phase 0 把 SOUL hardcode 在 `src/agent.ts`。Phase 1 改成从 `agents/<agent_name>/soul.md` 文件读 · 启动时载 · 也支持 hot-reload (fs.watch)。

## acceptance

- [ ] 仓加 `agents/hello/soul.md` 真示例
- [ ] `src/agent.ts` 不再 hardcode · 改读文件
- [ ] POST /chat 支持 `{ msg, agent: "hello" }` 选 agent
- [ ] 改 soul.md 不重启进程 · 下次新对话用新内容
- [ ] vitest case ≥ 1 (用 tmp dir + faux provider)

## 不做

- 多 agent routing (留 REQ-004)
- agent 间隔离 (留 REQ-006 sandbox)
