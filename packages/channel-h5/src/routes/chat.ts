import type { FastifyInstance } from "fastify";

/**
 * @agent-runtime/channel-h5 · routes/chat.ts (stub)
 * TODO REQ-012 · /h5/chat SSE endpoint · forward 到 daemon core agent
 *
 * 协议同 daemon /chat (token / tool_call / tool_result / done / error)。
 * Phase 1 实施时直接 import @agent-runtime/core 的 agent factory · 不再复制 SSE 写法。
 */
export async function registerH5ChatRoute(_app: FastifyInstance): Promise<void> {
  // stub
}
