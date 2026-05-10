---
id: REQ-005
title: Phase 4 · multi-channel webhook · fold packages/channel-*
status: in-progress
phase: 1
priority: P1
created: 2026-05-10
updated: 2026-05-11
parent_phase: phase-0-bootstrap
depends_on: REQ-011, REQ-012
---

## 描述

老板 5-11 anchor OpenClaw plug-in pattern:

- channel = `agent-runtime` monorepo packages plug-in (**真不独立仓**)
- 1 agent 1 容器 = 1 daemon · daemon 自带 N channel plug-in
- 用户访问 `m.<agent>.<team>.agentaily.com` → 直接 hit 该 agent 容器的 daemon · daemon 内 channel plug-in 渲 UI / 接 webhook

REQ-005 升级为多 channel 总 issue · 真各 channel implement 拆为子 task (per channel 1 issue):

| channel | package | follow-up |
|---|---|---|
| h5 (web UI · 1st priority) | `packages/channel-h5` | REQ-013 (待建) · 实施 SPA + chat SSE |
| 飞书 | `packages/channel-feishu` | REQ-014 (待建) · 实施 lark IM SDK |
| 微信公众号 | `packages/channel-wechat` | REQ-015 (待建) · 实施 MP XML 协议 |
| 企业微信 | `packages/channel-wecom` | REQ-016 (待建) · 实施 WXBizMsgCrypt |
| 钉钉 | `packages/channel-dingtalk` | REQ-017 (待建) · 实施 outgoing webhook |

Phase 0.5 (REQ-012) 真起 5 packages stub · 留 Phase 1 起 (h5 1st · fold akong-hr/apps/web) · Phase 4 起其余 IM channel。

## acceptance (本 issue · 总框架)

- [x] 5 channel-* packages stub 起 (REQ-012 落实)
- [x] `apps/daemon/src/server.ts` 按 `CHANNEL_ENABLED` env 选 plug-in
- [ ] Phase 1 · channel-h5 实 SPA + chat SSE (REQ-013 · 待建)
- [ ] Phase 4 · 4 IM channel 真厂 SDK 落地 (REQ-014..017 · 待建)
- [ ] 每 channel ≥ 1 vitest case (mock 推 + 验出方向 payload)

## 不做

- channel 间共享 sessionId (各 channel 自管)
- iLink BOT (5-11 老板砍 · 不再做 iLink · 用 H5 + IM 主流 channel)
