import type { FastifyInstance } from "fastify";

/**
 * 管理面 route stub · 后续接 sandbox 池 / session 管理 / 成本统计 等内部接口。
 *
 * Phase 0 不挂任何 endpoint · 真只占位。
 *
 * TODO · 接 packages/observability + packages/sandbox 后真起 GET /admin/sandboxes 等。
 */
export async function registerAdminRoutes(_app: FastifyInstance): Promise<void> {
  // stub
}
