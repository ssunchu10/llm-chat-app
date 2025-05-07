"use client";

import React, { useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { useChat } from "@app/hooks/useChat";

const HomePage: React.FC = () => {
  const { messages, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length === 0) return;

    const last = messages[messages.length - 1];

    if (last.role !== "user") {
      const timeout = setTimeout(() => {
        scrollToBottom();
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [messages.map((m) => m.content).join("")]);

  return (
    <div className="h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
      <div className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm ">
        <ChatHeader hasMessages={messages.length > 0} />
      </div>

      <main className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-3">
          {messages.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 mt-24 animate-fade-in space-y-4"
              title=""
              onCopy={(e) => e.preventDefault()}
            >
              <span className="text-5xl select-none">💬</span>

              <p className="text-xl font-semibold">Start a conversation</p>

              <p className="max-w-md text-sm">
                Ask me anything — from summaries, code explanations, creative
                ideas, or just a casual chat. I’m here to help!
              </p>

              <p className="max-w-md text-sm">
                You can also choose between{" "}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  Mistral
                </span>{" "}
                and{" "}
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  LLaMA3
                </span>{" "}
                using the dropdown.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => <ChatMessage key={i} message={msg} />)
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 z-10 px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSend={sendMessage} />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
