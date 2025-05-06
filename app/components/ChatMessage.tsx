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

const extractTextContent = (node: any): string => {
  if (typeof node === "string") {
    return node;
  }

  if (node === null || node === undefined) {
    return "";
  }

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }

  if (node.props && node.props.children) {
    return extractTextContent(node.props.children);
  }

  if (node.value) {
    return node.value;
  }

  if (node.children) {
    return node.children.map(extractTextContent).join("");
  }

  try {
    return String(node);
  } catch {
    return "";
  }
};

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
                p: ({ node, ...props }) => (
                  <p
                    className="mb-3 text-base leading-relaxed text-gray-900 dark:text-gray-100"
                    {...props}
                  />
                ),
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl font-bold mt-6 mb-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-semibold mt-4 mb-2" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc list-inside ml-4" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal list-inside ml-4" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li
                    className="mb-1 list-item [&>*]:inline leading-6"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="border-l-4 border-gray-400 pl-4 italic text-gray-700 dark:text-gray-300"
                    {...props}
                  />
                ),
                a: ({ node, href, ...props }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800"
                    {...props}
                  />
                ),
                hr: () => (
                  <hr className="my-4 border-gray-300 dark:border-gray-600" />
                ),
                strong: ({ node, ...props }) => (
                  <strong
                    className="font-semibold text-gray-900 dark:text-white"
                    {...props}
                  />
                ),
                em: ({ node, ...props }) => (
                  <em
                    className="italic text-gray-700 dark:text-gray-300"
                    {...props}
                  />
                ),
                code: ({
                  node,
                  inline,
                  className,
                  children,
                  ...props
                }: ComponentProps<"code"> & {
                  inline?: boolean;
                  node?: any;
                }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  const language = match?.[1] || "";

                  const codeContent = extractTextContent(children);

                  if (inline || !language) {
                    return (
                      <code
                        className="px-1 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-sm font-mono"
                        {...props}
                      >
                        {codeContent}
                      </code>
                    );
                  }

                  return <CodeBlock language={language} value={codeContent} />;
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
