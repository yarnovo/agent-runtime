/**
 * App · channel-h5 路由 (老板 5-11 anchor · unified login by sso.agentaily.com).
 *
 *  - / → ChatPage (AuthGate 守卫 · unauth → redirect sso 真 unified login)
 *  - 真**真无** /login route (真用 sso 真 unified)
 *
 * AGENT_SLUG 真 build-time inject (VITE_AGENT_SLUG · default xiaoxi).
 */
import { Navigate, Route, Routes } from "react-router-dom";
import AuthGate from "./auth/AuthGate";
import ChatPage from "./pages/chat/ChatPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthGate>
            <ChatPage />
          </AuthGate>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
