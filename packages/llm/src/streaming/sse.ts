/**
 * @agent-runtime/llm · streaming/sse.ts (stub)
 * TODO · 真 SSE chunk 解析 → token / tool_call event
 */
export interface SSEStreamHandler {
  readonly onToken: (text: string) => void;
}
