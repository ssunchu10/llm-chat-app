'use client';

import { useState } from 'react';
import { Message } from '@app/types/message';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [model, setModel] = useState<string>('mistral'); // default model

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ messages: updatedMessages, model }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    const modelMessage: Message = {
      role: 'model',
      content: data.message,
      model,
    };

    setMessages((prev) => [...prev, modelMessage]);
  };

  const resetChat = () => setMessages([]);

  return { messages, sendMessage, resetChat, model, setModel };
};
