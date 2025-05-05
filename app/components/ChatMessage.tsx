"use client";

import { Message } from "@app/types/message";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg text-sm break-words ${
          isUser
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
        }`}
      >
        {!isUser && message.model && (
          <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-1">
            Model: {message.model}
          </p>
        )}

        {isUser ? (
          <p>{message.content}</p>
        ) : (
          <div className="prose prose-base dark:prose-invert max-w-none leading-relaxed space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                strong: ({ children }) => <strong style={{ fontWeight: 700, color: 'inherit' }}>{children}</strong>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
