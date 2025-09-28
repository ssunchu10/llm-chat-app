import React from "react";

export default function Footer() {
  return (
    <footer
      className="w-full bg-white/70 dark:bg-zinc-950/70 border-t border-zinc-200 dark:border-zinc-800"
      role="contentinfo"
    >
      <div className="mx-auto flex items-center justify-between px-5 py-4 text-sm text-zinc-600 dark:text-zinc-400">
        {" "}
        <span>© {new Date().getFullYear()} NOVA AI</span>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-zinc-100">
            Terms
          </a>
          <a href="#" className="hover:text-zinc-100">
            Privacy
          </a>
          <a href="#" className="hover:text-zinc-100">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
