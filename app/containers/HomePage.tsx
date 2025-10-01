"use client";

import React, { useState } from "react";
import ChatHeader from "../components/homepage/ChatHeader";
import ChatInput from "../components/homepage/ChatInput";
import ChatMessage from "../components/homepage/ChatMessage";
import EmptyState from "../components/homepage/EmptyState";
import SideBar from "../components/homepage/SideBar";
import { useChat } from "@app/hooks/useChat";
import { useScrollToBottom } from "@app/hooks/useScrollToBottom";

const HEADER_H = 56;
const INPUT_H = 88;

const HomePage: React.FC = () => {
  const { messages, sendMessage } = useChat();
  const bottomRef = useScrollToBottom(messages);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-svh w-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col relative">
      <div
        className={`fixed top-0 left-0 h-full z-60 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SideBar isOpen={isSidebarOpen} onClose={closeSidebar} />
      </div>


      <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-800 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <ChatHeader
          hasMessages={messages.length > 0}
          onToggleSidebar={toggleSidebar}
        />
      </header>

      <main
        className="flex-1 overflow-y-auto overscroll-contain"
        style={{
          scrollPaddingTop: `${HEADER_H + 8}px`,
          paddingBottom: `calc(${INPUT_H}px + env(safe-area-inset-bottom))`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-3">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((msg, i) => <ChatMessage key={i} message={msg} />)
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      <div
        className="sticky bottom-0 z-40 w-full border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
            <ChatInput onSend={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
