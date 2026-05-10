/**
 * @agent-runtime/budget · guard/runaway-guard.ts (stub)
 * TODO · 真 agent 自循环失控 / 死循环 cut-off · 单 session step 上限
 */
export interface RunawayGuardConfig {
  readonly maxSteps: number;
  readonly maxWallClockMs: number;
}
