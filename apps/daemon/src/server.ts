import Fastify from "fastify";
import sensible from "@fastify/sensible";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

/**
 * agent-runtime daemon · 容器调度器
 *
 * 老板 5-11 蓝图: agent-runtime = 容器 daemon 单仓 + Layer 1 runtime hermes CLI.
 *
 * 职责 (3 件):
 *   1. 启 / 停 / list agent 容器 (docker run --name agent-<slug> · 注入 AGENT_SLUG · mount channel-*)
 *   2. 暴露 GET /health (host 健康检查)
 *   3. 不 own /chat · /chat 在容器内由 agent 各自 channel 暴露
 *
 * 跨 agent 通用 service 走 cli/ (Layer 1 runtime hermes):
 *   cli/container.ts   docker run / stop / list
 *   cli/channel-qrcode.ts  生成 channel 接入二维码
 */

const PORT = Number(process.env.PORT ?? 8080);
const HOST = process.env.HOST ?? "0.0.0.0";

const exec = promisify(execFile);

interface ContainerInfo {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly status: string;
}

interface StartContainerBody {
  readonly agent_slug: string;
  readonly image: string;
  readonly env?: Record<string, string>;
  readonly port?: number;
}

interface StopContainerParams {
  readonly slug: string;
}

/**
 * docker ps · 列所有 agent-<slug> 容器.
 */
async function listAgentContainers(): Promise<ContainerInfo[]> {
  const { stdout } = await exec("docker", [
    "ps",
    "--filter",
    "name=^agent-",
    "--format",
    "{{.ID}}\t{{.Names}}\t{{.Image}}\t{{.Status}}",
  ]);
  return stdout
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line): ContainerInfo => {
      const [id, name, image, status] = line.split("\t");
      return {
        id: id ?? "",
        name: name ?? "",
        image: image ?? "",
        status: status ?? "",
      };
    });
}

/**
 * docker run agent-<slug> (detached · 容器内由 agent daemon 自跑).
 */
async function startAgentContainer(body: StartContainerBody): Promise<{ id: string }> {
  const args = ["run", "-d", "--name", `agent-${body.agent_slug}`];
  for (const [k, v] of Object.entries(body.env ?? {})) {
    args.push("-e", `${k}=${v}`);
  }
  args.push("-e", `AGENT_SLUG=${body.agent_slug}`);
  if (body.port) {
    args.push("-p", `${body.port}:8080`);
  }
  args.push(body.image);
  const { stdout } = await exec("docker", args);
  return { id: stdout.trim() };
}

/**
 * docker stop + rm agent-<slug>.
 */
async function stopAgentContainer(slug: string): Promise<void> {
  await exec("docker", ["stop", `agent-${slug}`]).catch(() => undefined);
  await exec("docker", ["rm", `agent-${slug}`]).catch(() => undefined);
}

export async function buildServer() {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? "info",
    },
  });

  await app.register(sensible);

  app.get("/health", async () => ({ status: "ok" }));

  app.get("/containers", async () => {
    const list = await listAgentContainers();
    return { containers: list };
  });

  app.post<{ Body: StartContainerBody }>(
    "/containers",
    {
      schema: {
        body: {
          type: "object",
          required: ["agent_slug", "image"],
          properties: {
            agent_slug: { type: "string", minLength: 1 },
            image: { type: "string", minLength: 1 },
            env: { type: "object" },
            port: { type: "number" },
          },
        },
      },
    },
    async (req) => {
      const result = await startAgentContainer(req.body);
      return result;
    },
  );

  app.delete<{ Params: StopContainerParams }>(
    "/containers/:slug",
    async (req) => {
      await stopAgentContainer(req.params.slug);
      return { ok: true };
    },
  );

  return app;
}

async function main(): Promise<void> {
  const app = await buildServer();
  try {
    await app.listen({ port: PORT, host: HOST });
    app.log.info(`agent-runtime daemon listening on http://${HOST}:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

const isMain = import.meta.url === `file://${process.argv[1]}`;
if (isMain) {
  void main();
}
