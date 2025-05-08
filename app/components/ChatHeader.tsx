"use client";

import ThemeSwitch from "./ThemeSwitch";
import BrainIcon from "../icons/BrainIcon";
import { useChatHeader } from "@app/hooks/useChatHeader";
import NewChatIcon from "../icons/NewChatIcon";
import ModelSelector from "./ModelSelector";
import Arrow from "../icons/ArrowIcon";
import { useIsLargeScreen } from "@app/hooks/useIsLargeScreen";

interface ChatHeaderProps {
  hasMessages: boolean;
}

export default function ChatHeader({ hasMessages }: ChatHeaderProps) {
  const { resetChat, showDropdown, toggleDropdown } = useChatHeader();
  const isLargeScreen = useIsLargeScreen();

  return (
    <div className="relative pt-2 pb-2">
      <div className="relative flex items-center justify-center h-12">
        <div className="absolute left-2 sm:left-2">
          {hasMessages && <NewChatIcon onClick={resetChat} />}
        </div>

        <div
          className={`flex items-center gap-2 select-none ${
            isLargeScreen ? "" : "cursor-pointer"
          }`}
          onClick={isLargeScreen ? undefined : toggleDropdown}
        >
          <BrainIcon />
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Nova AI
          </h1>
          <Arrow showDropdown={showDropdown} />
        </div>

        <div className="absolute right-4 sm:right-6">
          <ThemeSwitch />
        </div>
      </div>

      {(showDropdown || isLargeScreen) && (
        <div className="mt-3 flex justify-center">
          <ModelSelector />
        </div>
      )}
    </div>
  );
}
