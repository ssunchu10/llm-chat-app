import { useState } from "react";
import { useChat } from "@app/hooks/useChat";

export function useChatHeader() {
  const { resetChat } = useChat();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return {
    showDropdown,
    toggleDropdown,
    resetChat,
  };
}
