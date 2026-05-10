/**
 * @agent-runtime/tools · ext/sandbox-run.ts (stub)
 * TODO REQ-006 · 真 sandbox 内跑 LLM 生成代码 · 真薄壳 packages/sandbox/exec/run-code
 */
export interface SandboxRunToolInput {
  readonly language: "python" | "node" | "bash";
  readonly source: string;
}
