/**
 * @agent-runtime/sandbox · exec/run-shell.ts (stub)
 * TODO REQ-006 · 真 sandbox 内跑 shell 命令 (curl / git / pip 等)
 */
export interface RunShellRequest {
  readonly command: string;
  readonly timeoutMs: number;
}
