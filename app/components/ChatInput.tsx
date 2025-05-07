"use client";

import { useChatInput } from "@app/hooks/useChatInput";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const {
    input,
    isInputEmpty,
    textareaRef,
    handleSubmit,
    handleInputChange,
  } = useChatInput(onSend);

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
          className="w-full resize-none overflow-x-auto max-h-60 min-h-[60px] border border-gray-600 bg-gray-900 text-md rounded px-4 py-2 text-white placeholder:text-gray-400"
          style={{ whiteSpace: "pre", overflowX: "auto" }}
        />
      </div>
      <div className="flex items-center h-full">
        <button
          type="submit"
          title={isInputEmpty ? "Input is empty" : ""}
          disabled={isInputEmpty}
          className={`px-4 py-2 rounded text-sm text-white transition h-[40px] self-center
            ${
              isInputEmpty
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            }`}
        >
          Send
        </button>
      </div>
    </form>
  );
}
