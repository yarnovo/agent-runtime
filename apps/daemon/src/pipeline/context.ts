/**
 * pipeline 共享 context · 每 step 收 + 返 (不 mutate · 真 functional pass-through)。
 *
 * Phase 0 stub · 字段空 · 真后续 Phase 1+ 各 step 真填。
 */
export interface PipelineContext {
  // TODO Phase 1+ · 真各 step 真填字段 (userId / tenantId / session / sandbox / llmResponse / ...)
  readonly requestId?: string;
}
