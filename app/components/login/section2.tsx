import React from "react";

export default function Section2() {
  return (
    <section
            className="min-h-screen flex flex-col items-center justify-center p-7 bg-zinc-50/60 dark:bg-zinc-900/40"
            id="features"
            aria-label="Product features"
          >
            <h2 className="mb-4 text-2xl font-semibold">What you get</h2>
            <ul className="grid list-none gap-3 p-0">
              <li className="rounded-xl border p-4 bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                <h3 className="mb-1 text-base font-semibold">
                  Fast, reliable chat
                </h3>
                <p className="text-sm text-zinc-400">
                  Streamed responses, message search, pinned answers.
                </p>
              </li>
              <li className="rounded-xl border p-4 bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                <h3 className="mb-1 text-base font-semibold">
                  Projects & spaces
                </h3>
                <p className="text-sm text-zinc-400">
                  Separate workspaces for clients or teams with access control.
                </p>
              </li>
              <li className="rounded-xl border p-4 bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                <h3 className="mb-1 text-base font-semibold">
                  File-aware answers
                </h3>
                <p className="text-sm text-zinc-400">
                  Upload files. Get grounded answers and citations.
                </p>
              </li>
              <li className="rounded-xl border p-4 bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                <h3 className="mb-1 text-base font-semibold">Integrations</h3>
                <p className="text-sm text-zinc-400">
                  GitHub, Google Drive, Notion, and web browsing when needed.
                </p>
              </li>
              <li className="rounded-xl border p-4 bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                <h3 className="mb-1 text-base font-semibold">Privacy-first</h3>
                <p className="text-sm text-zinc-400">
                  SOC 2 ready, data retention controls, region pinning.
                </p>
              </li>
            </ul>

            <div
              className="mt-4 w-full grid grid-cols-3 gap-3 md:grid-cols-1"
              id="security"
            >
              <div className="rounded-xl border p-4 bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800">
                <h4 className="mb-1 text-sm font-semibold">Security</h4>
                <p className="text-xs text-zinc-400">
                  SAML SSO, domain capture, audit logs.
                </p>
              </div>
              <div
                className="rounded-xl border p-4 bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800"
                id="pricing"
              >
                <h4 className="mb-1 text-sm font-semibold">Pricing</h4>
                <p className="text-xs text-zinc-400">
                  Free to start. Simple team plans when you grow.
                </p>
              </div>
              <div
                className="rounded-xl border p-4 bg-white border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800"
                id="support"
              >
                <h4 className="mb-1 text-sm font-semibold">Support</h4>
                <p className="text-xs text-zinc-400">
                  Priority email support and uptime SLAs on paid tiers.
                </p>
              </div>
            </div>
          </section>
  );
}
