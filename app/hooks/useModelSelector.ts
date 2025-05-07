import { useChat } from "@app/hooks/useChat";

export function useModelSelector() {
  const models = ["mistral", "llama3"];
  const { model, setModel } = useChat();
  return { models, model, setModel };
}
