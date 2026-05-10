import { afterEach, beforeEach, describe, expect, it } from "vitest";
import Fastify from "fastify";
import sensible from "@fastify/sensible";
import { Agent } from "@earendil-works/pi-agent-core";
import {
  fauxAssistantMessage,
  fauxText,
  registerFauxProvider,
} from "@earendil-works/pi-ai";
import type { FauxProviderRegistration } from "@earendil-works/pi-ai";
import type { AgentMessage } from "@earendil-works/pi-agent-core";
import type { Message } from "@earendil-works/pi-ai";
import { registerChatRoute } from "../src/routes/chat.js";

let faux: FauxProviderRegistration;

function buildFakeAgent(): Agent {
  return new Agent({
    initialState: {
      systemPrompt: "test soul",
      model: faux.getModel(),
      thinkingLevel: "off",
      tools: [],
      messages: [],
    },
    convertToLlm: (messages: AgentMessage[]): Message[] => messages as Message[],
  });
}

describe("POST /chat (SSE stream)", () => {
  beforeEach(() => {
    faux = registerFauxProvider({
      api: "openai-completions",
      provider: "faux-dashscope",
      models: [{ id: "qwen-faux", name: "Faux Qwen" }],
      tokensPerSecond: 9999, // 测试不要等
      tokenSize: { min: 1, max: 2 },
    });
    faux.setResponses([
      fauxAssistantMessage([fauxText("你好")], { stopReason: "stop" }),
    ]);
  });

  afterEach(() => {
    faux.unregister();
  });

  it("emits at least 1 token event and 1 done event", async () => {
    const app = Fastify({ logger: false });
    await app.register(sensible);
    await registerChatRoute(app, buildFakeAgent);
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/chat",
      headers: { "content-type": "application/json" },
      payload: { msg: "你好" },
    });

    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toMatch(/text\/event-stream/);

    const body = res.body;
    const events = body
      .split("\n\n")
      .filter((chunk) => chunk.trim().length > 0)
      .map((chunk) => {
        const lines = chunk.split("\n");
        const evt = lines.find((l) => l.startsWith("event: "))?.slice(7) ?? "";
        const dat = lines.find((l) => l.startsWith("data: "))?.slice(6) ?? "{}";
        return { event: evt, data: JSON.parse(dat) as Record<string, unknown> };
      });

    const tokenEvents = events.filter((e) => e.event === "token");
    const doneEvents = events.filter((e) => e.event === "done");

    expect(tokenEvents.length).toBeGreaterThanOrEqual(1);
    expect(doneEvents.length).toBe(1);

    const fullText = tokenEvents.map((e) => e.data.text as string).join("");
    expect(fullText).toBe("你好");

    await app.close();
  });

  it("rejects empty msg with 400", async () => {
    const app = Fastify({ logger: false });
    await app.register(sensible);
    await registerChatRoute(app, buildFakeAgent);
    await app.ready();

    const res = await app.inject({
      method: "POST",
      url: "/chat",
      headers: { "content-type": "application/json" },
      payload: { msg: "" },
    });

    expect(res.statusCode).toBe(400);
    await app.close();
  });
});
