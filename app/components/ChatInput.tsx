"use client";

import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  const isInputEmpty = input.trim() === "";

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm rounded px-4 py-2 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
      />
      <button
        type="submit"
        title={isInputEmpty ? "Input is empty" : ""}
        disabled={isInputEmpty}
        className={`px-4 py-2 rounded text-sm text-white transition
    ${
      isInputEmpty
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
    }`}
      >
        Send
      </button>
    </form>
  );
}
