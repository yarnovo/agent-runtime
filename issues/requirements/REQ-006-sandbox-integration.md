---
id: REQ-006
title: Phase 5 · sandbox 集成 · warm pool short-lived (老板 5-10 update)
status: open
phase: 5
priority: P2
created: 2026-05-10
updated: 2026-05-10
parent_phase: phase-0-bootstrap
---

## 描述

LLM 生成代码 (用户问"帮我排序 csv" · LLM 写 Python) 必须隔离跑 · 不能在 daemon 直接 import (LLM hallucinate 写 `rm -rf /` 直接炸 daemon)。

老板 5-10 update · 业界 multi-tenant default = sandbox warm pool short-lived (vs 之前 plan per-user long-lived):
- sandbox 只跑 LLM 代码 · 1 次性 (跑完丢 / 真返池)
- 不存 user data · 不存 user skill (持久化全外部 NAS / OSS)
- warm pool 真 pre-boot N 个 idle sandbox · 真避免 5-15s 冷启
- 真 N user 共享 pool · 真按调用付 · 真省成本

## 选型

- **AgentRun Sandbox 1st** (国内 · 同 vendor · FC 同栈 · 0ms 跨云延迟 · 浅休眠 ms · 深休眠 s · 存储不收费)
- e2b cloud 备选 (业界事实标准 · vendor lock-in 低 · 真换云 1 day rewrite)
- 砍: e2b 自建 · nsjail · Firecracker (5-9 老板撤 · 5-10 拍按量 SaaS)

## acceptance

- [ ] AgentRun Sandbox SDK 集成 (Node TS adapter)
- [ ] daemon 真 maintain warm pool (例 默认 5 个 pre-boot)
- [ ] PI tool: `sandbox.run(code, language)` · 真 daemon 真从池取 sandbox · 真 file.write code · 真 shell.run · 真返结果 · 真 sandbox 返池
- [ ] vitest case ≥ 3 (mock sandbox · 真 idle/pause/resume 路径)
- [ ] 池监控 (size · idle / busy · 真 alert 真池满)

## 不做

- per-user named long-lived sandbox (撤 · 老板 5-10 update)
- 真存 user data 在 sandbox fs (撤 · 真存 NAS · REQ-007)
- snapshot / rollback (留 REQ-008)

## 来源

- 老板 5-9 拍砍 ACS sandbox · 改 ECS + 开源 (e2b/nsjail/Firecracker)
- 老板 5-10 撤 ECS+开源 · 改按量 SaaS · "直接拿来用"
- 老板 5-10 update · sandbox 真业界 default = short-lived 真"只跑 LLM 代码"
- wiki: ~/.claude/skills/wiki/entries/aliyun-agentrun-overview.md
- memory: feedback_fc_only_agent_runtime.md (5-10 update · sandbox 改按量 SaaS)
