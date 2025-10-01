"use client";

import BrainIcon from "@app/icons/BrainIcon";
import { GithubIcon } from "@app/icons/Github";
import { GoogleIcon } from "@app/icons/Google";
import React from "react";

export default function Section1({
  email,
  setEmail,
  checking,
  emailExists,
  hasPassword,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  loading,
  canSubmit,
  handleSubmit,
  oauth,
  mode,
  isEmailValid,
  didCheck,
  setDidCheck,
  checkEmail,
  oauthLoading,
}: {
  email: string;
  setEmail: (email: string) => void;
  checking: boolean;
  emailExists: boolean;
  hasPassword: boolean;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (v: string) => void;
  error: string | null;
  loading: boolean;
  canSubmit: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  oauth: (provider: "google" | "github") => void;
  mode: "login" | "register" | "set";
  // new
  isEmailValid: boolean;
  didCheck: boolean;
  setDidCheck: (v: boolean) => void;
  checkEmail: () => void;
  oauthLoading: "google" | "github" | null;
}) {
  const statusText = !email
    ? "Enter your email to continue."
    : !isEmailValid
      ? "Invalid email address"
      : checking
        ? "Checking…"
        : didCheck
          ? mode === "login"
            ? emailExists && hasPassword
              ? "Account found. Enter your password."
              : "Unexpected state"
            : mode === "register"
              ? !emailExists
                ? "No account found. Create your account."
                : "Account already exists. Try signing in."
              : emailExists && !hasPassword
                ? "Account found without a password. Set one now."
                : "This email already has a password."
          : "Valid email. Continue to check account.";

  const showPassword =
    didCheck &&
    ((mode === "login" && emailExists && hasPassword) ||
      (mode === "register" && !emailExists) ||
      (mode === "set" && emailExists && !hasPassword));

  return (
    <section
      className="min-h-svh relative flex items-center justify-center px-4 py-10 bg-zinc-50/60 dark:bg-zinc-900/40"
      aria-label="Sign in"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 2rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
      }}
    >
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 font-semibold tracking-wide">
        <BrainIcon className="text-violet-600 dark:text-violet-400" />
        <span className="text-xl text-zinc-900 dark:text-zinc-100">NOVA</span>
      </div>

      <div className="w-full max-w-md md:max-w-lg">
        <div className="text-center mb-6 mt-10">
          <h1 className="text-4xl font-semibold leading-tight">
            Impossible?
            <br className="sm:hidden" /> Possible.
          </h1>
          <p className="mt-2 text-sm text-zinc-500">
            The AI for problem solvers
          </p>
        </div>

        <div className="rounded-2xl border bg-white shadow-lg border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 p-6 md:p-6">
          <div className="grid gap-3 md:grid-cols-2">
            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm bg-white border-zinc-200 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800/70"
              onClick={() => oauth("google")}
              disabled={oauthLoading !== null}
              aria-label="Sign in with Google"
              aria-busy={oauthLoading === "google"}
              type="button"
            >
              {oauthLoading === "google" ? (
                <>
                  <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin dark:border-zinc-600 dark:border-t-zinc-300" />
                  Signing in...
                </>
              ) : (
                <>
                  <GoogleIcon className="w-5 h-5" />
                  Google
                </>
              )}
            </button>

            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm bg-white border-zinc-200 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-800/70"
              onClick={() => oauth("github")}
              disabled={oauthLoading !== null}
              aria-label="Sign in with GitHub"
              aria-busy={oauthLoading === "github"}
              type="button"
            >
              {oauthLoading === "github" ? (
                <>
                  <div className="w-5 h-5 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin dark:border-zinc-600 dark:border-t-zinc-300" />
                  Signing in...
                </>
              ) : (
                <>
                  <GithubIcon className="w-5 h-5" />
                  GitHub
                </>
              )}
            </button>
          </div>

          <div className="my-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-xs text-zinc-500">
            <span className="h-px bg-zinc-200 dark:bg-zinc-800" />
            <span>OR</span>
            <span className="h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {/* Step 1: email + explicit check */}
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm text-zinc-500">
              Email
            </label>
            <input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                const v = e.target.value.trim();
                setDidCheck(false);
                setEmail(v);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && isEmailValid && !checking && !didCheck) {
                  e.preventDefault();
                  checkEmail();
                }
              }}
              aria-describedby="emailHint"
              required
              className="w-full rounded-lg border bg-white px-3 py-3 text-sm outline-none border-zinc-200 focus:border-violet-600/40 focus:ring-2 focus:ring-violet-600/20 dark:bg-zinc-950 dark:border-zinc-800 dark:focus:border-violet-500/40 dark:focus:ring-violet-500/20"
            />
            <small
              id="emailHint"
              className="mb-2 text-xs text-zinc-500"
              aria-live="polite"
              role="status"
            >
              {statusText}
            </small>

            {!didCheck && (
              <button
                type="button"
                onClick={checkEmail}
                disabled={!isEmailValid || checking}
                className="inline-flex items-center justify-center rounded-xl px-4 py-3 font-semibold bg-zinc-100 text-zinc-900 hover:bg-zinc-200 disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                aria-busy={checking}
              >
                {checking ? "Checking…" : "Continue with email"}
              </button>
            )}
          </div>

          {showPassword && (
            <form
              onSubmit={handleSubmit}
              className="mt-4 grid gap-2"
              noValidate
            >
              <label htmlFor="password" className="text-sm text-zinc-500">
                {mode === "login"
                  ? "Password"
                  : mode === "register"
                    ? "Create password"
                    : "New password"}
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border bg-white px-3 py-3 text-sm outline-none border-zinc-200 focus:border-violet-600/40 focus:ring-2 focus:ring-violet-600/20 dark:bg-zinc-950 dark:border-zinc-800 dark:focus:border-violet-500/40 dark:focus:ring-violet-500/20"
              />

              {mode !== "login" && (
                <>
                  <label
                    htmlFor="confirm-password"
                    className="text-sm text-zinc-500"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border bg-white px-3 py-3 text-sm outline-none border-zinc-200 focus:border-violet-600/40 focus:ring-2 focus:ring-violet-600/20 dark:bg-zinc-950 dark:border-zinc-800 dark:focus:border-violet-500/40 dark:focus:ring-violet-500/20"
                  />
                  {password &&
                    confirmPassword &&
                    password !== confirmPassword && (
                      <small className="text-xs text-red-500">
                        Passwords do not match
                      </small>
                    )}
                </>
              )}

              {error && (
                <div
                  role="alert"
                  className="mt-1 rounded-lg border border-red-900/60 bg-red-950/50 p-3 text-sm text-red-200"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-xl px-4 py-3 font-semibold bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-50 dark:bg-violet-400 dark:text-zinc-950 dark:hover:bg-violet-300/90"
                disabled={!canSubmit || loading}
                aria-busy={loading}
              >
                {loading
                  ? "Submitting…"
                  : mode === "login"
                    ? "Sign in"
                    : mode === "register"
                      ? "Create account"
                      : "Set password"}
              </button>
            </form>
          )}

          {error && !showPassword && (
            <div
              role="alert"
              className="mt-3 rounded-lg border border-red-900/60 bg-red-950/50 p-3 text-sm text-red-200"
            >
              {error}
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-zinc-500">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </section>
  );
}
