/**
 * channel-h5 ui · auth API client.
 *
 * 真 unified login 老板 5-11 anchor · 真**真**: 真 send_code / verify_code 砍 (真 sso.agentaily.com 真接).
 * 本 plugin 自身只 forward /api/auth/me + /api/auth/logout.
 *
 * 真 fetch with `credentials: 'include'` · cookie `akong_session` 真自动跨子域 (.agentaily.com) 带.
 */

export interface User {
  id: number;
  phone: string;
  nickname: string;
}

async function jsonOrThrow<T>(r: Response): Promise<T> {
  if (!r.ok) {
    let detail = `HTTP ${r.status}`;
    try {
      const body = await r.json();
      if (body?.detail) detail = String(body.detail);
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }
  return r.json() as Promise<T>;
}

export async function fetchMe(): Promise<User | null> {
  const r = await fetch(`/api/auth/me`, { credentials: "include" });
  if (r.status === 401) return null;
  return jsonOrThrow<User>(r);
}

export async function logout(): Promise<void> {
  await fetch(`/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

/**
 * 真 unified login redirect URL · sso.agentaily.com.
 *
 * 用 location.href 当前页 · 真 sso login 成功后 redirect back.
 */
export function ssoLoginUrl(): string {
  const next = window.location.href;
  return `https://sso.agentaily.com/login?redirect=${encodeURIComponent(next)}`;
}
