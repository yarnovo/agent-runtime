/**
 * @agent-runtime/channel-h5 · server.ts
 *
 * fastify plugin · 装载 3 类路由:
 *   1. /api/auth/*  forward → platform-auth (cookie 透传 · 真服务端种 .agentaily.com)
 *   2. /api/chat    SSE forward → daemon /chat (in-process · agent core 真复用)
 *   3. /*           static SPA (vite build dist · history mode fallback index.html)
 *
 * 真 SPA = src/ui (folded from akong-hr/apps/web · 接 aily-ui 组件库).
 * 真 build flow: pnpm build:ui (vite) → pnpm build:server (tsc) → docker COPY dist + src/ui/dist.
 *
 * env opts (老板 5-7 域名规约):
 *   AUTH_API   default https://api.sso.agentaily.com (platform-auth prod)
 *   AGENT_SLUG default xiaoxi (UI 真 chat 哪 agent · 单 agent / 1 instance)
 */
import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { registerAuthRoutes } from "./routes/auth.js";
import { registerChatRoute } from "./routes/chat.js";
import { registerStaticRoutes } from "./routes/static.js";

export interface ChannelH5Opts {
  authApi?: string;
  agentSlug?: string;
}

export const channelH5Plugin: FastifyPluginAsync<ChannelH5Opts> = async (
  app: FastifyInstance,
  opts: ChannelH5Opts,
) => {
  const authApi = opts.authApi ?? process.env.AUTH_API ?? "https://api.sso.agentaily.com";
  const agentSlug = opts.agentSlug ?? process.env.AGENT_SLUG ?? "xiaoxi";

  app.log.info({ authApi, agentSlug }, "channel-h5 plugin loaded");

  await registerAuthRoutes(app, { authApi });
  await registerChatRoute(app);
  await registerStaticRoutes(app);
};
