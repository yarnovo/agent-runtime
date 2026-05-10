/**
 * agent core forward · /chat SSE forward 到 daemon 自身 chat route (本进程内).
 *
 * 当前 daemon 已 register `POST /chat` (apps/daemon/src/routes/chat.ts).
 * channel-h5 复用同进程 fastify · 内部 inject (不绕一圈 HTTP 自打自).
 *
 * 真生产 channel-h5 跟 daemon 同进程 (single FC container).
 * 未来 channel-h5 拆独立服务时 · 改用 undici request HTTP forward (header authorization
 * 真 user_id 从 cookie 解 · 真带 Bearer)。
 */
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export interface AgentChatBody {
  msg: string;
}

/**
 * 真 inject /chat 到本 fastify · 真透传 SSE stream.
 * 当前实现: 调 app.inject + pipe 不可行 (inject 真不流式).
 * 真 channel-h5 自己挂 /chat (fastify 路由冲突) · 真 register 在 prefix `/api/h5/chat`.
 */
export async function streamFromDaemon(
  app: FastifyInstance,
  body: AgentChatBody,
  reply: FastifyReply,
): Promise<void> {
  // 暂时直接调 daemon /chat (HTTP self-call · 走 internal port).
  // TODO REQ-013 · 改 in-process emit (避免自打自)
  const port = (app.server.address() as { port?: number } | null)?.port;
  if (!port) {
    reply.code(500).send({ error: "no port available for self-forward" });
    return;
  }
  const { request: undiciRequest } = await import("undici");
  const r = await undiciRequest(`http://127.0.0.1:${port}/chat`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "text/event-stream" },
    body: JSON.stringify(body),
  });

  reply.raw.writeHead(r.statusCode, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "X-Accel-Buffering": "no",
  });
  for await (const chunk of r.body) {
    reply.raw.write(chunk);
  }
  reply.raw.end();
}

export async function preflightDaemon(
  _req: FastifyRequest,
  _reply: FastifyReply,
): Promise<void> {
  // placeholder · 真未来 verify session/auth/quota 前置.
}
