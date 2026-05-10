import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import type { Agent } from "@earendil-works/pi-agent-core";
import { createHelloAgent } from "../agent.js";

interface ChatBody {
  msg: string;
}

/**
 * 注册 POST /chat · SSE 流式返回。
 *
 * 协议:
 *   event: token       data: { "text": "你" }
 *   event: tool_call   data: { "tool": "X", "args": {...} }
 *   event: tool_result data: { "tool": "X", "result": {...} }
 *   event: done        data: {}
 *   event: error       data: { "message": "..." }
 *
 * Phase 0 hardcode 单 agent · 每请求新建一次性 Agent 实例 · 不复用 session。
 *
 * @param agentFactory 可选 · 测试时注入 fake agent (registerFauxProvider 路径)。
 */
export async function registerChatRoute(
  app: FastifyInstance,
  agentFactory: () => Agent = createHelloAgent,
): Promise<void> {
  app.post<{ Body: ChatBody }>(
    "/chat",
    {
      schema: {
        body: {
          type: "object",
          required: ["msg"],
          properties: {
            msg: { type: "string", minLength: 1 },
          },
        },
      },
    },
    async (req: FastifyRequest<{ Body: ChatBody }>, reply: FastifyReply) => {
      const { msg } = req.body;

      reply.raw.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      });

      const write = (event: string, data: unknown): void => {
        reply.raw.write(`event: ${event}\n`);
        reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
      };

      const agent = agentFactory();
      let errored = false;

      const unsubscribe = agent.subscribe((event) => {
        if (event.type === "message_update") {
          const inner = event.assistantMessageEvent;
          if (inner.type === "text_delta" && inner.delta) {
            write("token", { text: inner.delta });
          }
        } else if (event.type === "tool_execution_start") {
          write("tool_call", { tool: event.toolName, args: event.args });
        } else if (event.type === "tool_execution_end") {
          write("tool_result", {
            tool: event.toolName,
            result: event.result,
            isError: event.isError,
          });
        }
      });

      try {
        await agent.prompt(msg);
        await agent.waitForIdle();
      } catch (err) {
        errored = true;
        const message = err instanceof Error ? err.message : String(err);
        write("error", { message });
      } finally {
        unsubscribe();
      }

      if (!errored && agent.state.errorMessage) {
        write("error", { message: agent.state.errorMessage });
      }

      write("done", {});
      reply.raw.end();
    },
  );
}
