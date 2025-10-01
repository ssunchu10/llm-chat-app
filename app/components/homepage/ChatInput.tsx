"use client";

import { useChatInput } from "@app/hooks/useChatInput";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const { input, isInputEmpty, textareaRef, handleSubmit, handleInputChange } =
    useChatInput(onSend);

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <div className="flex-1 overflow-x-auto max-w-full">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Type your message..."
          className="w-full resize-none overflow-x-auto max-h-60 min-h-[60px] border border-gray-600 bg-white text-black dark:bg-gray-900 dark:text-white text-md rounded px-4 py-2 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-black dark:focus:border-white"
          style={{ whiteSpace: "pre", overflowX: "auto" }}
        />
      </div>
      <div className="flex items-center h-full">
        <button
          type="submit"
          title={isInputEmpty ? "Input is empty" : ""}
          disabled={isInputEmpty}
          className={`px-4 py-2 rounded text-sm font-bold text-white dark:text-black transition h-[40px] self-center transform
      ${
        isInputEmpty
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-black dark:bg-white hover:opacity-80 hover:scale-105 cursor-pointer"
      }
      `}
        >
          Send
        </button>
      </div>
    </form>
  );
}
