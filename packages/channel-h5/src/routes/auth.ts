/**
 * /api/auth/* · forward 到 platform-auth.
 *
 * 真透传 cookie · Set-Cookie · status · body.
 * 真 endpoints (跟 platform-auth /api/auth/* 一致):
 *   POST /api/auth/send_code
 *   POST /api/auth/verify_code
 *   GET  /api/auth/me
 *   POST /api/auth/logout
 */
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { forwardAuth, type ForwardResp } from "../api/auth-client.js";

interface AuthRouteOpts {
  authApi: string;
}

function applyForward(reply: FastifyReply, r: ForwardResp): void {
  // 真透 Set-Cookie (platform-auth 真种 domain=.agentaily.com)
  const setCookie = r.headers["set-cookie"];
  if (setCookie) {
    if (Array.isArray(setCookie)) {
      for (const c of setCookie) reply.header("set-cookie", c);
    } else {
      reply.header("set-cookie", setCookie);
    }
  }
  reply.type("application/json").code(r.statusCode).send(r.body);
}

export async function registerAuthRoutes(
  app: FastifyInstance,
  opts: AuthRouteOpts,
): Promise<void> {
  app.post(
    "/api/auth/send_code",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const r = await forwardAuth({
        authApi: opts.authApi,
        path: "/api/auth/send_code",
        method: "POST",
        cookieHeader: req.headers["cookie"],
        body: req.body,
      });
      applyForward(reply, r);
    },
  );

  app.post(
    "/api/auth/verify_code",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const r = await forwardAuth({
        authApi: opts.authApi,
        path: "/api/auth/verify_code",
        method: "POST",
        cookieHeader: req.headers["cookie"],
        body: req.body,
      });
      applyForward(reply, r);
    },
  );

  app.get(
    "/api/auth/me",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const r = await forwardAuth({
        authApi: opts.authApi,
        path: "/api/auth/me",
        method: "GET",
        cookieHeader: req.headers["cookie"],
      });
      applyForward(reply, r);
    },
  );

  app.post(
    "/api/auth/logout",
    async (req: FastifyRequest, reply: FastifyReply) => {
      const r = await forwardAuth({
        authApi: opts.authApi,
        path: "/api/auth/logout",
        method: "POST",
        cookieHeader: req.headers["cookie"],
      });
      applyForward(reply, r);
    },
  );
}
