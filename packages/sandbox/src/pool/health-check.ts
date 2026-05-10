/**
 * @agent-runtime/sandbox · pool/health-check.ts (stub)
 * TODO REQ-006 · 真定时探活 · 死的 sandbox 真自愈
 */
export interface HealthReport {
  readonly sandboxId: string;
  readonly healthy: boolean;
}
