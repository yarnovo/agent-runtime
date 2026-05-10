/**
 * @agent-runtime/channel-feishu · webhook/receive.ts (stub)
 * TODO REQ-012 · 真接收飞书消息 · normalize 成 daemon 内部 inbound 格式
 */
export interface FeishuInboundMessage {
  readonly userId: string;
  readonly chatId: string;
  readonly text: string;
}
