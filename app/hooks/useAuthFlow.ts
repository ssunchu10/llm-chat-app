import { useMemo, useState, useCallback } from "react";
import { AuthMode } from "@app/types/login";
import { authApi } from "@app/services/authApis";

const EMAIL_RE = /.+@.+\..+/;

export function useAuthFlow({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [checking, setChecking] = useState(false);
  const [didCheck, setDidCheck] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(null);

  const isEmailValid = EMAIL_RE.test(email);

  const mode: AuthMode = useMemo(() => {
    if (!didCheck) return "register";
    if (emailExists) return hasPassword ? "login" : "set";
    return "register";
  }, [didCheck, emailExists, hasPassword]);

  const canSubmit = useMemo(() => {
    if (!didCheck) return false;
    if (!isEmailValid) return false;
    if (mode === "login") return password.length >= 6;
    return password.length >= 6 && password === confirmPassword;
  }, [didCheck, isEmailValid, mode, password, confirmPassword]);

  const checkEmail = useCallback(async () => {
    setError(null);
    if (!isEmailValid) {
      setError("Invalid email address");
      return;
    }
    setChecking(true);
    try {
      const data = await authApi.checkEmail(email);
      setEmailExists(Boolean(data.exists));
      setHasPassword(Boolean(data.hasPassword));
      setDidCheck(true);
    } catch (e: any) {
      setError(e?.message || "Email check failed");
      setEmailExists(false);
      setHasPassword(false);
      setDidCheck(false);
    } finally {
      setChecking(false);
    }
  }, [email, isEmailValid]);

  const submit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      if (mode === "login") {
        await authApi.login(email, password);
        onSuccess();
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (mode === "register") {
        await authApi.register(email, password);
      } else {
        await authApi.setPassword(email, password);
      }
      await authApi.login(email, password);
      onSuccess();
    } catch (e: any) {
      setError(e?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  }, [canSubmit, mode, email, password, confirmPassword, onSuccess]);

  const oauth = useCallback((provider: "google" | "github") => {
    setOauthLoading(provider);
    authApi.oauth(provider);
  }, []);

  const resetCheck = useCallback((next: boolean) => setDidCheck(next), []);

  return {
    state: {
      email, password, confirmPassword,
      checking, didCheck, emailExists, hasPassword,
      loading, oauthLoading, error,
    },
    actions: {
      setEmail, setPassword, setConfirmPassword,
      checkEmail, submit, oauth, resetCheck,
    },
    derived: { isEmailValid, canSubmit, mode },
  };
}
