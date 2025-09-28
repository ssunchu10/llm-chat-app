"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Header from "@app/components/login/component/header";
import Footer from "@app/components/login/component/footer";
import Section2 from "@app/components/login/component/section2";
import Section1 from "@app/components/login/component/section1";
import { useIsLargeScreen } from "@app/hooks/useIsLargeScreen";

export default function WelcomePage() {
  const router = useRouter();
  const { isLarge: isLargeScreen, isLoading: screenSizeLoading } =
    useIsLargeScreen();
  const [showHeader, setShowHeader] = useState(false);

  const [email, setEmail] = useState("");
  const [checking, setChecking] = useState(false);
  const [didCheck, setDidCheck] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [hasPassword, setHasPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "github" | null>(
    null
  );

  const basicEmail = /.+@.+\..+/;
  const isEmailValid = basicEmail.test(email);

  const mode: "login" | "register" | "set" = useMemo(() => {
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

  // Header behavior
  useEffect(() => {
    const setFromScroll = () =>
      setShowHeader(window.scrollY >= window.innerHeight - 200);
    setFromScroll();
    window.addEventListener("scroll", setFromScroll, { passive: true });
    window.addEventListener("resize", setFromScroll);
    return () => {
      window.removeEventListener("scroll", setFromScroll);
      window.removeEventListener("resize", setFromScroll);
    };
  }, []);

  async function checkEmail() {
    setError(null);
    if (!isEmailValid) {
      setError("Invalid email address");
      return;
    }
    setChecking(true);
    try {
      const res = await fetch(
        `/api/auth/check-email?email=${encodeURIComponent(email)}`
      );
      if (!res.ok) throw new Error("Failed to check email");
      const data = await res.json();
      setEmailExists(Boolean(data?.exists));
      setHasPassword(Boolean(data?.hasPassword));
      setDidCheck(true);
    } catch (e: any) {
      setError(e?.message || "Email check failed");
      setEmailExists(false);
      setHasPassword(false);
      setDidCheck(false);
    } finally {
      setChecking(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    try {
      if (mode === "login") {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl: "/",
        });
        if (!res?.ok) {
          setError("Invalid credentials");
          return;
        }
        router.push("/");
        return;
      }

      const endpoint =
        mode === "register" ? "/api/auth/register" : "/api/auth/set-password";

      if (
        (mode === "register" || mode === "set") &&
        password !== confirmPassword
      ) {
        setError("Passwords do not match");
        return;
      }

      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!r.ok) {
        setError("Failed to submit");
        return;
      }

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      if (!res?.ok) {
        setError("Signin failed");
        return;
      }
      router.push("/");
    } catch (e: any) {
      setError(e?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  function oauth(provider: "google" | "github") {
    setOauthLoading(provider);
    signIn(provider, { callbackUrl: "/" });
  }

  // Show loading state while determining screen size
  if (screenSizeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col text-zinc-900 dark:text-zinc-100">
      <Header showHeader={showHeader} />
      <main className="min-h-screen mx-auto flex-1 mx-auto gap-7 w-full bg-white dark:bg-zinc-950">
        <section
          className={`${isLargeScreen ? "grid-cols-2" : "grid-cols-1"} grid min-h-screen`}
        >
          <Section1
            email={email}
            setEmail={setEmail}
            checking={checking}
            emailExists={emailExists}
            hasPassword={hasPassword}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            error={error}
            loading={loading}
            canSubmit={canSubmit}
            handleSubmit={handleSubmit}
            oauth={oauth}
            mode={mode}
            // new props
            isEmailValid={isEmailValid}
            didCheck={didCheck}
            setDidCheck={setDidCheck}
            checkEmail={checkEmail}
            oauthLoading={oauthLoading}
          />
          <Section2 />
        </section>

        <section className="min-h-screen p-7 bg-zinc-50/60 dark:bg-zinc-900/40 items-center justify-center flex-col flex">
          <h2 className="text-2xl font-bold">Meet Nova AI</h2>
          <p>
            Nova is a next generation AI assistant designed to help you with a
            variety of tasks.
          </p>
        </section>
        <section className="min-h-screen p-7 bg-zinc-50/60 dark:bg-zinc-900/40 items-center justify-center flex-col flex">
          <h2 className="text-2xl font-bold">Meet Nova AI</h2>
          <p>
            Nova is a next generation AI assistant designed to help you with a
            variety of tasks.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
