"use client";

import ThemeSwitch from "./ThemeSwitch";
import BrainIcon from "./BrainIcon";

interface ChatHeaderProps {
  resetChat: () => void;
}

export default function ChatHeader({ resetChat }: ChatHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <BrainIcon/>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Nova AI
        </h1>
      </div>
      <div className="flex gap-2 px-7">
        <ThemeSwitch />
        <button
          onClick={resetChat}
          className="px-6 py-2 rounded-md cursor-pointer text-base font-semibold text-white bg-red-500 hover:bg-red-600 hover:shadow-sm hover:scale-[1.03] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-300 dark:focus:ring-red-600"
        >
          Reset Chat
        </button>
      </div>
    </div>
  );
}
