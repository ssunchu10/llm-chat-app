"use client";

import { useChat } from "@app/hooks/useChat";

export default function ModelSelector() {
  const models = ["mistral", "llama3"];
  const { model, setModel } = useChat();
  
  return (
    <div className="flex items-center gap-3">
      <label className="text-gray-700 dark:text-gray-200 font-medium">
        Current Model:
      </label>

      <select
        value={model}
        onChange={(e) => setModel(e.target.value as "mistral" | "llama3")}
        className="border border-gray-300 cursor-pointer dark:border-gray-600 rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
      >
        {models.map((m) => (
          <option key={m} value={m}>
            {m.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
