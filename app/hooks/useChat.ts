"use client";

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { RootState } from "@app/store";
import {
  addUserMessage,
  addModelReply,
  resetChat as resetChatAction,
  setModel as setModelAction,
  updateLoadingState,
  appendToLastModelReply
} from "@app/state/chatSlice";

type ChatMessage = {
  role: "user" | "system" | "assistant" | "tool";
  content: string;
};

export function useChat() {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const model = useSelector((state: RootState) => state.chat.model);
  const isLoading = useSelector((state: RootState) => state.chat.loading);

  const dispatch = useDispatch();

  const sendMessage = useCallback(
    async (content: string) => {
      dispatch(addUserMessage(content));
      dispatch(updateLoadingState(true));
  
      try {
        const apiMessages = messages.map(
          (msg): ChatMessage => ({
            role: msg.role === "model" ? "assistant" : "user",
            content: msg.content,
          })
        );
  
        apiMessages.push({ role: "user", content });
  
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages: apiMessages,
          }),
        });
  
        if (!response.body) {
          throw new Error("No response body");
        }

        dispatch(addModelReply(""));
  
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
  
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
  
          buffer += decoder.decode(value, { stream: true });
  
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";
  
          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const json = line.replace(/^data: /, "").trim();
              if (json === "[DONE]") {
                break;
              }
  
              try {
                const parsed = JSON.parse(json);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  dispatch(appendToLastModelReply(delta)); 
                }
              } catch (err) {
                console.error("Stream JSON parse error:", err, json);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error sending message:", error);
        dispatch(
          addModelReply("Sorry, there was an error processing your request.")
        );
      } finally {
        dispatch(updateLoadingState(false));
      }
    },
    [dispatch, messages, model]
  );

  const resetChat = useCallback(() => {
    dispatch(resetChatAction());
  }, [dispatch]);

  const setModel = useCallback(
    (newModel: "mistral" | "llama3") => {
      dispatch(setModelAction(newModel));
    },
    [dispatch]
  );

  return {
    messages,
    sendMessage,
    resetChat,
    isLoading,
    model,
    setModel,
  };
}