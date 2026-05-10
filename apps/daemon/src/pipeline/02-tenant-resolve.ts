import type { PipelineContext } from "./context.js";

/**
 * Step 02 · tenant-resolve · 用 user identity → tenant + agent role。
 * TODO Phase 3 · 真接 multi-agent routing (REQ-004)
 */
export async function tenantResolveStep(ctx: PipelineContext): Promise<PipelineContext> {
  return ctx;
}
