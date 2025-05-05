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
  appendToLastModelReply,
} from "@app/reducers/chatSlice";
import { callChatAPI } from "@app/utils/chatApi";
import { parseStream } from "@app/utils/streamParser";
import { buildApiMessages } from "@app/utils/messageBuilder";

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
        const apiMessages = buildApiMessages(messages, content);
        const responseBody = await callChatAPI(model, apiMessages);

        dispatch(addModelReply(""));
        await parseStream(responseBody, (delta) => {
          dispatch(appendToLastModelReply(delta));
        });
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
