/**
 * @agent-runtime/llm · streaming/retry.ts (stub)
 * TODO · 真 LLM 调用 retry · exponential backoff + jitter
 */
export interface RetryPolicy {
  readonly maxAttempts: number;
  readonly initialDelayMs: number;
}
