import type { FastifyInstance, FastifyPluginAsync } from "fastify";

/**
 * @agent-runtime/channel-feishu · server.ts (stub)
 * TODO REQ-012 · 真 fastify register webhook route
 *
 * /channels/feishu/webhook · 接飞书 event push · verify 签名 → normalize → forward to core
 */
export const channelFeishuPlugin: FastifyPluginAsync = async (_app: FastifyInstance) => {
  // stub · TODO 真 register POST /channels/feishu/webhook
};
