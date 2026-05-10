---
id: REQ-002
title: Phase 2 · NAS 持久 conversation history
status: open
phase: 2
priority: P1
created: 2026-05-10
parent_phase: phase-0-bootstrap
---

## 描述

Phase 0 in-memory · 进程死即丢。Phase 2 把每个 conversation (sessionId) 持久到 NAS 共享文件系统 · 重启不丢历史 · 也方便后续 ECS 多副本共读。

## acceptance

- [ ] 引入 `--data-dir` 参数 · 默认 `/data/conversations`
- [ ] 每 conversation 一个 jsonl 文件 · append 模式
- [ ] POST /chat 支持 `{ msg, sessionId }` · 带 sessionId 复用历史 · 不带新建
- [ ] 进程重启后老 sessionId 还能继续聊
- [ ] vitest case ≥ 2 (新建 + 复用)

## 不做

- 多副本并发写锁 (留 ECS deploy 时再说)
- 历史压缩 / context window 管理 (PI 自带 transformContext)
