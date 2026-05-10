import type { PipelineContext } from "./context.js";

/**
 * Step 01 · auth · 校验 cookie / JWT / OIDC token · 解析 user identity。
 * TODO REQ-009 · 真接 packages/auth (oidc / cookie / jwt) · platform-sso
 */
export async function authStep(ctx: PipelineContext): Promise<PipelineContext> {
  return ctx;
}
