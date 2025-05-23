"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import themeReducer from "./reducers/themeSlice";
import chatReducer from "./reducers/chatSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
