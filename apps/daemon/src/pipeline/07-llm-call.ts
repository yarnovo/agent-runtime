import type { PipelineContext } from "./context.js";

/**
 * Step 07 · llm-call · 调 LLM provider · 流 token + tool call event。
 * TODO · 真接 packages/llm (providers / streaming / registry)
 */
export async function llmCallStep(ctx: PipelineContext): Promise<PipelineContext> {
  return ctx;
}
