import Fastify from "fastify";
import sensible from "@fastify/sensible";
import { registerChatRoute } from "./routes/chat.js";
import { registerAdminRoutes } from "./routes/admin.js";
import { channelH5Plugin } from "@agent-runtime/channel-h5";
import { channelFeishuPlugin } from "@agent-runtime/channel-feishu";
import { channelWechatPlugin } from "@agent-runtime/channel-wechat";
import { channelWecomPlugin } from "@agent-runtime/channel-wecom";
import { channelDingtalkPlugin } from "@agent-runtime/channel-dingtalk";

const PORT = Number(process.env.PORT ?? 8080);
const HOST = process.env.HOST ?? "0.0.0.0";

/**
 * 按 env CHANNEL_ENABLED (逗号分隔) 选 channel plug-in 装载。
 * default `h5` (Phase 1 · 先 web UI)。
 *
 * 例:
 *   CHANNEL_ENABLED=h5,feishu      → 同时挂 web UI + 飞书 webhook
 *   CHANNEL_ENABLED=wechat,wecom   → 关 h5 · 只挂微信 + 企微
 */
function getEnabledChannels(): readonly string[] {
  return (process.env.CHANNEL_ENABLED ?? "h5")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function buildServer() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? "info",
    },
  });

  await app.register(sensible);

  app.get("/health", async () => ({ status: "ok" }));

  await registerChatRoute(app);
  await registerAdminRoutes(app);

  const enabled = getEnabledChannels();
  app.log.info({ channels: enabled }, "channel plug-ins enabled");

  if (enabled.includes("h5")) await app.register(channelH5Plugin);
  if (enabled.includes("feishu")) await app.register(channelFeishuPlugin);
  if (enabled.includes("wechat")) await app.register(channelWechatPlugin);
  if (enabled.includes("wecom")) await app.register(channelWecomPlugin);
  if (enabled.includes("dingtalk")) await app.register(channelDingtalkPlugin);

  return app;
}

async function main(): Promise<void> {
  const app = await buildServer();
  try {
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`agent-runtime listening on http://${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  void main();
}
