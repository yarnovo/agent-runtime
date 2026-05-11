# agent-runtime

容器 daemon 单仓 + Layer 1 runtime hermes CLI.

老板 5-11 蓝图: agent-runtime = 容器调度器 + 跨 agent 通用 service. 真业务 (channel / agent 人格 / SOUL) 不在本仓.

---

## 真目录

```
agent-runtime/
├── apps/
│   └── daemon/                       fastify 容器调度器
│       ├── package.json              @agent-runtime/daemon
│       ├── tsconfig.json
│       └── src/
│           └── server.ts             启/停/list agent 容器 · GET /health · 不 own /chat
│
├── cli/                              ⭐ Layer 1 runtime hermes (TS 真可执行)
│   ├── container.ts                  docker run / stop / list (跨 agent 通用)
│   ├── channel-qrcode.ts             生成 channel 接入二维码 (微信 / 飞书 / 钉钉 / 企微)
│   ├── package.json                  @agent-runtime/cli · bin 字段真注册
│   └── tsconfig.json
│
├── Dockerfile                        daemon 镜像
├── docker-compose.yml                local dev
├── package.json                      workspace root (apps/* + cli)
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── issues/requirements/
    ├── REQ-003-ecs-deploy.md         (待 phase 3 deploy)
    ├── REQ-005-multi-channel-webhook.md
    ├── REQ-011-monorepo-refactor.md  (已 obsolete · 5-11 反向重构)
    ├── REQ-012-channel-packages-stub.md  (已 obsolete · 5-11 拆出独立仓)
    ├── REQ-013-channel-h5-fold-akong-hr.md  (已 obsolete · 5-11 拆出)
    └── REQ-014-extract-channel-repos.md ⭐ 5-11 大手术
```

## 角色

```
老板/lead
  │ akong-cli agent-add xiaoxi
  ↓
agents/xiaoxi/cli/install (Layer 2 agent hermes)
  │ 调
  ↓
agent-runtime/cli/container.ts start xiaoxi <image> 8080 (Layer 1 runtime hermes)
  │ docker run
  ↓
agent-runtime/apps/daemon (容器 host 内 · /health + /containers REST)
  ↓
容器内 agent daemon 起 · mount channel-h5/wechat/feishu/...
```

## channel 仓

5 channel 已拆到各自独立仓 (REQ-014 · 5-11 大手术):

| channel | 仓 | 状态 |
|---|---|---|
| channel-h5 | yarnovo/channel-h5 | (archived · 待老板 unarchive 后 PR refactor) |
| channel-wechat | yarnovo/channel-wechat | init done |
| channel-feishu | yarnovo/channel-feishu | init done |
| channel-dingtalk | yarnovo/channel-dingtalk | init done |
| channel-wecom | yarnovo/channel-wecom | init done |
| channel-ilink | yarnovo/weixin-ilink-channel | (老仓 · pattern 参考) |

每个 channel: 接 webhook → normalize → POST agent endpoint → SSE 转发回.

## 容器 API

```
GET    /health                  → { status: "ok" }
GET    /containers              → { containers: [{ id, name, image, status }] }
POST   /containers              body: { agent_slug, image, env?, port? } → { id }
DELETE /containers/:slug        → { ok: true }
```

容器自身 /chat 不在本仓 · 由容器内 agent + 其 channel-* 各自暴露.

## CLI

```bash
# 容器
tsx cli/container.ts list
tsx cli/container.ts start xiaoxi yarnovo/xiaoxi:latest 8080
tsx cli/container.ts stop xiaoxi

# channel 二维码
tsx cli/channel-qrcode.ts wechat xiaoxi
tsx cli/channel-qrcode.ts feishu interviewer
```

## 本地跑

```bash
pnpm install
pnpm --filter @agent-runtime/daemon dev      # daemon localhost:8080
pnpm --filter @agent-runtime/daemon build
pnpm --filter @agent-runtime/daemon start
```

## docker

```bash
docker build -t agent-runtime .
docker run --rm -p 8080:8080 -v /var/run/docker.sock:/var/run/docker.sock agent-runtime
```

注意: daemon 调 docker · 需 mount docker socket.

## 来源

- 2026-05-11 老板蓝图 (~/.claude/repos/skills/blueprint/data/target.md)
- audit (~/.claude/repos/skills/blueprint/data/audit-2026-05-11.md · #1 段)
- REQ-014 (本仓 issues/requirements/) · big-shrink phase 1 + phase 2
