export async function parseStream(
  stream: ReadableStream,
  onDelta: (delta: string) => void
): Promise<void> {
  const reader = stream.getReader();
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
          return;
        }

        try {
          const parsed = JSON.parse(json);
          const delta = parsed.choices?.[0]?.delta?.content;
          if (delta) {
            onDelta(delta);
          }
        } catch (err) {
          console.error("Stream JSON parse error:", err, json);
        }
      }
    }
  }
}
