/**
 * @agent-runtime/observability · cost/token-cost.ts (stub)
 * TODO · 真按 provider 单价 · 输入 / 输出 / cache token 真核算
 */
export interface TokenCost {
  readonly inputUsd: number;
  readonly outputUsd: number;
  readonly cacheUsd: number;
  readonly totalUsd: number;
}
