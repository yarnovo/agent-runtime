import type { FastifyInstance, FastifyPluginAsync } from "fastify";

/**
 * @agent-runtime/channel-dingtalk · server.ts (stub)
 * TODO REQ-012 · 真 fastify register webhook route
 *
 * /channels/dingtalk/webhook · 接钉钉 outgoing webhook · verify 签名 → normalize → forward to core
 */
export const channelDingtalkPlugin: FastifyPluginAsync = async (_app: FastifyInstance) => {
  // stub · TODO 真 register POST /channels/dingtalk/webhook
};
