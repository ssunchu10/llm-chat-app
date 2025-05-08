import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

interface MockMediaQueryList {
  matches: boolean;
  media: string;
  onchange: null | (() => void);
  addListener: jest.Mock;
  removeListener: jest.Mock;
  addEventListener: jest.Mock;
  removeEventListener: jest.Mock;
  dispatchEvent: jest.Mock;
}

declare global {
  namespace NodeJS {
    interface Global {
      TextEncoder: typeof TextEncoder;
      TextDecoder: typeof TextDecoder;
    }
  }
}

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

window.matchMedia = jest.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
} as unknown as MediaQueryList));

interface StorageObject {
  [key: string]: string;
}

const localStorageMock = (() => {
  let store: StorageObject = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    key: jest.fn((index: number) => Object.keys(store)[index] || null),
    length: Object.keys(store).length
  } as unknown as Storage;
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

Object.defineProperty(document.documentElement, "classList", {
  value: {
    toggle: jest.fn(),
    add: jest.fn(),
    remove: jest.fn(),
    contains: jest.fn().mockImplementation(() => false),
    replace: jest.fn(),
    supports: jest.fn().mockImplementation(() => true),
    value: "",
    length: 0,
    item: jest.fn().mockImplementation(() => null),
    forEach: jest.fn(),
    entries: jest.fn().mockImplementation(() => [][Symbol.iterator]()),
    keys: jest.fn().mockImplementation(() => [][Symbol.iterator]()),
    values: jest.fn().mockImplementation(() => [][Symbol.iterator]()),
    [Symbol.iterator]: jest.fn().mockImplementation(() => [][Symbol.iterator]())
  } as unknown as DOMTokenList,
});