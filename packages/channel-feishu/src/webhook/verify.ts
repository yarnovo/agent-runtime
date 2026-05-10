/**
 * @agent-runtime/channel-feishu · webhook/verify.ts (stub)
 * TODO REQ-012 · 真飞书 webhook 签名 verify · sha256(timestamp + nonce + body + verification_token)
 */
export function verifyFeishuSignature(_input: {
  readonly timestamp: string;
  readonly nonce: string;
  readonly body: string;
  readonly signature: string;
}): boolean {
  return false;
}
