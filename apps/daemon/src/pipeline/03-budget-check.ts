import type { PipelineContext } from "./context.js";

/**
 * Step 03 · budget-check · 校验 token budget / rate limit / 用户余额。
 * TODO REQ-010 · 真接 packages/budget (quota / tracking / guard) · per-user token quota
 */
export async function budgetCheckStep(ctx: PipelineContext): Promise<PipelineContext> {
  return ctx;
}
