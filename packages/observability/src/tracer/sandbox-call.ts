/**
 * @agent-runtime/observability · tracer/sandbox-call.ts (stub)
 * TODO · 真 trace sandbox 调用 (boot / exec / destroy · cost)
 */
export interface SandboxCallTrace {
  readonly sandboxId: string;
  readonly action: "boot" | "exec" | "destroy";
  readonly latencyMs: number;
}
