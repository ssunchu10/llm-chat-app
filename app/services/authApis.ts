import { signIn } from "next-auth/react";

async function json<T>(r: Response): Promise<T> {
  if (!r.ok) throw new Error("Request failed");
  return r.json();
}

export const authApi = {
  async checkEmail(email: string) {
    const r = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
    return json<{ exists: boolean; hasPassword: boolean }>(r);
  },
  async register(email: string, password: string) {
    const r = await fetch("/api/auth/register", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!r.ok) throw new Error("Failed to register");
  },
  async setPassword(email: string, password: string) {
    const r = await fetch("/api/auth/set-password", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!r.ok) throw new Error("Failed to set password");
  },
  async login(email: string, password: string) {
    const res = await signIn("credentials", { email, password, redirect: false, callbackUrl: "/" });
    if (!res?.ok) throw new Error("Invalid credentials");
  },
  oauth(provider: "google" | "github") {
    signIn(provider, { callbackUrl: "/" });
  },
};
