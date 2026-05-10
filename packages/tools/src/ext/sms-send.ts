/**
 * @agent-runtime/tools · ext/sms-send.ts (stub)
 * TODO · 真接 阿里云 / 腾讯云 短信 API · agent 真发短信
 */
export interface SmsSendToolInput {
  readonly phone: string;
  readonly templateCode: string;
  readonly templateParams: Record<string, string>;
}
