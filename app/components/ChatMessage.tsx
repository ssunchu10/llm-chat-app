"use client";

import { MessageRenderer } from "./MessageRenderer";
import { Message } from "@app/types/message";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-md text-sm break-words transition-all ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        }`}
      >
        {!isUser && message.model && (
          <p className="text-[11px] mb-2 text-gray-500 dark:text-gray-400 italic">
            Model: {message.model}
          </p>
        )}

        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <MessageRenderer content={message.content} />
        )}
      </div>
    </div>
  );
}
