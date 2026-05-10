/**
 * @agent-runtime/observability · logger/correlation-id.ts (stub)
 * TODO · 真 fastify hook · 每请求 inject X-Request-Id · 全 log line 真带
 */
export interface CorrelationIdContext {
  readonly requestId: string;
}
