import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

/**
 * channel-h5 UI · 真 SPA build 入口.
 *
 * outDir 真 src/ui/dist · 真 fastify-static (server.ts) 真 serve 同路径.
 * base '/' · 真 m.<agent>.<team>.agentaily.com 根挂.
 */
export default defineConfig({
  root: here,
  base: "/",
  plugins: [react()],
  server: { port: 5181 },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
  },
});
