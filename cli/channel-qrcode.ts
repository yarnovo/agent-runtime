#!/usr/bin/env -S node --import tsx
/**
 * agent-runtime/cli/channel-qrcode.ts · Layer 1 runtime hermes
 *
 * 跨 agent 通用 service: 生成 channel 接入二维码 (微信公众号 / 飞书 BOT / 钉钉 / 企业微信 等).
 *
 * 用法:
 *   tsx cli/channel-qrcode.ts wechat <agent_slug>
 *   tsx cli/channel-qrcode.ts feishu <agent_slug>
 *   tsx cli/channel-qrcode.ts dingtalk <agent_slug>
 *   tsx cli/channel-qrcode.ts wecom <agent_slug>
 *
 * 老板 5-11 蓝图: 二维码接入是 agent 跟用户首次见面方式 · 每个 channel 各自仓 own qr-code 逻辑.
 *
 * 本 CLI 是 dispatcher · 调对应 channel 包的 qrCode() 真生成 (PNG buffer 或 base64 string).
 */

type ChannelType = "wechat" | "feishu" | "dingtalk" | "wecom";

const SUPPORTED: readonly ChannelType[] = ["wechat", "feishu", "dingtalk", "wecom"];

interface QrCodeResult {
  readonly png_base64: string;
  readonly expires_at?: string;
  readonly scene_str?: string;
}

/**
 * Phase 2 stub · 真接 channel 包后改 dynamic import.
 *
 * channel-* 包对外 API 约定:
 *   import { qrCode } from '@yarnovo/channel-<type>'
 *   qrCode({ agentSlug }): Promise<QrCodeResult>
 */
async function generate(channel: ChannelType, agentSlug: string): Promise<QrCodeResult> {
  switch (channel) {
    case "wechat":
    case "feishu":
    case "dingtalk":
    case "wecom":
      // stub · 等 channel 包真实现 qrCode export 后 dynamic import
      return {
        png_base64: "",
        scene_str: `${channel}:${agentSlug}`,
      };
  }
}

async function main(): Promise<void> {
  const [channel, agentSlug] = process.argv.slice(2);
  if (!channel || !agentSlug) {
    console.error(`usage: channel-qrcode.ts <${SUPPORTED.join("|")}> <agent_slug>`);
    process.exit(1);
  }
  if (!SUPPORTED.includes(channel as ChannelType)) {
    console.error(`unsupported channel: ${channel} · supported: ${SUPPORTED.join(",")}`);
    process.exit(1);
  }
  const result = await generate(channel as ChannelType, agentSlug);
  console.log(JSON.stringify(result, null, 2));
}

void main();
