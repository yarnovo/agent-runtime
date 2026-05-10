/**
 * @agent-runtime/channel-bridge · adapters/interface.ts (stub)
 * TODO REQ-005 · 真 channel adapter 公共抽象 (parseInbound / sendOutbound)
 *
 * 真各具体 channel adapter (iLink BOT / 微信 / 企业微信 / 短信) 真各自仓 (channel-h5 / weixin-ilink-channel) 真实现。
 * 本仓 packages/channel-bridge 真做 daemon 内部统一 channel adapter 接口 + dispatcher。
 */
export interface ChannelAdapter {
  readonly id: string;
  readonly displayName: string;
}
