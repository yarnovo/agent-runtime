/**
 * ChatPage · channel-h5 唯一页 (老板 5-11 anchor · m.<agent>.<team>.agentaily.com 主入口).
 *
 * 接 @aily-ui/chat-layout + chat-bubble + chat-input · 不 hand-roll.
 * 发消息走 /api/chat (daemon SSE forward).
 *
 * AGENT_NAME / AGENT_SLUG · 真 build-time inject (VITE_AGENT_NAME · VITE_AGENT_SLUG).
 * default xiaoxi (阿空小喜).
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { ChatLayout } from "@aily-ui/chat-layout";
import "@aily-ui/chat-layout/style.css";
import { ChatBubble } from "@aily-ui/chat-bubble";
import "@aily-ui/chat-bubble/style.css";
import { ChatInput } from "@aily-ui/chat-input";
import "@aily-ui/chat-input/style.css";
import { chatStream } from "../../api/chat";
import { useAuth } from "../../auth/AuthContext";

const AGENT_SLUG = import.meta.env.VITE_AGENT_SLUG || "xiaoxi";
const AGENT_NAME = import.meta.env.VITE_AGENT_NAME || "阿空小喜";

interface Msg {
  id: string;
  role: "user" | "assistant";
  text: string;
  status?: "sending" | "sent" | "failed";
}

export default function ChatPage() {
  const { user, signOut } = useAuth();

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const send = useCallback(
    async (text: string) => {
      if (streaming) return;
      const userMsg: Msg = {
        id: `u-${Date.now()}`,
        role: "user",
        text,
        status: "sent",
      };
      const asstId = `a-${Date.now()}`;
      setMsgs((prev) => [
        ...prev,
        userMsg,
        { id: asstId, role: "assistant", text: "" },
      ]);
      setInput("");
      setStreaming(true);

      const ctrl = new AbortController();
      abortRef.current = ctrl;
      try {
        await chatStream(
          text,
          {
            onToken: (delta) => {
              setMsgs((prev) =>
                prev.map((m) =>
                  m.id === asstId ? { ...m, text: m.text + delta } : m,
                ),
              );
            },
            onError: (err) => {
              setMsgs((prev) =>
                prev.map((m) =>
                  m.id === asstId
                    ? { ...m, text: `(出错: ${err})`, status: "failed" }
                    : m,
                ),
              );
            },
          },
          ctrl.signal,
        );
      } finally {
        setStreaming(false);
      }
    },
    [streaming],
  );

  return (
    <div className="page chat" data-testid={`chat-page-${AGENT_SLUG}`}>
      <ChatLayout
        scrollKey={msgs.length}
        ariaLabel={`chat-${AGENT_SLUG}`}
        header={
          <div className="chat-header">
            <span className="name" data-testid="chat-agent-name">
              {AGENT_NAME}
            </span>
            <button
              className="logout"
              onClick={() => {
                void signOut().then(() => {
                  window.location.reload();
                });
              }}
              data-testid="chat-logout"
              aria-label="退出"
            >
              退出
            </button>
            {user && (
              <span className="user-tag" data-testid="chat-user-tag">
                {user.nickname || user.phone}
              </span>
            )}
          </div>
        }
        footer={
          <ChatInput
            value={input}
            onChange={setInput}
            onSend={send}
            disabled={streaming}
            placeholder={`跟${AGENT_NAME}说...`}
          />
        }
      >
        {msgs.length === 0 && (
          <div className="hint" data-testid="chat-empty-hint">
            发条消息开始
          </div>
        )}
        {msgs.map((m) => (
          <div key={m.id} data-testid={`msg-${m.role}-${m.id}`}>
            <ChatBubble
              role={m.role}
              variant="text"
              content={m.text || (m.role === "assistant" ? "..." : "")}
              status={m.role === "user" ? m.status : undefined}
            />
          </div>
        ))}
      </ChatLayout>
    </div>
  );
}
