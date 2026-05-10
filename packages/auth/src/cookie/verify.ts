/**
 * @agent-runtime/auth · cookie/verify.ts (stub)
 * TODO · 真校验签名 cookie · HMAC + 过期检查
 */
export interface CookieVerifyResult {
  readonly valid: boolean;
  readonly userId?: string;
}
