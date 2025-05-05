"use client";

interface ModelSelectorProps {
  currentModel: string;
  onChange: (model: string) => void;
}

export default function ModelSelector({
  currentModel,
  onChange,
}: ModelSelectorProps) {
  const models = ["mistral", "llama2"]; // replace with supported models

  return (
    <div className="flex items-center gap-3">
      <label className="text-gray-700 dark:text-gray-200 font-medium">
        Current Model:
      </label>

      <select
        value={currentModel}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
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
