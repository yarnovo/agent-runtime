import type { PipelineContext } from "./context.js";

/**
 * Step 08 · persist · 写回 conversation / cost / metric · NAS + RDS。
 * TODO REQ-002 · 真接 packages/storage + packages/observability
 */
export async function persistStep(ctx: PipelineContext): Promise<PipelineContext> {
  return ctx;
}
