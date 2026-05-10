/**
 * @agent-runtime/observability · tracer/tool-call.ts (stub)
 * TODO · 真 trace agent tool 调用 (tool name / args / result / isError)
 */
export interface ToolCallTrace {
  readonly tool: string;
  readonly latencyMs: number;
  readonly isError: boolean;
}
