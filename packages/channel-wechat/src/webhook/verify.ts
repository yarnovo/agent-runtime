/**
 * @agent-runtime/channel-wechat · webhook/verify.ts (stub)
 * TODO REQ-012 · 真微信公众号签名 verify · sha1(token + timestamp + nonce)
 */
export function verifyWechatSignature(_input: {
  readonly token: string;
  readonly timestamp: string;
  readonly nonce: string;
  readonly signature: string;
}): boolean {
  return false;
}
