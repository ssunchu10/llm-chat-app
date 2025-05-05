"use client";

import React, { useRef, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ModelSelector from "./ModelSelector";
import { useChat } from "@app/hooks/useChat";

const HomePage: React.FC = () => {
  const { messages, sendMessage, resetChat, model, setModel } = useChat();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  
  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.map((m) => m.content).join("")]);

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
      <div className="w-full px-6 py-4 shadow-md bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <ChatHeader resetChat={resetChat} />
          <ModelSelector currentModel={model} onChange={setModel} />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-3">
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}
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
