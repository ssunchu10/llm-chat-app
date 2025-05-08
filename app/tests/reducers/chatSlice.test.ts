import chatReducer, {
    setModel,
    addUserMessage,
    addModelReply,
    resetChat,
    updateLoadingState,
    appendToLastModelReply,
  } from "@app/reducers/chatSlice";
  import type { ChatState } from "@app/reducers/chatSlice";
  
  describe("chatSlice", () => {
    const initialState: ChatState = {
      messages: [],
      model: "mistral",
      loading: false,
    };
  
    it("should handle initial state", () => {
      expect(chatReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });
  
    it("should handle setModel", () => {
      const actual = chatReducer(initialState, setModel("llama3"));
      expect(actual.model).toBe("llama3");
    });
  
    it("should handle addUserMessage", () => {
      const actual = chatReducer(initialState, addUserMessage("Hello!"));
      expect(actual.messages.length).toBe(1);
      expect(actual.messages[0]).toEqual({
        role: "user",
        content: "Hello!",
        model: "mistral",
      });
    });
  
    it("should handle addModelReply", () => {
      const actual = chatReducer(initialState, addModelReply("Hi there!"));
      expect(actual.messages.length).toBe(1);
      expect(actual.messages[0]).toEqual({
        role: "model",
        content: "Hi there!",
        model: "mistral",
      });
    });
  
    it("should handle resetChat", () => {
      const prefilledState: ChatState = {
        ...initialState,
        messages: [
          { role: "user", content: "Hi", model: "mistral" },
          { role: "model", content: "Hello", model: "mistral" },
        ],
      };
      const actual = chatReducer(prefilledState, resetChat());
      expect(actual.messages).toEqual([]);
    });
  
    it("should handle updateLoadingState", () => {
      const actual = chatReducer(initialState, updateLoadingState(true));
      expect(actual.loading).toBe(true);
    });
  
    describe("appendToLastModelReply", () => {
      it("should append to last model message if one exists", () => {
        const prefilledState: ChatState = {
          ...initialState,
          messages: [
            { role: "user", content: "Hi", model: "mistral" },
            { role: "model", content: "Hello", model: "mistral" },
          ],
        };
        const actual = chatReducer(prefilledState, appendToLastModelReply(" there!"));
        expect(actual.messages[1].content).toBe("Hello there!");
      });
  
      it("should create a new model message if none exists", () => {
        const prefilledState: ChatState = {
          ...initialState,
          messages: [{ role: "user", content: "Hi", model: "mistral" }],
        };
        const actual = chatReducer(prefilledState, appendToLastModelReply("Hello"));
        expect(actual.messages.length).toBe(2);
        expect(actual.messages[1]).toEqual({
          role: "model",
          content: "Hello",
        });
      });
    });
  });
  