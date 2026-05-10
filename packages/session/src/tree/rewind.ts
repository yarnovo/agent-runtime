/**
 * @agent-runtime/session · tree/rewind.ts (stub)
 * TODO REQ-008 · 真回退到指定 message · 真删后续
 */
export interface RewindSessionInput {
  readonly sessionId: string;
  readonly toMessageIndex: number;
}
