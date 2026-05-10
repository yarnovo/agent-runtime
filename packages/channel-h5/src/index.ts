/**
 * @agent-runtime/channel-h5 · public exports
 *
 * 用户访问 m.<agent>.<team>.agentaily.com → daemon hit 本 plug-in:
 *   /              SPA (vite-built React · folded from akong-hr/apps/web)
 *   /api/auth/*    forward platform-auth
 *   /api/chat      SSE forward daemon agent core
 *
 * 接 aily-ui (auth-login + chat-layout + chat-bubble + chat-input).
 */
export { channelH5Plugin, type ChannelH5Opts } from "./server.js";
