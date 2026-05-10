/**
 * @agent-runtime/channel-wechat · webhook/receive.ts (stub)
 * TODO REQ-012 · 真接收微信 XML 消息 · normalize 成 daemon 内部 inbound 格式
 */
export interface WechatInboundMessage {
  readonly fromUser: string;
  readonly toUser: string;
  readonly text: string;
}
