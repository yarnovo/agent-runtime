---
id: REQ-007
title: Phase 6 · self-modify · LLM 写 skill 落 sandbox fs
status: open
phase: 6
priority: P3
created: 2026-05-10
parent_phase: phase-0-bootstrap
depends_on: REQ-006
---

## 描述

Phase 6 让 agent 能自我扩展 · LLM 通过 sandbox tool 写 skill / hermes / tools 文件到自己的 sandbox fs · 下次启动时新 skill 已挂载。

## acceptance

- [ ] PI tool: `skill.write(path, content)` · 落 sandbox fs
- [ ] PI tool: `skill.list()` · 列当前 agent 已有 skill
- [ ] agent 重启后新 skill 自动 load
- [ ] vitest case ≥ 1 (写 + 重启 + verify load)

## 不做

- 跨 agent skill 共享 (各 agent 自己的 sandbox fs · 隔离)
- skill 商店 / marketplace (后续)
