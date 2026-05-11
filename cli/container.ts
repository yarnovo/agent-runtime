#!/usr/bin/env -S node --import tsx
/**
 * agent-runtime/cli/container.ts · Layer 1 runtime hermes
 *
 * 跨 agent 通用 service: 操作 agent 容器 (docker run / stop / list).
 *
 * 用法:
 *   tsx cli/container.ts list
 *   tsx cli/container.ts start <slug> <image> [port]
 *   tsx cli/container.ts stop <slug>
 *
 * 老板 5-11 蓝图: 每 agent 都有自己 cli/ (Layer 2 agent hermes) · 调本 CLI 起容器.
 */
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const exec = promisify(execFile);

async function list(): Promise<void> {
  const { stdout } = await exec("docker", [
    "ps",
    "--filter",
    "name=^agent-",
    "--format",
    "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}",
  ]);
  process.stdout.write(stdout);
}

async function start(slug: string, image: string, port?: number): Promise<void> {
  const args = ["run", "-d", "--name", `agent-${slug}`, "-e", `AGENT_SLUG=${slug}`];
  if (port) args.push("-p", `${port}:8080`);
  args.push(image);
  const { stdout } = await exec("docker", args);
  console.log(`started agent-${slug} · container id: ${stdout.trim()}`);
}

async function stop(slug: string): Promise<void> {
  await exec("docker", ["stop", `agent-${slug}`]).catch(() => undefined);
  await exec("docker", ["rm", `agent-${slug}`]).catch(() => undefined);
  console.log(`stopped & removed agent-${slug}`);
}

async function main(): Promise<void> {
  const [cmd, ...rest] = process.argv.slice(2);
  switch (cmd) {
    case "list":
      await list();
      break;
    case "start": {
      const [slug, image, portStr] = rest;
      if (!slug || !image) {
        console.error("usage: container.ts start <slug> <image> [port]");
        process.exit(1);
      }
      await start(slug, image, portStr ? Number(portStr) : undefined);
      break;
    }
    case "stop": {
      const [slug] = rest;
      if (!slug) {
        console.error("usage: container.ts stop <slug>");
        process.exit(1);
      }
      await stop(slug);
      break;
    }
    default:
      console.error("usage: container.ts <list|start|stop> [...args]");
      process.exit(1);
  }
}

void main();
