/**
 * /* · serve vite build dist (src/ui/dist).
 *
 * SPA history mode · 任何 non-/api/* 路径都 fallback `index.html`.
 * 真生产 fastify-static 真负责 etag / cache-control.
 */
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
// dist/routes/static.js → ../../src/ui/dist
const UI_DIST = join(here, "..", "..", "src", "ui", "dist");

export async function registerStaticRoutes(app: FastifyInstance): Promise<void> {
  if (!existsSync(UI_DIST)) {
    app.log.warn({ uiDist: UI_DIST }, "channel-h5 ui/dist not found · run `pnpm build:ui` first");
    return;
  }

  await app.register(fastifyStatic, {
    root: UI_DIST,
    prefix: "/",
    wildcard: false,
  });

  // SPA fallback · 任何不是 /api/* 也不是已知静态文件的路径都返回 index.html
  app.setNotFoundHandler(async (req: FastifyRequest, reply: FastifyReply) => {
    if (req.url.startsWith("/api/") || req.url.startsWith("/chat") || req.url.startsWith("/health")) {
      reply.code(404).send({ error: "not_found" });
      return;
    }
    return reply.sendFile("index.html");
  });
}
