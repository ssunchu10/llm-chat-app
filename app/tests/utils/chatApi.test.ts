import { callChatAPI } from '@app/utils/chatApi';
import type { ChatMessage } from '@app/types/chat';

describe('callChatAPI', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockModel = 'gpt-3.5-turbo';
  const mockMessages: ChatMessage[] = [
    { role: 'user', content: 'Hello AI' }
  ];

  it('should call fetch with correct parameters and return response body', async () => {
    const mockBody = {} as ReadableStream<Uint8Array>;

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        body: mockBody,
      } as Response)
    ) as jest.Mock;

    const result = await callChatAPI(mockModel, mockMessages);
    expect(fetch).toHaveBeenCalledWith('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: mockModel, messages: mockMessages }),
    });
    expect(result).toBe(mockBody);
  });

  it('should throw an error when response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        body: {} as ReadableStream<Uint8Array>,
        status: 500,
        statusText: 'Internal Server Error',
        json: async () => ({ error: 'Server error' }),
      })
    ) as jest.Mock;
  
    await expect(callChatAPI(mockModel, mockMessages)).rejects.toThrow('Failed to send message');
  });
  

  it('should throw an error when response body is missing', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        body: null,
      } as unknown as Response)
    ) as jest.Mock;

    await expect(callChatAPI(mockModel, mockMessages)).rejects.toThrow('No response body');
  });
});
