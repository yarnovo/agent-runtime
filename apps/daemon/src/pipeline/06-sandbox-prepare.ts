import type { PipelineContext } from "./context.js";

/**
 * Step 06 · sandbox-prepare · 申请 / 复用 sandbox · warm pool 取一个。
 * TODO REQ-006 · 真接 packages/sandbox (pool / adapters / exec)
 */
export async function sandboxPrepareStep(ctx: PipelineContext): Promise<PipelineContext> {
  return ctx;
}
