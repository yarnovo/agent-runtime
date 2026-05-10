/**
 * @agent-runtime/channel-wecom · webhook/verify.ts (stub)
 * TODO REQ-012 · 真企业微信回调签名 verify · WXBizMsgCrypt sha1
 */
export function verifyWecomSignature(_input: {
  readonly token: string;
  readonly timestamp: string;
  readonly nonce: string;
  readonly echostr: string;
  readonly signature: string;
}): boolean {
  return false;
}
