---
id: REQ-012
title: channel-* packages stub · OpenClaw plug-in pattern
status: in-progress
phase: 0.5
priority: P0
created: 2026-05-11
parent_phase: phase-0-bootstrap
depends_on: REQ-011
---

## 描述

老板 5-11 anchor OpenClaw pattern:

- channel = monorepo packages plug-in (**真不独立仓**)
- 1 agent 1 容器 = 1 daemon · daemon 自带 N channel plug-in
- 用户访问 m.<agent>.<team>.agentaily.com → 直接 hit 该 agent 容器的 daemon · daemon 的 channel-h5 plug-in 渲 web UI

为 5 个 channel 起 stub package · 占住目录架构 · 留 Phase 4 各自 task implement 真厂 SDK:

- `packages/channel-h5`        web UI · listen 80 · fastify static + chat SSE
- `packages/channel-feishu`    飞书 webhook + lark IM API
- `packages/channel-wechat`    微信公众号 webhook + MP API
- `packages/channel-wecom`     企业微信 webhook + WeCom API
- `packages/channel-dingtalk`  钉钉 outgoing webhook + DingTalk Open API

每包统一 sub-folder 切分: `webhook/{verify,receive}` + `api/{access-token,send-message,qr-code}` + `adapter/to-core` + `index`。

`apps/daemon/src/server.ts` 按 env `CHANNEL_ENABLED` (逗号分隔 · default `h5`) 选 plug-in 装载。

`channel-bridge` package 不动 (真 routing layer · 已 stub)。

## acceptance

- [x] `packages/channel-h5/` · package.json + tsconfig + vitest + src/{index,server,routes/chat,ui/index.html}
- [x] `packages/channel-feishu/` · 同结构 · src/{index,server,webhook/{verify,receive},api/{access-token,send-message,qr-code},adapter/to-core}
- [x] `packages/channel-wechat/` · 同结构 (sha1 签名)
- [x] `packages/channel-wecom/` · 同结构 (WXBizMsgCrypt AES)
- [x] `packages/channel-dingtalk/` · 同结构 (hmac_sha256 签名)
- [x] 每 package 真 package.json (`@agent-runtime/channel-<name>` · main `src/index.ts`)
- [x] 每 sub-folder + 每 file 1-2 行 stub interface · 不 implement 真厂 SDK
- [x] `apps/daemon/package.json` 加 5 channel-* workspace 依赖
- [x] `apps/daemon/src/server.ts` 按 `CHANNEL_ENABLED` env 选 plug-in
- [x] default `CHANNEL_ENABLED=h5` (Phase 1 web UI 优先)
- [x] `Dockerfile` 加 5 channel-* package.json copy (2 处 · builder + runtime)
- [x] `.env.example` 加 `CHANNEL_ENABLED` 注释
- [x] yarnovo/channel-template archive (keep git history · 不 delete)
- [x] ~/.claude submodule deinit `repos/channel/channel-template` + rm `repos/channel/` 整目录
- [x] pnpm install + tsc + vitest pass · docker build pass
- [x] POST /chat (CHANNEL_ENABLED=h5 default) keep working

## 不做

- ❌ implement 真厂 SDK (lark / wechat / wecom / dingtalk · 留 Phase 4 各自 task)
- ❌ channel-h5 真 SPA UI (留 Phase 1 task · fold akong-hr/apps/web)
- ❌ channel-bridge package 改动 (已 stub · 真 routing layer)
- ❌ ECS deploy (REQ-003 · Wave 3b 后续 task)

## 完工 4 问

见 PR description。
