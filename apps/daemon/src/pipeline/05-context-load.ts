import type { PipelineContext } from "./context.js";

/**
 * Step 05 · context-load · 装载历史 message / SOUL / skill / NAS 持久数据。
 * TODO REQ-001 · 真接 packages/storage (nas / oss / rds)
 */
export async function contextLoadStep(ctx: PipelineContext): Promise<PipelineContext> {
  return ctx;
}
