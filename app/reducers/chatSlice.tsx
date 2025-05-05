"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Message } from "@app/types/message";

interface ChatState {
  messages: Message[];
  model: "mistral" | "llama3";
  loading: boolean;
}

const initialState: ChatState = {
  messages: [],
  model: "mistral",
  loading: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setModel: (state, action: PayloadAction<"mistral" | "llama3">) => {
      state.model = action.payload;
    },
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        role: "user",
        content: action.payload,
        model: state.model,
      });
    },
    addModelReply: (state, action: PayloadAction<string>) => {
      state.messages.push({
        role: "model",
        content: action.payload,
        model: state.model,
      });
    },
    resetChat: (state) => {
      state.messages = [];
    },
    updateLoadingState: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    appendToLastModelReply: (state, action) => {
        const lastMessage = state.messages.findLast((msg) => msg.role === "model");
        if (lastMessage) {
          lastMessage.content += action.payload;
        } else {
          state.messages.push({
            role: "model",
            content: action.payload,
          });
        }
    },
  },
});

export const {
  setModel,
  addUserMessage,
  addModelReply,
  resetChat,
  updateLoadingState,
  appendToLastModelReply
} = chatSlice.actions;

export default chatSlice.reducer;
