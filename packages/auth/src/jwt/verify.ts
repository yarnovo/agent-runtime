/**
 * @agent-runtime/auth · jwt/verify.ts (stub)
 * TODO · 真校验 JWT 签名 + claims (iss / aud / exp)
 */
export interface JWTClaims {
  readonly sub: string;
  readonly exp: number;
}
