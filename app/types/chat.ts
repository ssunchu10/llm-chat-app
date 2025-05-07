export type ChatMessage = {
  role: "user" | "system" | "assistant" | "tool" | "model";
  content: string;
};
