import type { Model } from "@earendil-works/pi-ai";

/**
 * DashScope (阿里云灵积) OpenAI-compatible endpoint。
 *
 * 参考: https://help.aliyun.com/zh/model-studio/developer-reference/compatibility-of-openai-with-dashscope
 *
 * Phase 0 用 openai-completions API · 走 OpenAI Chat Completions 兼容路径。
 */
const DASHSCOPE_BASE_URL =
  process.env.DASHSCOPE_BASE_URL ?? "https://dashscope.aliyuncs.com/compatible-mode/v1";

const DEFAULT_MODEL_ID = process.env.DASHSCOPE_MODEL ?? "qwen-max";

/**
 * 构造 DashScope 模型描述。
 *
 * 不调 `getModel("openai", ...)` · 因为 PI 内置注册表里没有 DashScope。
 * 直接构造 Model<"openai-completions"> 数据结构 · 让 streamSimple 走 openai-completions provider。
 */
export function dashscopeModel(modelId: string = DEFAULT_MODEL_ID): Model<"openai-completions"> {
  return {
    id: modelId,
    name: modelId,
    api: "openai-completions",
    provider: "dashscope",
    baseUrl: DASHSCOPE_BASE_URL,
    reasoning: false,
    input: ["text"],
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
    contextWindow: 32_000,
    maxTokens: 2_048,
    compat: {
      supportsStore: false,
      supportsDeveloperRole: false,
      supportsReasoningEffort: false,
      supportsUsageInStreaming: true,
      maxTokensField: "max_tokens",
      requiresToolResultName: false,
      requiresAssistantAfterToolResult: false,
      requiresThinkingAsText: false,
      requiresReasoningContentOnAssistantMessages: false,
      thinkingFormat: "qwen",
      sendSessionAffinityHeaders: false,
      supportsLongCacheRetention: false,
      supportsStrictMode: false,
    },
  };
}

export function getDashScopeApiKey(): string {
  const key = process.env.DASHSCOPE_API_KEY;
  if (!key) {
    throw new Error(
      "DASHSCOPE_API_KEY 环境变量未设置 · 复制 .env.example 到 .env 填入或 docker run -e 注入",
    );
  }
  return key;
}
