import ThemeSwitch from "@app/components/ThemeSwitch";
import BrainIcon from "@app/icons/BrainIcon";
import React from "react";

export default function Header({ showHeader }: { showHeader: boolean }) {
  return (
    <header
        className={[
          "fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/70 backdrop-blur transition-transform duration-150",
          "border-zinc-200 dark:border-zinc-800/80 dark:bg-zinc-950/70",
          showHeader ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
        aria-label="NOVA AI header"
      >
        <div className="mx-auto flex items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2 font-semibold tracking-wide">
            <BrainIcon className="text-violet-600 dark:text-violet-400" />
            <span>NOVA</span>
          </div>
          <nav className="gap-5 hidden sm:flex text-sm text-zinc-400 items-center ">
            <a className="hover:text-zinc-100" href="#features">
              Features
            </a>
            <a className="hover:text-zinc-100" href="#security">
              Security
            </a>
            <a className="hover:text-zinc-100" href="#pricing">
              Pricing
            </a>
            <a className="hover:text-zinc-100" href="#support">
              Support
            </a>
            <ThemeSwitch />
          </nav>
          <nav className="sm:hidden">
            <ThemeSwitch />
          </nav>
        </div>
      </header>
  );
}
