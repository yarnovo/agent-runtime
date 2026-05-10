---
id: REQ-008
title: Phase 7 · snapshot / rollback (lifecycle 5 stage)
status: open
phase: 7
priority: P3
created: 2026-05-10
parent_phase: phase-0-bootstrap
depends_on: REQ-006, REQ-007
---

## 描述

Phase 7 接 sandbox lifecycle 5 stage (snapshot / restore / fork / pause / resume) · agent 每次自我扩展前快照 · 出错可回滚。

## acceptance

- [ ] PI tool: `agent.snapshot(label)` · 拍 sandbox snapshot
- [ ] PI tool: `agent.rollback(label)` · 回到指定 snapshot
- [ ] 新 skill 加载失败时自动 rollback 到加载前 snapshot
- [ ] vitest case ≥ 2 (正常 snapshot 链 + 失败回滚)

## 不做

- 跨 daemon migrate (后续 Phase 8 · 多机协同)
- snapshot 远程备份 (本地够 Phase 7)
