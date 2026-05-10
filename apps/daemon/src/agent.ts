import { Agent } from "@earendil-works/pi-agent-core";
import type { AgentMessage } from "@earendil-works/pi-agent-core";
import type { Message } from "@earendil-works/pi-ai";
import { dashscopeModel, getDashScopeApiKey } from "./llm.js";

/**
 * Phase 0 hardcode SOUL · 后续 Phase 1 改 dynamic load from agents/<X>/soul.md。
 */
const SOUL = "你是 AI 助手 · 简单聊天 · 回复尽量简洁。";

/**
 * 创建一个 hello-world agent 实例。
 *
 * Phase 0 不接 sandbox / multi-channel / multi-agent / NAS · 只跑通 1 句对话。
 * 每次调用返回新实例 · in-memory · 进程死即丢。
 */
export function createHelloAgent(): Agent {
  return new Agent({
    initialState: {
      systemPrompt: SOUL,
      model: dashscopeModel(),
      thinkingLevel: "off",
      tools: [],
      messages: [],
    },
    convertToLlm: (messages: AgentMessage[]): Message[] => messages as Message[],
    getApiKey: () => getDashScopeApiKey(),
  });
}
