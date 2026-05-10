import type { FastifyInstance, FastifyPluginAsync } from "fastify";

/**
 * @agent-runtime/channel-wecom · server.ts (stub)
 * TODO REQ-012 · 真 fastify register webhook route
 *
 * /channels/wecom/webhook · 接企业微信 callback · verify 签名 → normalize → forward to core
 */
export const channelWecomPlugin: FastifyPluginAsync = async (_app: FastifyInstance) => {
  // stub · TODO 真 register POST /channels/wecom/webhook
};
