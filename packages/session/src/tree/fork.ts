/**
 * @agent-runtime/session · tree/fork.ts (stub)
 * TODO REQ-008 · 真 session 分叉 (alt path / 试错)
 */
export interface ForkSessionInput {
  readonly parentSessionId: string;
  readonly fromMessageIndex: number;
}
