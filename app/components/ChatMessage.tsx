'use client';

import { Message } from '@app/types/message';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
          isUser
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
        }`}
      >
        {!isUser && message.model && (
          <p className="text-xs text-gray-600 dark:text-gray-300 italic mb-1">
            Model: {message.model}
          </p>
        )}
        <p className="text-gray-900 dark:text-white">{message.content}</p>
      </div>
    </div>
  );
}
