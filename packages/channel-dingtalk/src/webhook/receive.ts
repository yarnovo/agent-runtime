/**
 * @agent-runtime/channel-dingtalk · webhook/receive.ts (stub)
 * TODO REQ-012 · 真接收钉钉 outgoing webhook · normalize 成 daemon 内部 inbound 格式
 */
export interface DingtalkInboundMessage {
  readonly senderId: string;
  readonly conversationId: string;
  readonly text: string;
}
