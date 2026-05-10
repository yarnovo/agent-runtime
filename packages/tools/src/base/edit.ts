/**
 * @agent-runtime/tools · base/edit.ts (stub)
 * TODO · 真 agent 内置 Edit tool · 精确字符串替换 (Claude Code 风格)
 */
export interface EditToolInput {
  readonly path: string;
  readonly oldString: string;
  readonly newString: string;
}
