"use client";

import ThemeSwitch from "./ThemeSwitch";

interface ChatHeaderProps {
  resetChat: () => void;
}

export default function ChatHeader({ resetChat }: ChatHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Nova AI
      </h1>
      <div className="flex gap-2 px-7">
        <ThemeSwitch />
        <button
          onClick={resetChat}
          className="text-sm bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
