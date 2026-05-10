/**
 * @agent-runtime/budget · tracking/per-user-meter.ts (stub)
 * TODO · 真每用户 token + 调用次数 + cost · 上报 RDS
 */
export interface UserMeter {
  readonly userId: string;
  readonly totalTokens: number;
  readonly totalCalls: number;
}
