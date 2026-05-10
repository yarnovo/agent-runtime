/**
 * @agent-runtime/channel-dingtalk · webhook/verify.ts (stub)
 * TODO REQ-012 · 真钉钉 outgoing webhook 签名 verify · hmac_sha256(timestamp + appSecret)
 */
export function verifyDingtalkSignature(_input: {
  readonly timestamp: string;
  readonly appSecret: string;
  readonly signature: string;
}): boolean {
  return false;
}
