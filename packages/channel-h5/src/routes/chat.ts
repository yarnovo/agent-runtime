/**
 * /api/chat · SSE forward 到 daemon /chat (in-process self-call).
 *
 * 协议跟 daemon /chat 完全一致 (event: token / tool_call / tool_result / done / error).
 * UI 真用 fetch + ReadableStream parse (akong-hr/api-client/src/chat-stream.ts 已实现 mock 兜底).
 */
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { streamFromDaemon, type AgentChatBody } from "../api/agent-client.js";

export async function registerChatRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: AgentChatBody }>(
    "/api/chat",
    {
      schema: {
        body: {
          type: "object",
          required: ["msg"],
          properties: { msg: { type: "string", minLength: 1 } },
        },
      },
    },
    async (req: FastifyRequest<{ Body: AgentChatBody }>, reply: FastifyReply) => {
      await streamFromDaemon(app, req.body, reply);
    },
  );
}
