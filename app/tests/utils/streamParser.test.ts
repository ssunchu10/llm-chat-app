import { parseStream } from "@app/utils/streamParser";

describe("parseStream", () => {
  const encoder = new TextEncoder();

  const createMockStream = (chunks: Uint8Array[]) => {
    let index = 0;
    return {
      getReader: () => ({
        read: () => {
          if (index < chunks.length) {
            return Promise.resolve({ value: chunks[index++], done: false });
          } else {
            return Promise.resolve({ value: undefined, done: true });
          }
        },
      }),
    } as ReadableStream;
  };

  it("calls onDelta with parsed delta content", async () => {
    const payload = {
      choices: [{ delta: { content: "Hello" } }],
    };
    const mockStream = createMockStream([
      encoder.encode(`data: ${JSON.stringify(payload)}\n\n`),
      encoder.encode(`data: [DONE]\n\n`),
    ]);

    const onDelta = jest.fn();
    await parseStream(mockStream, onDelta);

    expect(onDelta).toHaveBeenCalledWith("Hello");
    expect(onDelta).toHaveBeenCalledTimes(1);
  });

  it("handles multiple lines and buffers correctly", async () => {
    const payloads = [
      { choices: [{ delta: { content: "A" } }] },
      { choices: [{ delta: { content: "B" } }] },
      { choices: [{ delta: { content: "C" } }] },
    ];

    const mockStream = createMockStream([
      encoder.encode(`data: ${JSON.stringify(payloads[0])}\n\n`),
      encoder.encode(`data: ${JSON.stringify(payloads[1])}\n\n`),
      encoder.encode(`data: ${JSON.stringify(payloads[2])}\n\n`),
      encoder.encode(`data: [DONE]\n\n`),
    ]);

    const onDelta = jest.fn();
    await parseStream(mockStream, onDelta);

    expect(onDelta).toHaveBeenCalledTimes(3);
    expect(onDelta).toHaveBeenNthCalledWith(1, "A");
    expect(onDelta).toHaveBeenNthCalledWith(2, "B");
    expect(onDelta).toHaveBeenNthCalledWith(3, "C");
  });

  it("ignores lines that are not valid JSON", async () => {
    const mockStream = createMockStream([
      encoder.encode(`data: not-json\n\n`),
      encoder.encode(`data: [DONE]\n\n`),
    ]);

    const onDelta = jest.fn();
    const originalError = console.error;
    console.error = jest.fn();

    await parseStream(mockStream, onDelta);

    console.error = originalError;
    expect(onDelta).not.toHaveBeenCalled();
  });

  it("skips messages with no delta content", async () => {
    const payload = { choices: [{}] };
    const mockStream = createMockStream([
      encoder.encode(`data: ${JSON.stringify(payload)}\n\n`),
      encoder.encode(`data: [DONE]\n\n`),
    ]);

    const onDelta = jest.fn();
    await parseStream(mockStream, onDelta);

    expect(onDelta).not.toHaveBeenCalled();
  });
  it('exits immediately when stream is already done', async () => {
    const mockStream = {
      getReader: () => ({
        read: () => Promise.resolve({ value: undefined, done: true }),
      }),
    } as unknown as ReadableStream;
  
    const onDelta = jest.fn();
    await parseStream(mockStream, onDelta);
  
    expect(onDelta).not.toHaveBeenCalled();
  });
  
});
