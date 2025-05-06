"use client";

import { Message } from "@app/types/message";
import { CodeBlock } from "./CodeBlock";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { ComponentProps } from "react";

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
          <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed space-y-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                p: ({ children }) => (
                  <p className="mb-3 text-base leading-relaxed text-gray-900 dark:text-gray-100">
                    {children}
                  </p>
                ),
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold mt-6 mb-2">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold mt-4 mb-2">
                    {children}
                  </h2>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside ml-4">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside ml-4">{children}</ol>
                ),
                li: ({ children }) => <li className="mb-1">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-700 dark:text-gray-300">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
                  >
                    {children}
                  </a>
                ),
                hr: () => (
                  <hr className="my-4 border-gray-300 dark:border-gray-600" />
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900 dark:text-white">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-700 dark:text-gray-300">
                    {children}
                  </em>
                ),
                code: ({
                  inline,
                  className = "",
                  children,
                  ...props
                }: ComponentProps<"code"> & { inline?: boolean }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match?.[1] || "";

                  if (inline) {
                    return (
                      <code
                        className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm font-mono"
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  }

                  return (
                    <CodeBlock
                      language={language}
                      value={
                        Array.isArray(children)
                          ? children.join("")
                          : typeof children === "string"
                            ? children
                            : ""
                      }
                    />
                  );
                },
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
