/**
 * @agent-runtime/core · agent.ts (stub)
 *
 * PI Agent 包装 · 跟 daemon 临时 agent.ts 解耦的真目的。
 * TODO Phase 1 · 真把 apps/daemon/src/agent.ts 真切到这里。
 */
export interface RuntimeAgent {
  readonly soul: string;
}
