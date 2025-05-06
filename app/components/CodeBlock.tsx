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

  if (!language) {
    return (
        <code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">
        {displayValue}
      </code>
    );
  }

  return (
    <div className="relative group border border-black rounded-md">
      <div className="flex items-center justify-between px-4 py-2 text-xs font-semibold text-black-200 bg-grey rounded-t-md">
        <span>{language}</span>
        <button
          onClick={handleCopy}
          className="text-xs px-2 py-1 bg-gray-700 text-white rounded cursor-pointer hover:bg-gray-600 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="bg-black text-white rounded-b-md p-4 overflow-x-auto">
        <code className={`language-${language}`}>{displayValue}</code>
      </pre>
    </div>
  );
}
