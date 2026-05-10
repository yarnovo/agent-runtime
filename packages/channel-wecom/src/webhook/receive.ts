/**
 * @agent-runtime/channel-wecom · webhook/receive.ts (stub)
 * TODO REQ-012 · 真接收企业微信回调消息 · 解 AES → normalize 成 daemon 内部 inbound 格式
 */
export interface WecomInboundMessage {
  readonly fromUser: string;
  readonly agentId: string;
  readonly text: string;
}
