/**
 * @agent-runtime/sandbox · pool/pre-boot.ts (stub)
 * TODO REQ-006 · 真后台 pre-warm · 启 N 个 idle sandbox 候用
 */
export interface PreBootJob {
  readonly target: number;
  readonly inFlight: number;
}
