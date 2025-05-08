import themeReducer, { toggleTheme, setTheme } from "@app/reducers/themeSlice";

describe("themeSlice", () => {
  beforeEach(() => {
    // Mock localStorage and document.documentElement.classList
    Storage.prototype.getItem = jest.fn();
    Storage.prototype.setItem = jest.fn();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });

    document.documentElement.classList.toggle = jest.fn();
  });

  it("should return the initial state", () => {
    const initialState = { mode: "light" };
    expect(themeReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should toggle theme from light to dark", () => {
    const initialState = { mode: "light" };
    const newState = themeReducer(initialState, toggleTheme());
    expect(newState.mode).toBe("dark");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      true
    );
  });

  it("should toggle theme from dark to light", () => {
    const initialState = { mode: "dark" };
    const newState = themeReducer(initialState, toggleTheme());
    expect(newState.mode).toBe("light");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      false
    );
  });

  it("should set theme to dark explicitly", () => {
    const initialState = { mode: "light" };
    const newState = themeReducer(initialState, setTheme("dark"));
    expect(newState.mode).toBe("dark");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "dark");
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      true
    );
  });

  it("should set theme to light explicitly", () => {
    const initialState = { mode: "dark" };
    const newState = themeReducer(initialState, setTheme("light"));
    expect(newState.mode).toBe("light");
    expect(localStorage.setItem).toHaveBeenCalledWith("theme", "light");
    expect(document.documentElement.classList.toggle).toHaveBeenCalledWith(
      "dark",
      false
    );
  });
});
