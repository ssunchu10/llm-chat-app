"use client";

export default function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 mt-24 animate-fade-in space-y-4"
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
  );
}
