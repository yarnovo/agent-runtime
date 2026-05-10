---
id: REQ-005
title: Phase 4 · multi-channel webhook (iLink BOT 1st)
status: open
phase: 4
priority: P2
created: 2026-05-10
parent_phase: phase-0-bootstrap
depends_on: REQ-004
---

## 描述

Phase 0 只 HTTP /chat。Phase 4 加 iLink BOT webhook (1st channel) · 后续可扩 WhatsApp / 微信 / Telegram。

## acceptance

- [ ] 加 `POST /channels/ilink/webhook` · 解 iLink 推送 · 转 agent.prompt
- [ ] iLink 出方向调用 OpenAPI 把 agent 回复推回用户
- [ ] vitest case ≥ 1 (mock iLink 推 + 验出方向 payload)

## 不做

- WhatsApp / 微信 (留 follow-up · 各 channel 一个 issue)
- channel 间共享 sessionId (各 channel 自管)
