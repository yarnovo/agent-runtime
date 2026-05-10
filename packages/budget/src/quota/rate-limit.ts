/**
 * @agent-runtime/budget · quota/rate-limit.ts (stub)
 * TODO · 真 sliding window / leaky bucket · 用户级 RPS
 */
export interface RateLimit {
  readonly windowMs: number;
  readonly maxRequests: number;
}
