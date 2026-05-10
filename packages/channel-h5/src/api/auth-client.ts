/**
 * platform-auth fetch helper · forward Set-Cookie / Cookie / status / body 透传。
 *
 * 真 cookie domain `.agentaily.com` · 真 platform-auth 服务端种 · 本 plugin 只透传。
 * 真不解析 cookie · 真不本地 sign · 真零信任。
 */
import { request } from "undici";

export interface ForwardResp {
  statusCode: number;
  headers: Record<string, string | string[] | undefined>;
  body: string;
}

export async function forwardAuth(opts: {
  authApi: string;
  path: string;
  method: "GET" | "POST";
  cookieHeader?: string;
  body?: unknown;
}): Promise<ForwardResp> {
  const url = `${opts.authApi.replace(/\/$/, "")}${opts.path}`;
  const headers: Record<string, string> = {};
  if (opts.cookieHeader) headers["cookie"] = opts.cookieHeader;
  if (opts.body !== undefined) headers["content-type"] = "application/json";

  const r = await request(url, {
    method: opts.method,
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });
  const text = await r.body.text();
  return {
    statusCode: r.statusCode,
    headers: r.headers,
    body: text,
  };
}
