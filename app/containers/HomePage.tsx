"use client";

import React from "react";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import EmptyState from "../components/EmptyState";
import { useChat } from "@app/hooks/useChat";
import { useScrollToBottom } from "@app/hooks/useScrollToBottom";

const HomePage: React.FC = () => {
  const { messages, sendMessage } = useChat();
  const bottomRef = useScrollToBottom(messages);

  return (
    <div className="h-screen w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
      <header className="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <ChatHeader hasMessages={messages.length > 0} />
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 pb-32">
        <div className="max-w-4xl mx-auto space-y-3">
          {messages.length === 0 ? (
            <EmptyState />
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
