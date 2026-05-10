/**
 * chat-stream · SSE wrapper for channel-h5 /api/chat (forward to daemon /chat).
 *
 * 协议跟 daemon /chat 一致:
 *   event: token       data: { "text": "..." }
 *   event: tool_call   data: { "tool": "X", "args": {} }
 *   event: tool_result data: { "tool": "X", "result": {}, "isError": false }
 *   event: done        data: {}
 *   event: error       data: { "message": "..." }
 *
 * 真本仓 channel-h5 /api/chat 真**真无** mock 兜底 (真生产 daemon 真起).
 * 真 dev mode 直连本机 daemon · 真 prod 真 SPA 真同源 fetch /api/chat.
 */

export interface ChatStreamHandlers {
  onToken?: (text: string) => void;
  onToolCall?: (ev: { tool: string; args: unknown }) => void;
  onToolResult?: (ev: { tool: string; result: unknown; isError: boolean }) => void;
  onDone?: () => void;
  onError?: (msg: string) => void;
}

export async function chatStream(
  msg: string,
  handlers: ChatStreamHandlers,
  signal?: AbortSignal,
): Promise<void> {
  const r = await fetch(`/api/chat`, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "text/event-stream" },
    body: JSON.stringify({ msg }),
    credentials: "include",
    signal,
  });
  if (!r.ok || !r.body) {
    handlers.onError?.(`agent-runtime ${r.status}`);
    return;
  }

  const reader = r.body.getReader();
  const dec = new TextDecoder();
  let buf = "";
  let currentEvent = "token";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      if (line.startsWith("event:")) {
        currentEvent = line.slice(6).trim();
      } else if (line.startsWith("data:")) {
        const data = line.slice(5).trim();
        if (!data) continue;
        try {
          const j = JSON.parse(data);
          if (currentEvent === "token" && j.text) handlers.onToken?.(j.text);
          else if (currentEvent === "tool_call") handlers.onToolCall?.(j);
          else if (currentEvent === "tool_result") handlers.onToolResult?.(j);
          else if (currentEvent === "done") handlers.onDone?.();
          else if (currentEvent === "error") handlers.onError?.(j.message ?? "unknown");
        } catch {
          /* non-json ignore */
        }
      }
    }
  }
}
