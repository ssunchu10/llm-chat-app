import { useState, useRef } from "react";

export function useChatInput(onSend: (message: string) => void) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isInputEmpty = input.trim() === "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isInputEmpty) return;
    onSend(input.trim());
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "60px";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return {
    input,
    isInputEmpty,
    textareaRef,
    handleSubmit,
    handleInputChange,
  };
}
