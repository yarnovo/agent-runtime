/**
 * @agent-runtime/budget · quota/token-budget.ts (stub)
 * TODO · 真单次请求 token 上限 + 用户日 token 上限
 */
export interface TokenBudget {
  readonly perRequestMax: number;
  readonly perUserDailyMax: number;
}
