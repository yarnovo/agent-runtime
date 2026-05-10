---
id: REQ-010
title: Budget · per-user token quota (防 runaway tenant 烧 LLM quota)
status: open
phase: 1.5
priority: P1
created: 2026-05-10
parent_phase: phase-1-multi-user
---

## 描述

multi-tenant LLM agent 真**核心**: per-tenant token budget · 防 1 user 真烧光真 LLM API quota。

业界 anchor (AWS prescriptive guidance):
> "You must enforce per-tenant token budgets before dispatching to the LLM, as checking quotas after the LLM call means a runaway tenant has already consumed your shared API quota."

执行 pipeline 真 step 03:
```
Auth → Tenant → Budget → Session → Context → Sandbox → LLM → Persist
                  ↑
                 本 REQ
```

## acceptance

- [ ] `packages/budget/` 真 implement (现 stub)
- [ ] `packages/budget/src/quota/token-budget.ts` · per-user 真 token quota (例 daily 100k tokens · monthly 1M)
- [ ] `packages/budget/src/quota/rate-limit.ts` · per-user 真 rate (例 1 msg/3s · 防 spam)
- [ ] `packages/budget/src/tracking/cost-track.ts` · 真累计 token spent · 真 log
- [ ] `packages/budget/src/tracking/per-user-meter.ts` · 真 user 真 meter (真用 RDS or Redis)
- [ ] `packages/budget/src/guard/runaway-guard.ts` · 真 abort if user 真超 daily / monthly quota
- [ ] `apps/daemon/src/pipeline/03-budget-check.ts` · 真 LLM call 前 check (return 429 if 撞)
- [ ] vitest case ≥ 8 (quota check · rate limit · cost track · runaway · ...)

## 真业务模型 anchor

- 老板 5-10 pricing: ¥99/user · 真月 token quota ~ 100k (真 ¥10 LLM cost · 真 ¥89 利润)
- 真 tier:
  - basic ¥99/月 · 100k token/月 · 真 30 msg/day rate
  - pro ¥499/月 · 1M token/月 · 真 100 msg/day
  - enterprise ¥1999/月 · 真无 quota · 真 SLA

## 不做

- 真 token 真预测 (真 LLM 调用前真精确算 token · 真**真**: count message tokens · 真 reserve · 真 actual 用 real tokens)
- 真 streaming 真 mid-call abort (真复杂 · 真留 follow-up)
- 真 admin 真改 quota UI (真 admin endpoint 改 db 真够)

## 来源

- 老板 5-10 anchor multi-tenant · 真 budget 是核心
- AWS prescriptive guidance · "per-tenant token budgets before dispatching"
- LiteLLM Multi-Tenant Architecture
- pricing model wiki: ~/.claude/skills/wiki/entries/agent-pricing-model.md
