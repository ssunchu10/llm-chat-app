"use client";

import { useState } from "react";
import ThemeSwitch from "./Theme/ThemeSwitch";
import BrainIcon from "./Icons/BrainIcon";
import NewChatIcon from "./Icons/NewChatIcon";
import { useChat } from "@app/hooks/useChat";
import ModelSelector from "./ModelSelector/ModelSelector";
import Arrow from "./Icons/ArrowIcon";

interface ChatHeaderProps {
  hasMessages: boolean;
}

export default function ChatHeader({ hasMessages }: ChatHeaderProps) {
  const { resetChat } = useChat();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="relative pt-2 pb-2">
      <div className="relative flex items-center justify-center h-12">
        <div className="absolute left-2 sm:left-2">
          {hasMessages && <NewChatIcon onClick={resetChat} />}
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <BrainIcon />
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Nova AI
          </h1>
          <Arrow showDropdown={showDropdown}/>
        </div>

        <div className="absolute right-4 sm:right-6">
          <ThemeSwitch />
        </div>
      </div>

      {showDropdown && (
        <div className="mt-3 flex justify-center">
          <ModelSelector/>
        </div>
      )}
    </div>
  );
}
