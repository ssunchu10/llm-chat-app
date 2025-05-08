// useChat.test.ts
import { renderHook, act } from "@testing-library/react";
import { useChat } from "@app/hooks/useChat";
import { useSelector, useDispatch } from "react-redux";
import {
  addUserMessage,
  addModelReply,
  resetChat as resetChatAction,
  setModel as setModelAction,
  updateLoadingState,
  appendToLastModelReply,
} from "@app/reducers/chatSlice";
import { buildApiMessages } from "@app/utils/messageBuilder";
import { callChatAPI } from "@app/utils/chatApi";
import { parseStream } from "@app/utils/streamParser";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("@app/utils/chatApi", () => ({
  callChatAPI: jest.fn(),
}));

jest.mock("@app/utils/streamParser", () => ({
  parseStream: jest.fn(),
}));

jest.mock("@app/utils/messageBuilder", () => ({
  buildApiMessages: jest.fn(),
}));

const dispatch = jest.fn();

describe("useChat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    (useSelector as unknown as jest.Mock).mockImplementation((selectorFn) =>
      selectorFn({
        chat: {
          messages: [{ role: "user", content: "Hi" }],
          model: "gpt-3.5",
          loading: false,
        },
      })
    );
  });

  it("dispatches user message and model reply in sendMessage", async () => {
    const mockStream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode("Hello"));
        controller.close();
      },
    });

    (buildApiMessages as jest.Mock).mockReturnValue([{ role: "user", content: "Hi" }]);
    (callChatAPI as jest.Mock).mockResolvedValue(mockStream);
    (parseStream as jest.Mock).mockImplementation(async function* () {
      yield "Hello";
    });

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage("Hi");
    });

    expect(dispatch).toHaveBeenCalledWith(addUserMessage("Hi"));
    expect(dispatch).toHaveBeenCalledWith(updateLoadingState(true));
    expect(dispatch).toHaveBeenCalledWith(addModelReply("Hello"));
    expect(dispatch).toHaveBeenCalledWith(updateLoadingState(false));
  });

  it("handles stream appending", async () => {
    (buildApiMessages as jest.Mock).mockReturnValue([{ role: "user", content: "Hi" }]);
    (callChatAPI as jest.Mock).mockResolvedValue(new ReadableStream());
    (parseStream as jest.Mock).mockImplementation(async function* () {
      yield "He";
      yield "llo";
    });

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage("Hi");
    });

    expect(dispatch).toHaveBeenCalledWith(addModelReply("He"));
    expect(dispatch).toHaveBeenCalledWith(appendToLastModelReply("llo"));
  });

  it("handles API error in sendMessage", async () => {
    (buildApiMessages as jest.Mock).mockReturnValue([]);
    (callChatAPI as jest.Mock).mockRejectedValue(new Error("Failed"));

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.sendMessage("fail");
    });

    expect(dispatch).toHaveBeenCalledWith(updateLoadingState(false));
  });

  it("resets chat correctly", () => {
    const { result } = renderHook(() => useChat());
    act(() => {
      result.current.resetChat();
    });
    expect(dispatch).toHaveBeenCalledWith(resetChatAction());
  });

  it("sets model correctly", () => {
    const { result } = renderHook(() => useChat());
    act(() => {
      result.current.setModel("mistral");
    });
    expect(dispatch).toHaveBeenCalledWith(setModelAction("mistral"));
  });

  it("exposes current state values", () => {
    const { result } = renderHook(() => useChat());
    expect(result.current.messages).toEqual([{ role: "user", content: "Hi" }]);
    expect(result.current.model).toBe("gpt-3.5");
    expect(result.current.isLoading).toBe(false);
  });
});
