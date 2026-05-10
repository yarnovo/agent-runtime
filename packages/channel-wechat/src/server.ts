import type { FastifyInstance, FastifyPluginAsync } from "fastify";

/**
 * @agent-runtime/channel-wechat · server.ts (stub)
 * TODO REQ-012 · 真 fastify register webhook route
 *
 * /channels/wechat/webhook · 接微信公众号 XML push · verify 签名 → normalize → forward to core
 */
export const channelWechatPlugin: FastifyPluginAsync = async (_app: FastifyInstance) => {
  // stub · TODO 真 register POST /channels/wechat/webhook
};
