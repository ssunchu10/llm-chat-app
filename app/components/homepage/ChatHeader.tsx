"use client";

import ThemeSwitch from "../ThemeSwitch";
import BrainIcon from "../../icons/BrainIcon";
import { useChatHeader } from "@app/hooks/useChatHeader";
import NewChatIcon from "../../icons/NewChatIcon";
import ModelSelector from "../ModelSelector";
import Arrow from "../../icons/ArrowIcon";
import { useIsLargeScreen } from "@app/hooks/useIsLargeScreen";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

interface ChatHeaderProps {
  hasMessages: boolean;
  onToggleSidebar?: () => void;
}

export default function ChatHeader({
  hasMessages,
  onToggleSidebar,
}: ChatHeaderProps) {
  const router = useRouter();
  const { resetChat, showDropdown, toggleDropdown } = useChatHeader();
  const { isLarge: isLargeScreen } = useIsLargeScreen();
  const { status } = useSession();

  return (
    <div className="relative pt-2 pb-2">
      <div className="grid grid-cols-3 items-center h-12">
        <div className="flex items-center gap-2 pl-2">
          {status === "authenticated" ? (
            <>
              <button
                type="button"
                onClick={onToggleSidebar}
                aria-label="Toggle sidebar"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 dark:focus:ring-gray-600"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>

              {hasMessages && (
                <NewChatIcon onClick={resetChat} ariaLabel="Start new chat" />
              )}
            </>
          ) : null}
        </div>

        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={toggleDropdown}
            aria-expanded={showDropdown}
            className="flex items-center gap-2 select-none cursor-pointer"
          >
            <span
              onClick={resetChat}
              aria-label="Start new chat"
              role="button"
              tabIndex={0}
              className="text-violet-600 dark:text-violet-400 focus:outline-none"
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") resetChat();
              }}
            >
              <BrainIcon className="text-violet-600 dark:text-violet-400" />
            </span>
            <h1 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white">
              Nova AI
            </h1>
            <Arrow showDropdown={showDropdown} />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 pr-2 sm:pr-4">
          {status === "loading" ? (
            <div className="flex items-center gap-2">
              <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
          ) : status === "authenticated" ? null : (
            <>
              <button
                className="px-4 py-2 text-xs rounded-full bg-white text-black border border-black cursor-pointer font-semibold shadow-sm hover:bg-gray-100 transition"
                type="button"
                onClick={() => {
                  router.push("/log-in-or-create-account");
                }}
              >
                Log in
              </button>
              <button
                className={`${
                  isLargeScreen ? "inline-block" : "hidden"
                } px-4 py-2 text-xs rounded-full bg-black text-white border border-black cursor-pointer font-semibold shadow-sm hover:bg-gray-900 transition`}
                type="button"
                onClick={() => {
                  router.push("/log-in-or-create-account");
                }}
              >
                Sign up for Free
              </button>
            </>
          )}
          <ThemeSwitch />
        </div>
      </div>

      {showDropdown && (
        <div className="mt-3 flex justify-center">
          <ModelSelector />
        </div>
      )}
    </div>
  );
}
