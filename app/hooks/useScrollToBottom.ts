import { useEffect, useRef } from "react";
import { Message } from "@app/types/message";

export function useScrollToBottom(messages: Message[]) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length === 0) return;

    const last = messages[messages.length - 1];
    if (last.role !== "user") {
      const timeout = setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [messages.map((m) => m.content).join("")]);

  return bottomRef;
}
