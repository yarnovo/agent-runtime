/**
 * @agent-runtime/observability · cost/runtime-cost.ts (stub)
 * TODO · 真核算 sandbox 真 vCPU·sec + 内存·sec + NAS / OSS IO · 真合 SaaS 单用户成本
 */
export interface RuntimeCost {
  readonly vCpuSeconds: number;
  readonly memoryMbSeconds: number;
  readonly storageBytes: number;
  readonly totalUsd: number;
}
