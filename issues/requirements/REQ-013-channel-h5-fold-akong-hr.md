---
id: REQ-013
title: channel-h5 真 fold akong-hr web UI · unified login by sso
status: in-progress
phase: 1
priority: P0
created: 2026-05-11
parent_phase: phase-1-channel-impl
depends_on: REQ-012
---

## 描述

老板 5-11 anchor (Wave 3b step 1+2 · 真不 ECS deploy):

- channel-h5 真 stub 升级为真 implement
- src/ui/ fold akong-hr/apps/web (drop login + home · 真**真**: 真 unified login by sso.agentaily.com)
- /api/auth/* forward platform-auth (cookie 透传 .agentaily.com)
- /api/chat SSE forward daemon /chat (in-process self-call)
- / static SPA (vite build dist/ui/dist · fastify-static · history mode fallback)

老板 5-11 真补 anchor:
- 真**真砍** LoginPage · 真**真**: 真 sso.agentaily.com 真 unified login UI
- AuthGate · unauth → window.location.href = sso.agentaily.com/login?redirect=...

## acceptance

- [x] channel-h5 fastify plugin 装载 3 类路由 (auth proxy / chat SSE / static SPA)
- [x] src/ui vite build 真出 dist (gzip ≤ 100KB · React 18 + react-router-dom)
- [x] AuthGate · unauth → redirect sso (真不 router push /login)
- [x] ChatPage 接 @aily-ui/chat-layout + chat-bubble + chat-input
- [x] pnpm build 真过 (vite + tsc 双 step)
- [x] pnpm typecheck 真过 (含 ui + server)
- [x] pnpm test 真过
- [x] docker build 真过

## 真不做 (step 3 老板拍)

- ❌ ECS provision (老板 5-11 拍)
- ❌ DNS cutover (老板 5-11 拍)
- ❌ akong-hr archive (真 prod 真活 · 真 follow-up)
- ❌ akong-hr LoginPage redirect sso 改造 (真 follow-up task)
- ❌ SMS UAT 老板号 (真 step 3 staging UAT 后 prod)

## 完工标准

- 2 PR merged (PR #4 REQ-011 + PR #6 REQ-012)
- ACR image pushed: registry.cn-hangzhou.aliyuncs.com/agentaily/agent-runtime:xiaoxi-v0
- channel-h5 真 fold PR submitted to main
