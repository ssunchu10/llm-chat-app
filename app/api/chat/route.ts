import { NextRequest } from 'next/server';
import { Together } from "together-ai";

const MODEL_MAP = {
  mistral: "mistralai/Mistral-7B-Instruct-v0.2",
  llama3: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
};

type ModelKey = keyof typeof MODEL_MAP;

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { model, messages } = await req.json();

    if (!MODEL_MAP[model as ModelKey]) {
      return new Response(JSON.stringify({ error: 'Invalid model' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const together = new Together({
      apiKey: process.env.TOGETHER_API_KEY || '',
    });

    const stream = await together.chat.completions.create({
      model: MODEL_MAP[model as ModelKey],
      messages,
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const payload = JSON.stringify(chunk);
          controller.enqueue(encoder.encode(`data: ${payload}\n\n`));
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error("API route error:", error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
