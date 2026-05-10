---
id: REQ-009
title: Auth · OIDC client (接 platform-sso)
status: open
phase: 1.5
priority: P1
created: 2026-05-10
parent_phase: phase-1-multi-user
---

## 描述

multi-tenant agent runtime 必有 auth 真第 1 步 · pipeline 真 step 01。

执行 pipeline (业界 multi-tenant default):
```
Auth → Tenant → Budget → Session → Context → Sandbox → LLM → Persist
 ↑
本 REQ
```

接 platform-sso (OIDC PKCE) · cookie 真 verify · resolve user_id。

## acceptance

- [ ] `packages/auth/` 真 implement (现 stub)
- [ ] `packages/auth/src/oidc/client.ts` · OIDC discovery + PKCE + token exchange
- [ ] `packages/auth/src/cookie/verify.ts` · cookie domain `.agentaily.com` · resolve session
- [ ] `packages/auth/src/jwt/verify.ts` · JWT 验签 (用 platform-sso /jwks.json)
- [ ] `apps/daemon/src/pipeline/01-auth.ts` · 真 wire packages/auth · 真 enrich ctx.user_id
- [ ] vitest case ≥ 5 (cookie verify · jwt verify · OIDC flow · failed scenarios)
- [ ] e2e: curl 带 cookie → POST /chat → 真 return user_id (真 audit log)

## 不做

- 真注册新 user (走 platform-sso)
- 真 SSO logout endpoint (走 platform-sso)
- 真多 IdP support (真现状只 platform-sso · 真未来真触发)

## 来源

- 老板 5-10 anchor multi-tenant · pipeline 真 step
- 业界 AWS / Azure multi-tenant agentic AI prescriptive guidance
- platform-sso 真 prod 已活 (af83dcf7 真上)
