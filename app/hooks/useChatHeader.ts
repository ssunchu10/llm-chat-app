import { useEffect, useState } from "react";
import { useChat } from "@app/hooks/useChat";
import { useIsLargeScreen } from "./useIsLargeScreen";

export function useChatHeader() {
  const { resetChat } = useChat();
  const { isLarge: isLargeScreen } = useIsLargeScreen();
  const [showDropdown, setShowDropdown] = useState(isLargeScreen);

  useEffect(() => {
    setShowDropdown(isLargeScreen);
  }, [isLargeScreen]);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return {
    showDropdown,
    toggleDropdown,
    resetChat,
  };
}
