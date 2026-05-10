---
id: REQ-007
title: Phase 6 · self-modify · LLM 写 skill 落 NAS (老板 5-10 update)
status: open
phase: 6
priority: P3
created: 2026-05-10
updated: 2026-05-10
parent_phase: phase-0-bootstrap
depends_on: REQ-006
---

## 描述

Phase 6 让 agent 能自我扩展 · LLM 写新 skill / tool / prompt override · 落持久存储 (NAS · per-user path) · 下次启动 daemon 真按 user_id load 真用户已进化的 skill。

老板 5-10 update · 撤之前"落 sandbox fs" plan:
- sandbox = warm pool short-lived (REQ-006 update · 真用完丢)
- 真 self-modify 持久 skill 真**落 NAS** · 真 path `/nas/users/<user_id>/skills/<name>.ts`
- 真 sandbox 真**只**跑 1 次性 LLM 代码 (例 真"跑这段 code 真返结果" · 真不持久)
- 真持久 skill (例 真"教 agent 真新工具 · 真未来都用") → NAS

## 区分 2 类 LLM 代码

| 用例 | 真存哪 | 真 lifecycle |
|---|---|---|
| 1 次性数据处理 (排序 csv · 真发邮件) | sandbox 真临时 fs · 用完丢 | sandbox 跑完返池 |
| 持久 skill (用户教 agent · 真长期用) | NAS · /users/<id>/skills/<name>.ts | NAS row · 永久 |

## acceptance

- [ ] PI tool: `skill.write(name, code, scope='user')` · 落 NAS per-user path
- [ ] PI tool: `skill.list(scope='user'|'agent')` · 列当前 user 真 skill (含出厂 + 进化)
- [ ] PI tool: `skill.run(name, args)` · daemon 真 fetch NAS code · 送 sandbox 跑 · 真返结果
- [ ] daemon 启动 / user 真 first-touch 时 · 真按 user_id load NAS skill
- [ ] vitest case ≥ 3 (write + list + run + verify NAS persist)

## 不做

- 跨 user skill 共享 (per-user 真隔离 · 安全 · skill marketplace 真留 REQ-008+)
- skill 商店 / marketplace (后续)
- 真落 sandbox fs (撤 · 老板 5-10 update · sandbox short-lived)

## 来源

- 老板 5-10 anchor "sandbox 真只跑 LLM 代码 · 持久化 file 在 NAS / OSS"
- REQ-006 update · sandbox 真改 warm pool short-lived
- 真业界 multi-tenant default · 真 fs 隔离用 path · 真不用 sandbox fs
