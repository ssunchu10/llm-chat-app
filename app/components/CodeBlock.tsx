"use client";

import { useState } from "react";

export function CodeBlock({
  language,
  value,
}: {
  language: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const displayValue = value.endsWith("\n") ? value.slice(0, -1) : value;

  return (
    <div className="relative group border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
        <span className="font-mono">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="px-2 py-1 text-xs bg-gray-800 text-white cursor-pointer rounded hover:bg-gray-700 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="bg-black text-white text-sm p-4 overflow-x-auto font-mono">
        <code className={`language-${language || "text"}`}>{displayValue}</code>
      </pre>
    </div>
  );
}
