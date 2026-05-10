---
id: REQ-003
title: Phase 2.5 · ECS deploy + 自定义域名
status: open
phase: 2.5
priority: P1
created: 2026-05-10
parent_phase: phase-0-bootstrap
---

## 描述

Phase 0 只本地 docker run。Phase 2.5 上 ECS · 配自定义域名 `daemon.agentaily.com` (prod) + `staging.daemon.agentaily.com` (staging) · 走双环境 (5-5 老板拍 develop=staging / main=prod)。

## acceptance

- [ ] GHA `deploy-staging.yml` push develop → ECS staging container
- [ ] GHA `deploy-prod.yml` push main → ECS prod container
- [ ] 域名 prod / staging 各 1 个 · 走 acme.sh DNS-01 cert
- [ ] systemd unit 重启不丢 (NAS mount + restart=always)
- [ ] vault.json 声明 DASHSCOPE_API_KEY · GHA secret 注入

## 不做

- k8s / 多副本 (单台 ECS 够 Phase 2.5)
- WAF / DDoS (后续 Phase)
