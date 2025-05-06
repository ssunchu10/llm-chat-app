import { ChatMessage } from "@app/types/chat";

export async function callChatAPI(
  model: string,
  messages: ChatMessage[]
): Promise<ReadableStream<Uint8Array>> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages }),
  });

  if (!response.body) throw new Error("No response body");
  return response.body;
}
