/**
 * AuthGate · unauth → redirect sso.agentaily.com (老板 5-11 anchor unified login).
 *
 * 真**真**: 真**真** router push /login (真 channel-h5 真**真无** LoginPage).
 * 真用 window.location.href 真 hard redirect 跨域 sso · 真 sso 登录成功后 redirect back.
 */
import { useEffect, type ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { ssoLoginUrl } from "../api/auth";

export default function AuthGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = ssoLoginUrl();
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="loading" data-testid="auth-loading">
        加载中...
      </div>
    );
  }
  if (!user) {
    return (
      <div className="loading" data-testid="auth-redirecting-sso">
        跳转登录...
      </div>
    );
  }
  return <>{children}</>;
}
