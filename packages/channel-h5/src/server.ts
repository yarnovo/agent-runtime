import type { FastifyInstance, FastifyPluginAsync } from "fastify";
import { registerH5ChatRoute } from "./routes/chat.js";

/**
 * @agent-runtime/channel-h5 · server.ts (stub)
 * TODO REQ-012 · 真 fastify register web UI route + chat SSE endpoint
 *
 * 装载顺序:
 *   1. /h5/chat       SSE endpoint · forward → core agent
 *   2. /              static SPA (vite build dist · fastify-static · stub)
 *
 * 真生产用 @fastify/static · Phase 1 仅 stub 路由声明 · UI build artifact 未来 vite build。
 */
export const channelH5Plugin: FastifyPluginAsync = async (app: FastifyInstance) => {
  await registerH5ChatRoute(app);
  // TODO REQ-012 · @fastify/static register `src/ui/dist` · fallback index.html (SPA history mode)
};
