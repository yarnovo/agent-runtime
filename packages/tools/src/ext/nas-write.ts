/**
 * @agent-runtime/tools · ext/nas-write.ts (stub)
 * TODO REQ-002 · 真写 user NAS path · 跨 session 持久数据
 */
export interface NasWriteToolInput {
  readonly path: string;
  readonly content: string;
}
