/**
 * @agent-runtime/observability · tracer/llm-call.ts (stub)
 * TODO · 真 trace LLM 调用 (provider / model / tokens / latency / cost)
 */
export interface LlmCallTrace {
  readonly provider: string;
  readonly model: string;
  readonly inputTokens: number;
  readonly outputTokens: number;
  readonly latencyMs: number;
}
