/**
 * @agent-runtime/sandbox · exec/run-code.ts (stub)
 * TODO REQ-006 · 真 sandbox 内跑 LLM 生成代码 (Python / Node / shell)
 */
export interface RunCodeRequest {
  readonly language: "python" | "node" | "bash";
  readonly source: string;
}
