---
id: REQ-014
title: 拆 5 个 channel-* 包到各自独立仓
status: in-progress
owner: lead-claude
parent_scenario: blueprint-2026-05-11
created: 2026-05-11
---

# REQ-014 · 拆 5 个 channel-* 包到独立仓

## 描述

老板 5-11 蓝图 anchor：

> channel-h5 / channel-wechat / channel-feishu / channel-dingtalk / channel-wecom
> 从 agent-runtime/packages/ 拆到 yarnovo/channel-X 各自独立仓
> 跟 weixin-ilink-channel pattern 平行 · 1 channel 1 仓 1 maintainer

## acceptance

- [ ] 5 个新 GitHub private 仓 (channel-h5, channel-wechat, channel-feishu, channel-dingtalk, channel-wecom) 真创建
- [ ] 每仓 src/ 真带源码 (从 packages/channel-*/src/ cp 来)
- [ ] 每仓 package.json 包名改 `@yarnovo/channel-X` (脱 @agent-runtime/ 前缀)
- [ ] 每仓 init commit + push origin main
- [ ] 大仓 ~/.claude/.gitmodules 注册 5 新 submodule (repos/platform/channel-X)
- [ ] agent-runtime 本仓 packages/channel-* 真目录 `git rm -rf` 删除

## 实施

- 每仓简单 cp + init commit (REQ-012/013 history 浅 · 不走 git filter-repo)
- README 暂留占位 · 后续 maintainer 接手补

## 完工标准

5 新仓上 GitHub · agent-runtime/packages/channel-* 不再存在 · .gitmodules register 完成
