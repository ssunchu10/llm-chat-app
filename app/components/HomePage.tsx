"use client";

import React, { useRef, useEffect} from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ModelSelector from "./ModelSelector";
import { useChat } from "@app/hooks/useChat";

const HomePage: React.FC = () => {
  const { messages, sendMessage, resetChat, model, setModel } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
      {/* Header */}
      <div className="w-full px-6 py-4 shadow-md bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <ChatHeader resetChat={resetChat} />
          <ModelSelector currentModel={model} onChange={setModel} />
        </div>
      </div>

      {/* Chat Window */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-3">
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}
          <div ref={bottomRef} />
        </div>
      </main>

      <div className="p-4 rounded text-center text-white bg-red-500 dark:bg-green-600 transition-all duration-300 ease-in-out">
        This should be <strong>red in light mode</strong> and{" "}
        <strong>green in dark mode</strong>
      </div>

      {/* Chat Input */}
      <footer className="w-full px-6 py-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSend={sendMessage} />
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
