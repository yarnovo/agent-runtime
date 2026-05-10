/**
 * @agent-runtime/session · store/redis.ts (stub)
 * TODO Phase 2+ · 真接 Redis · 跨进程 session
 */
export interface RedisSessionStore {
  readonly kind: "redis";
  readonly url: string;
}
