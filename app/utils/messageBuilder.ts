import type { ChatMessage } from "@app/types/chat";

export function buildApiMessages(
  messages: ChatMessage[],
  newContent: string
): ChatMessage[] {
  const apiMessages = messages.map((msg) => ({
    role: msg.role === "model" ? "assistant" : msg.role,
    content: msg.content,
  }));

  apiMessages.push({ role: "user", content: newContent });

  return apiMessages;
}
